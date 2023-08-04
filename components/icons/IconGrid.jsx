"use client"

import React, { useEffect, useRef } from "react"

import AdobeIcon from "./AdobeIcon"
import BootstrapIcon from "./BootstrapIcon"
import GitIcon from "./GitICon"
import HtmlIcon from "./HtmlIcon"
import JiraIcon from "./JiraIcon"
import Magento from "./Magento"
import Mui from "./Mui"
import Next from "./Next"
import NpmIcon from "./NpmIcon"
import Photoshop from "./Photoshop"
import Sass from "./Sass"
import Sketch from "./Sketch"
import StyledComponentIcon from "./StyledComponentIcon"
import TailwindIcon from "./TailwindIcon"
import TypescriptIcon from "./TypescriptIcon"
import Vim from "./Vim"
import Vue from "./Vue"

export default function IconGrid() {
  const sliderRef = useRef(null)
  const iconWidth = 260

  const icons = [
    { name: "Sass", icon: <Sass />, url: "https://sass-lang.com/" },
    { name: "Adobe", icon: <AdobeIcon />, url: "https://adobe.com/" },
    { name: "Magento", icon: <Magento />, url: "https://magento.com/" },
    {
      name: "Bootstrap",
      icon: <BootstrapIcon />,
      url: "https://getbootstrap.com/",
    },
    { name: "Git", icon: <GitIcon />, url: "https://git-scm.com/" },
    {
      name: "Jira",
      icon: <JiraIcon />,
      url: "https://www.atlassian.com/software/jira",
    },
    { name: "Mui", icon: <Mui />, url: "https://mui.com/" },
    { name: "Next", icon: <Next />, url: "https://nextjs.org/" },
    { name: "Npm", icon: <NpmIcon />, url: "https://www.npmjs.com/" },
    {
      name: "Photoshop",
      icon: <Photoshop />,
      url: "https://www.adobe.com/products/photoshop.html",
    },
    { name: "Sketch", icon: <Sketch />, url: "https://www.sketch.com/" },
    {
      name: "StyledComponent",
      icon: <StyledComponentIcon />,
      url: "https://styled-components.com/",
    },
    {
      name: "Tailwind",
      icon: <TailwindIcon />,
      url: "https://tailwindcss.com/",
    },
    {
      name: "Typescript",
      icon: <TypescriptIcon />,
      url: "https://www.typescriptlang.org/",
    },
    { name: "Vim", icon: <Vim />, url: "https://www.vim.org/" },
    { name: "Vue", icon: <Vue />, url: "https://vuejs.org/" },
    {
      name: "Html",
      icon: <HtmlIcon />,
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
  ]

  useEffect(() => {
    const slider = sliderRef.current

    const scrollLength = icons.length * iconWidth
    const animationDuration = icons.length * 2 + "s"
    slider.style.animationDuration = animationDuration

    return () => {
      slider.style.animationDuration = ""
    }
  }, [icons])

  return (
    <div ref={sliderRef} className="carousel">
      {icons.map((icon, index) => (
        <div key={index} style={{ flex: "0 0 auto", width: `${iconWidth}px` }}>
          {icon.icon}
          <div>
            <h3>{icon.name}</h3>
            <p>App dir, Routing, Layouts, Loading UI and API routes.</p>
          </div>
        </div>
      ))}
      {icons.map((icon, index) => (
        <div key={index} style={{ flex: "0 0 auto", width: `${iconWidth}px` }}>
          {icon.icon}
          <div>
            <h3>{icon.name}</h3>
            <p>App dir, Routing, Layouts, Loading UI and API routes.</p>
          </div>
        </div>
      ))}
    </div>
  )
}
