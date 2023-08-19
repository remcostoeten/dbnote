"use client"

import React, { useEffect, useState } from "react"
import Slider from "react-slick"

import FirebaseLogo from "../../icons/FirebaseLogo"
import NextIcon from "../../icons/NextIcon"
import ReactIcon from "../../icons/ReactIcon"
import ShadCn from "../../icons/ShadCn"
import TailwindIcon from "../../icons/TailwindIcon"
import TypescriptIcon from "../../icons/TypescriptIcon"
import ToolCard from "./CardComponent"

const banners = [
  {
    title: "Firebase",
    description: "For user authentication and data storage.",
    icon: <FirebaseLogo />,
  },
  {
    title: "Next.js 13",
    description:
      "App router, Authentication, SSR, Data fetcing, API routes, Client components",
    icon: <NextIcon />,
  },
  {
    title: "React 18",
    description:
      "Server components, useSuspense, States managed in useContext.",
    icon: <ReactIcon />,
  },
  {
    title: "TailwindIcon",
    description:
      "Mostly Tailwind for the UI expect some custom SCSS which I prefer for very specific tasks and non framer-motion animations.",
    icon: <TailwindIcon />,
  },
  {
    title: "ShadCN/ui + Radix",
    description:
      "As a base for the ui components with some customizations. Clean, not styled, accessible and easy to use.",
    icon: <ShadCn />,
  },
  {
    title: "Typescript",
    description:
      "For type safety and a `better developer` experience. Althrough I HATE spending too much time on trying to compile 🤮.",
    icon: <TypescriptIcon />,
  },
]

const Carousel = () => {
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
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 100,
    cssEase: "linear",
    swipeToSlide: false,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    rtl: scrollPosition > 400 ? false : true,
  }

  return (
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <div key={index}>
          <ToolCard
            title={banner.title}
            description={banner.description}
            icon={banner.icon}
          />
        </div>
      ))}
    </Slider>
  )
}

export { Carousel, banners }
