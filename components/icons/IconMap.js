import { AdobeIcon } from "./AdobeIcon"
import { BootstrapIcon } from "./BootstrapIcon"
import { CssIcon } from "./CssIcon"
import { Es6 } from "./Es6"
import { FirebaseLogo } from "./FirebaseLogo"
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
import { StyledComponentIcon } from "./StyledComponentIcon"
import { TailwindIcon } from "./TailwindIcon"
import { TypescriptIcon } from "./TypescriptIcon"
import { Vim } from "./Vim"
import { Vue } from "./Vue"

const iconMapper = {
  adobe: <AdobeIcon />,
  bootstrap: <BootstrapIcon />,
  css: <CssIcon />,
  es6: <Es6 />,
  firebase: <FirebaseLogo />,
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

export default function IconMap({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-full shadow-md">
        {iconMapper[icon]}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-center">{title}</h3>
      <p className="text-sm text-center">{description}</p>
    </div>
  )
}
