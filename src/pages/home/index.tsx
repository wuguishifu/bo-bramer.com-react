import styles from './index.module.css';
import Navbar from "../../components/navbar";
import Chibi from '../../assets/chibi/chibi-reflected.png'
import {useNavigate} from "react-router-dom";

const paths = [
    '/projects/periodic-table',
    '/projects/boba-tracker',
    '/projects/molecular',
    '/projects/mujank',
]

export default function HomePage() {
    const navigate = useNavigate();

    function handleShowMe() {
        navigate(paths[Math.floor(Math.random() * paths.length)]);
    }

    return (
        <div className={styles.content}>
            <Navbar showHome={false}/>
            <div className={styles.twoColumn}>
                <div className={styles.column} style={{paddingLeft: '10%'}}>
                    <div className={styles.title1}>Hey there!</div>
                    <div className={styles.title2}>I'm <span className={'blue'}>Bo Bramer.</span></div>
                    <div className={styles.paragraph}>I build educational apps and websites.</div>
                    <div className={styles.paragraph}>Ask me about chemistry!</div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div className={styles.button} id={styles.button1} onClick={handleShowMe}>Show me something cool!</div>
                    </div>
                </div>
                <div className={styles.column}>
                    <img src={Chibi} className={styles.graphic} alt={'chibi bo'}/>
                </div>
            </div>
        </div>
    );
}