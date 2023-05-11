import styles from './index.module.css';
import { useParams } from "react-router-dom";
import projectPages from "../../../project-pages";
import classNames from "classnames";
import getImageUrl from "../../../project-pages/images";
import Carousel from "../../../components/carousel";
import { useRef } from "react";
import useOnScreen from "../../../hooks/useOnScreen";

interface PageContent {
    index: number;
    title: string;
    content: string;
    imageFooter: string;
    aspectRatio: number;
    hasCarousel?: boolean;
    carousel?: [{
        imageFooter: string;
    }];
}

interface PageStyling {
    colorScheme: string;
    numPages: number;
    needsShadows?: boolean
}

export default function ProjectPage() {
    const { project } = useParams();
    // @ts-ignore
    const data = projectPages[project];

    return (
        <div className={styles.content}>
            {data.pages.map((page: PageContent) => <Section content={page} styling={data.styling} />)}
            {<Footer content={data.footer} styling={data.styling} />}
        </div>
    );
};

function Section({ content, styling }: { content: PageContent, styling: PageStyling }) {
    const sectionRef = useRef(null);
    const [sectionVisible, hasAppeared] = useOnScreen(sectionRef);

    return (
        <div ref={sectionRef} className={classNames(
            styles.section,
            content.index % 2 === 0 ? styles.white : styles[styling.colorScheme],
            content.index % 2 === 0 ? styles.leftMajor : styles.rightMajor
        )} key={`page-${content.index}`}>
            <div className={styles.left}>
                {content.index % 2 === 0 ?
                    <div className={(sectionVisible || hasAppeared) ? styles.imageAnimation : styles.transparent}>
                        <div style={{ width: '100%', aspectRatio: content.aspectRatio }}>
                            {content.carousel ?
                                <Carousel pages={content.carousel.map(item => ({ imageUrl: getImageUrl(item.imageFooter) }))} /> :
                                <img className={styling.needsShadows ? classNames(styles.sectionImage, styles.shadow) : styles.sectionImage}
                                    src={getImageUrl(content.imageFooter)} alt={content.imageFooter} />
                            }
                        </div>
                    </div> :
                    <div className={styles.sectionText}>
                        <div className={`${styles.title} ${(sectionVisible || hasAppeared) ? styles.titleAnimation : ''}`}>{content.title}</div>
                        <div className={`${styles.text} ${(sectionVisible || hasAppeared) ? styles.textAnimation : ''}`}>{content.content}</div>
                    </div>
                }
            </div>
            <div className={styles.right}>
                {content.index % 2 === 0 ?
                    <div className={styles.sectionText}>
                        <div className={`${styles.title} ${(sectionVisible || hasAppeared) ? styles.titleAnimation : ''}`}>{content.title}</div>
                        <div className={`${styles.text} ${(sectionVisible || hasAppeared) ? styles.textAnimation : ''}`}>{content.content}</div>
                    </div> :
                    <div className={(sectionVisible || hasAppeared) ? styles.imageAnimation : styles.transparent}>
                        <div style={{ width: '100%', aspectRatio: content.aspectRatio }}>
                            {content.carousel ?
                                <Carousel pages={content.carousel.map(item => ({ imageUrl: getImageUrl(item.imageFooter) }))} /> :
                                <img className={styling.needsShadows ? classNames(styles.sectionImage, styles.shadow) : styles.sectionImage}
                                    src={getImageUrl(content.imageFooter)} alt={content.imageFooter} />
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

interface Footer {
    blurb: string;
    imageFooter: string;
    buttonUrl: string;
}

function Footer({ content, styling }: { content: Footer, styling: PageStyling }) {
    const footerRef = useRef(null);
    const [footerVisible, hasAppeared] = useOnScreen(footerRef);

    return (
        <div ref={footerRef} className={classNames(
            styles.section,
            styles.footer,
            styling.numPages % 2 === 0 ? styles.white : styles[styling.colorScheme]
        )}>
            <div className={styles.left}>
                <div className={styles.footerText}>
                    <div className={`${styles.title} ${(footerVisible || hasAppeared) ? styles.footerTextAnimation : ''}`}>Want to see more?</div>
                    <div className={`${styles.text} ${(footerVisible || hasAppeared) ? styles.footerTextAnimation : ''}`}>{content.blurb}</div>
                    {content.buttonUrl && <div className={`${styles.buttonHolder} ${(footerVisible || hasAppeared) ? styles.footerAnimation : styles.transparent}`}>
                        <a className={styles.buttonRoundedSecondary} href={content.buttonUrl} target={"_blank"}>Click me!</a>
                    </div>}
                </div>
            </div>
            <div className={`${styles.right} ${(footerVisible || hasAppeared) ? styles.footerAnimation : styles.transparent}`}>
                <img className={styles.footerImage} style={{ backgroundColor: 'white' }} src={getImageUrl(content.imageFooter)}
                    alt={content.imageFooter} />
            </div>
        </div>
    );
}
