'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';

// const links = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     src: "home.png",
//   },
//   {
//     title: "HTML to JSX",
//     href: "/html-to-jsx",
//     src: "shop.png",
//   },
//   {
//     title: "Geolocation",
//     href: "/geolocation",
//     src: "home.png",
//   },
//   {
//     title: "Url extractor",
//     href: "https://vsc.remcostoeten.com/url",
//     target: "_blank",
//     src: "contact.png",
//   },
//   {
//     title: "Todos",
//     href: "/todo",
//     src: "contact.png"
//   }, 
//   { 
//     title: "Expenses",
//     href: "/income",
//   },
//   {
//     title: "Thoughts",
//     href: "/thoughts",
//     src: "home.png",
//   },
//   {    
//     title: "Docs",
//      label: "WiP",
//     href: "/docs/docs",
//     src: "home.png",
//   }
 
// ]


const links = [
  {
    title: "Home",
    href: "/",
    src: "home.png"
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    src: "shop.png"
  },
  {
    title: "Geolocation",
    href: "/geolocation",
    src: "home.png"
  },
  {
   title: "HTML to JSX",
href: "/html-to-jsx",
    src: "home.png"
  },
  {
    title: "Todos",
href: "/todo",
    src: "lookbook.png"
  },
  {
    title: "Expenses",
href: "/income",
    src: "contact.png"
  },
  {
    title: "Thoughts",
href: "/thoughts",
    src: "contact.png"
  }
]

export default function Index() {

  const [selectedLink, setSelectedLink] = useState({isActive: false, index: 0});

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink}/>
          <Footer />
        </div>
        <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive}/>
      </div>
    </motion.div>
  )
}