import styles from './index.module.css';
import Navbar from "../../components/navbar";
import 'remixicon/fonts/remixicon.css';
import bo from '../../assets/bo/bo-full.png';

export default function AboutPage() {

    return (
        <div className={styles.content}>
            <Navbar showHome={true} />
            <div className={styles.twoColumn}>
                <div className={styles.column} style={{ paddingLeft: '10%', height: '100vh', justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className={styles.title}>What's Poppin!</div>
                    <div className={styles.paragraph} id={styles.p1}>Hi! My name is <span className="blue">Bo Bramer</span>, and I'm a full-stack engineer with a degree in chemical
                        engineering from the University of California, Irvine. I like building websites and web applications for people around the
                        world to use. Currently, I'm developing interactive learning tools for students studying chemistry related fields for my
                        nonprofit, ChemTalk, and I'm working as the lead software engineer for iBored.
                    </div>
                    <div className={styles.paragraph} id={styles.p2}>In my free time, I've been learning how to grow vegetables and mushrooms in my garden. Most recently, I've been
                        designing an automated hydroponics system for lettuce. Side projects I'm working on include Applico, a website built in React that uses
                        column-based group layout to help users organize their job applications, and VCBB, a wesite built using the T3 stack for users to share virtual circuit board blueprints.
                    </div>
                    <div className={styles.button}>
                        <a href="https://www.linkedin.com/in/bo-bramer/" target="_blank">
                            <button className={styles.socialButton} id={styles.b1}><i className="ri-linkedin-fill" /></button>
                        </a>
                        <a href="https://github.com/wuguishifu" target="_blank">
                            <button className={styles.socialButton} id={styles.b2}><i className="ri-github-fill" /></button>
                        </a>
                        <a href="https://instagram.com/theonetheycallbo" target="_blank">
                            <button className={styles.socialButton} id={styles.b3}><i className="ri-instagram-line" /></button>
                        </a>
                        <a href="mailto:bramer.bo@gmail.com" target="_blank">
                            <button className={styles.socialButton} id={styles.b4}><i className="ri-at-line" /></button>
                        </a>
                    </div>
                </div>
                <div className={styles.column} style={{ zIndex: -1 }}>
                    <img className={styles.bo} src={bo} alt={'bo.png'} />
                </div>
            </div>
        </div>
    );
};