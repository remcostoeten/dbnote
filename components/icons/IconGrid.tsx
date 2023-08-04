'use client'
import React from "react";

import AdobeIcon from "./AdobeIcon";
import GitIcon from "./GitICon";
import HtmlIcon from "./HtmlIcon";
import JiraIcon from "./JiraIcon";
import Magento from "./Magento";
import Mui from "./Mui";
import Next from "./Next";
import NpmIcon from "./NpmIcon";
import Photoshop from "./Photoshop";
import Sass from "./Sass";
import Sketch from "./Sketch";
import StyledComponentIcon from "./StyledComponentIcon";
import TailwindIcon from "./TailwindIcon";
import TypescriptIcon from "./TypescriptIcon";
import Vim from "./Vim";
import Vue from "./Vue";

interface Icon {
  name: string;
  icon: JSX.Element;
  url: string;
}

export default function IconGrid() {
  const iconArray: Icon[] = [
    { name: "Adobe", icon: <AdobeIcon />, url: "https://adobe.com/" },
    { name: "Git", icon: <GitIcon />, url: "https://git-scm.com/" },
    { name: "Html", icon: <HtmlIcon />, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "Jira", icon: <JiraIcon />, url: "https://www.atlassian.com/software/jira" },
    { name: "Magento", icon: <Magento />, url: "https://magento.com/" },
    { name: "Mui", icon: <Mui />, url: "https://mui.com/" },
    { name: "Next", icon: <Next />, url: "https://nextjs.org/" },
    { name: "Npm", icon: <NpmIcon />, url: "https://www.npmjs.com/" },
    { name: "Photoshop", icon: <Photoshop />, url: "https://www.adobe.com/products/photoshop.html" },
    { name: "Sass", icon: <Sass />, url: "https://sass-lang.com/" },
    { name: "Sketch", icon: <Sketch />, url: "https://www.sketch.com/" },
    { name: "StyledComponent", icon: <StyledComponentIcon />, url: "https://styled-components.com/" },
    { name: "Tailwind", icon: <TailwindIcon />, url: "https://tailwindcss.com/" },
    { name: "Typescript", icon: <TypescriptIcon />, url: "https://www.typescriptlang.org/" },
    { name: "Vim", icon: <Vim />, url: "https://www.vim.org/" },
    { name: "Vue", icon: <Vue />, url: "https://vuejs.org/" },
  ];

  return (
    <div className="card slider relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="slider__inner flex h-[180px] flex-col justify-between rounded-md p-6">
        {iconArray.map((icon, index) => (
          <div key={index}>
            <a href={icon.url} target="_blank" rel="noopener noreferrer">
              {icon.icon}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
