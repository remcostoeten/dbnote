"use client"

import { useEffect, useState } from "react"
import { cubicBezier, motion } from "framer-motion"
import Slider from "react-slick"

import BootstrapIcon from "@/components/icons/BootstrapIcon"
import FirebaseLogo from "@/components/icons/FirebaseLogo"
import GitICon from "@/components/icons/GitICon"
import LinkedIn from "@/components/icons/LinkedIn"
import Magento from "@/components/icons/Magento"
import Mui from "@/components/icons/Mui"
import NextIcon from "@/components/icons/NextIcon"
import Photoshop from "@/components/icons/PhotoshopIcon"
import ReactIcon from "@/components/icons/ReactIcon"
import Sass from "@/components/icons/Sass"
import ShadCn from "@/components/icons/ShadCn"
import Sketch from "@/components/icons/Sketch"
import TailwindIcon from "@/components/icons/TailwindIcon"
import Vim from "@/components/icons/Vim"
import Vue from "@/components/icons/Vue"

const banners = [
  { icon: <BootstrapIcon /> },
  { icon: <GitICon /> },
  { icon: <LinkedIn /> },
  { icon: <Magento /> },
  { icon: <Mui /> },
  { icon: <Photoshop /> },
  { icon: <Sass /> },
  { icon: <Sketch /> },
  { icon: <Vim /> },
  { icon: <Vue /> },
  { icon: <FirebaseLogo /> },
  { icon: <NextIcon /> },
  { icon: <ReactIcon /> },
  { icon: <ShadCn /> },
  { icon: <TailwindIcon /> },
]

const IconCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset
      setScrollPosition(currentPosition)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const settings = {
    dots: false,
    navigator: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 11,
    autoplay: true,
    autoplaySpeed: 50,
    cssEase: "linear",
    swipeToSlide: false,
    touchThreshold: 10,
    responsive: [],
    rtl: scrollPosition > 600 ? false : true,
  }

  return (
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <motion.div
          initial={{
            opacity: 0,
            y: 5,
            scale: 0.2,
            transformOrigin: "left",
            translateX: -50,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transformOrigin: "left",
            translateX: 0,
          }}
          transition={{
            delay: 1.1,
            duration: 0.5,
            ease: cubicBezier(0.35, 0.17, 0.46, 0.35),
          }}
          key={index}
        >
          {banner.icon}
        </motion.div>
      ))}
    </Slider>
  )
}

export { IconCarousel }
