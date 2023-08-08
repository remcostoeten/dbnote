import React from "react"

import { AdobeIcon } from "./AdobeIcon"
import { BootstrapIcon } from "./BootstrapIcon"
import { CssIcon } from "./CssIcon"
import { GitICon } from "./GitICon"
import { Gitlab } from "./Gitlab"
import { HtmlIcon } from "./HtmlIcon"
import { JiraIcon } from "./JiraIcon"
import { LinkedIn } from "./LinkedIn"
import { Magento } from "./Magento"
import { Mui } from "./Mui"
import { Next } from "./Next"
import { NpmIcon } from "./NpmIcon"
import { Photoshop } from "./Photoshop"
import { ReactIcon } from "./ReactIcon"
import { Sass } from "./Sass"
import { Sketch } from "./Sketch"
import { StyledComponentIcon } from "./PhotoshopIcon"
import { TailwindIcon } from "./TailwindIcon"
import { TypescriptIcon } from "./TypescriptIcon"
import { Vim } from "./Vim"
import { Vue } from "./Vue"

export default function IconMap() {
  const iconMapper = {
    adobe: <AdobeIcon />,
    bootstrap: <BootstrapIcon />,
    css: <CssIcon />,
    git: <GitICon />,
    gitlab: <Gitlab />,
    html: <HtmlIcon />,
    jira: <JiraIcon />,
    linkedin: <LinkedIn />,
    magento: <Magento />,
    mui: <Mui />,
    next: <Next />,
    npm: <NpmIcon />,
    photoshop: <Photoshop />,
    react: <ReactIcon />,
    sass: <Sass />,
    sketch: <Sketch />,
    styled: <StyledComponentIcon />,
    tailwind: <TailwindIcon />,
    typescript: <TypescriptIcon />,
    vim: <Vim />,
    vue: <Vue />,
  }

  const iconsToShow = [
    "adobe",
    "bootstrap",
    "css",
    "git",
    "gitlab",
    "html",
    "jira",
    "linkedin",
    "magento",
    "mui",
    "next",
    "npm",
    "photoshop",
    "react",
    "sass",
    "sketch",
    "styled",
    "tailwind",
    "typescript",
    "vim",
    "vue",
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {iconsToShow.map((icon) => (
        <div key={icon} className="flex items-center justify-center">
          {iconMapper[icon]}
        </div>
      ))}
    </div>
  )
}
