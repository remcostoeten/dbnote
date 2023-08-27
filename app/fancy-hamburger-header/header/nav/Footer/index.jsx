import styles from './style.module.scss';
import { translate } from '../../anim';
import { motion } from 'framer-motion';
import Link from 'next/link';
export default function Footer() {
    return (
        <div className={styles.footer}>
            <ul>
                <motion.li 
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span>With <span className="heart">❤️</span>: from the Netherlands.</span>
                </motion.li>
            </ul>
            <ul>
                <motion.li  
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span>Personal projects on: <Link href="https://github.com/remcostoeten">Github</Link></span>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
 <span>Code I write for work on: <Link href="https://gitlab.com/remcostoeten">Gitlab</Link></span>                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span><Link href="https://linkedin.com/remcostoeten">LinkedIn</Link></span>
                </motion.li>
                <motion.li 
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <Link href="https://snippets.remcostoeten.com" target="_blank"><span>Snippets</span></Link>
                </motion.li>
            </ul>
        </div>
    );
}
