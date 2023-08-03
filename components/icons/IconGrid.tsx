'use client';
import React, { useEffect, useRef } from 'react';
import AdobeIcon from './AdobeIcon';
import Magento from './Magento';
import Sass from './Sass';
import BootstrapIcon from './BootstrapIcon';
import GitIcon from './GitICon';
import Vim from './Vim';
import JiraIcon from './JiraIcon';
import Mui from './Mui';
import Next from './Next';
import NpmIcon from './NpmIcon';
import Photoshop from './Photoshop';
import Sketch from './Sketch';
import StyledComponentIcon from './StyledComponentIcon';
import TailwindIcon from './TailwindIcon';
import TypescriptIcon from './TypescriptIcon';
import HtmlIcon from './HtmlIcon';
import Vue from './Vue';

import Slider from 'react-infinite-logo-slider'


export default function IconGrid() {
    const sliderRef = useRef(null);
    const iconWidth = 260;
    const icons = [
        {
            name: "Sass",
            icon: <Sass />,
            url: "https://sass-lang.com/",
        },
        {
            name: "Adobe",
            icon: <AdobeIcon />,
            url: "https://adobe.com/",
        },
        {
            name: "Magento",
            icon: <Magento />,
            url: "https://magento.com/",
        },
        {
            name: "Bootstrap",
            icon: <BootstrapIcon />,
            url: "https://getbootstrap.com/",
        },
        {
            name: "Git",
            icon: <GitIcon />,
            url: "https://git-scm.com/",
        },
        {
            name: "Jira",
            icon: <JiraIcon />,
            url: "https://www.atlassian.com/software/jira",
        },
        {
            name: "Mui",
            icon: <Mui />,
            url: "https://mui.com/",
        },
        {
            name: "Next",
            icon: <Next />,
            url: "https://nextjs.org/",
        },
        {
            name: "Npm",
            icon: <NpmIcon />,
            url: "https://www.npmjs.com/",
        },
        {
            name: "Photoshop",
            icon: <Photoshop />,
            url: "https://www.adobe.com/products/photoshop.html",
        },
        {
            name: "Sketch",
            icon: <Sketch />,
            url: "https://www.sketch.com/",
        },
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
        {
            name: "Vim",
            icon: <Vim />,
            url: "https://www.vim.org/",
        },
        {
            name: "Vue",
            icon: <Vue />,
            url: "https://vuejs.org/",
        },
        {
            name: "Html",
            icon: <HtmlIcon />,
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        },
    ];


    return (
        <>
            <div className="horizontal-grid">
                {icons.map((icon, index) => (
                    <div key={index} className="card relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            {icon.icon}
                            <div className="space-y-2">
                                <h3 className="font-bold">{icon.name}</h3>
                                <p className="text-sm text-muted-foreground">App dir, Routing, Layouts, Loading UI and API routes.</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </>
    );
}
