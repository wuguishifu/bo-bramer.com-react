import styles from './index.module.css';
import classNames from "classnames";

import ptableImage from '../../../assets/projects/ptable/display.png';
import bobaTrackerImage from '../../../assets/projects/boba/default.png';
import molecularImage from '../../../assets/projects/molecular/benz-default.png';
import mujankImage from '../../../assets/projects/mujank/preview.png';
import {useEffect} from "react";

const elementVisible = -1000;

export default function ProjectsPage() {

    useEffect(() => {
        const projects = document.getElementsByClassName(styles.project);
        window.addEventListener('scroll', () => onScroll(projects));

        onScroll(projects);
        return () => window.removeEventListener('scroll', () => onScroll(projects));
    }, []);

    function onScroll(projects: HTMLCollectionOf<Element>) {
        const scrollY = window.scrollY;
        const diff = scrollY - elementVisible;

        if (!projects) return;
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].classList.contains(styles.visible)) {
                continue;
            }

            let elementTop = projects[i].getBoundingClientRect().top;
            if (elementTop < diff) {
                projects[i].classList.add(styles.visible);
                projects[i].classList.add(styles.projectAnimation)
                let children = projects[i].childNodes;
                for (let j = 0; j < children.length; j++) {
                    setVisible(children[j]);
                }
            }
        }
    }

    function setVisible(e: any) {
        if (!e.classList) return;
        if (e.classList.contains(styles.header)) {
            e.classList.add(styles.headerAnimation);
            return;
        } else if (e.classList.contains(styles.description)) {
            e.classList.add(styles.textAnimation);
            return;
        } else if (e.classList.contains(styles.image)) {
            e.classList.add(styles.imageAnimation);
            return;
        }
        if (e.firstChild) {
            let children = e.childNodes;
            for (let i = 0; i < children.length; i++) {
                setVisible(children[i]);
            }
        }
    }

    return (
        <div className={styles.content} style={{paddingTop: 100}}>
            <div className={styles.projectsWrapper}>
                <div className={styles.projectRow}>
                    <a className={classNames(styles.project, styles.projectHorizontal, styles.gradientBlue)} style={{width: '100%'}} id={styles.ptable}
                       href={'/projects/periodic-table'}>
                        <div className={styles.left}>
                            <div className={styles.text}>
                                <h1 className={styles.header}>Interactive Periodic Table</h1>
                                <p className={styles.description}>I built this interactive periodic table in an effort to give chemistry students a
                                    better-designed and more interactive periodic table than any others on the internet for my nonprofit,
                                    ChemTalk.</p>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <img id={styles.ptableImage} src={ptableImage} alt={'ptable.png'} className={styles.image}/>
                        </div>
                    </a>
                </div>
                <div className={styles.projectRow}>
                    <a className={classNames(styles.project, styles.projectVertical, styles.gradientRed)} style={{width: '40%', height: 700, overflow: 'hidden'}}
                       id={styles.boba} href={'/projects/boba-tracker'}>
                        <div className={styles.text}>
                            <h1 className={styles.header}>Boba Tracker</h1>
                            <p className={styles.description}>Boba Tracker is an app where a user can track their boba orders, get recommended drinks,
                                and monitor their spending.</p>
                        </div>
                        <img id={styles.bobaTrackerImage} src={bobaTrackerImage} alt={'boba.png'} className={styles.image}/>
                    </a>
                    <a className={classNames(styles.project, styles.projectVertical, styles.gradientGreen)} style={{width: '57.5%', height: 700, overflow: 'hidden'}}
                       id={styles.molecular} href={'/projects/molecular'}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '5%', marginBottom: '5%'}}>
                            <img id={styles.molecularImage} src={molecularImage} alt={'molecular.png'} className={styles.image}/>
                        </div>
                        <div className={styles.text} style={{justifyContent: 'flex-start'}}>
                            <h1 className={styles.header}>Molecular</h1>
                            <p className={styles.description}>Molecular is a 3D molecule modeling program where users can build and manipulate
                                molecular
                                structure in 3D space.</p>
                        </div>
                    </a>
                </div>
                <div className={styles.projectRow}>
                    <a className={classNames(styles.project, styles.projectHorizontal, styles.gradientBlurple)} style={{width: '100%'}}
                       id={styles.mujank} href={'/projects/mujank'}>
                        <div className={styles.left}>
                            <div className={styles.text}>
                                <h1 className={styles.header}>Mujank</h1>
                                <p className={styles.description}>Mujank is a Discord-based gacha game I built for my friends and I to use during
                                    covid.</p>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <img id={styles.mujankImage} src={mujankImage} alt={'mujank.png'} className={styles.image}/>
                        </div>
                    </a>
                </div>
            </div>
            <div style={{height: '10vh'}}/>
        </div>
    );
};
