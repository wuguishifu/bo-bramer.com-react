const stdin = process.openStdin();
stdin.setRawMode(true);
stdin.setEncoding('utf8');
import { execSync } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import fs from 'fs';
config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

const keypress = async () => new Promise(resolve => process.stdin.once('data', data => resolve(data)));

(async () => {
    console.log('Press enter to build and deploy. Any other key will abort.');
    const key = await keypress();
    if (key !== '\r') {
        console.log('Aborted.');
        process.exit(0);
    }

    execSync('npm run build', { stdio: 'inherit' });

    const files = [];
    walkSync('./dist', (filePath) => {
        let bucketPath = filePath.replace('./dist', '');
        if (bucketPath.startsWith('/')) {
            bucketPath = bucketPath.substring(1);
        }
        files.push({ filePath, bucketPath });
    });
    await Promise.all(files.map(({ filePath, bucketPath }) =>
        new Promise(resolve =>
            s3.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: bucketPath,
                Body: fs.readFileSync(filePath),
            })).then(() => {
                console.log('uploaded', filePath);
                resolve();
            })
        )
    ));

})().then(() => {
    process.exit(0);
}).catch((error) => {
    console.error(error)
    process.exit(1);
});

function walkSync(path, callback) {
    fs.readdirSync(path).forEach((file) => {
        const filePath = `${path}/${file}`;
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
            walkSync(filePath, callback);
        } else {
            callback(filePath);
        }
    });
}