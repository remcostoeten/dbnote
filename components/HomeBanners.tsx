"use client"

import React, { useEffect, useState } from "react"

import AnimatedDiv from "@/lib/AnimatedDiv"
import ToolCard from "@/components/core/Carousel/CardComponent"
import { banners } from "@/components/core/Carousel/Carousel"

export const HomeBanners = () => {
  const [scrollPosition, setScrollPosition] = useState(100)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  console.log(scrollPosition)

  return (
    <div className="big-container pt-8 mQ3_iconsb-22">
      <div className="grid mx-auto selection:grid col-span-3 gap-6 grid-cols-3 content-center items-center justify-items-center">
        {banners.map((banner, index) => (
          <AnimatedDiv
            key={index}
            delay={`1.9${index * 0.05}`}
            className="w-full icon-hover"
          >
            <ToolCard
              title={banner.title}
              description={banner.description}
              icon={banner.icon}
            />
          </AnimatedDiv>
        ))}
      </div>
    </div>
  )
}
