import styles from './index.module.css';
import classNames from "classnames";
import resume from './../../assets/resume.pdf';

export default function Navbar({showHome}: { showHome: boolean }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.items}>
                <a className={styles.name} href={'/'}>Bo Bramer</a>
                <div style={{flex: 1}}/>
                {showHome && <a href={'/'} className={classNames(styles.item, styles.padding)}>Home</a>}
                <a href={'/about'} className={classNames(styles.item, styles.padding)}>About</a>
                <a href={'/projects'} className={classNames(styles.item, styles.padding)}>Projects</a>
                <a href={'/contact'} className={classNames(styles.item, styles.padding)}>Contact</a>
                <a href={resume} target={'_blank'} className={classNames(styles.item, styles.padding)}>Resume</a>
            </div>
        </div>
    );
};