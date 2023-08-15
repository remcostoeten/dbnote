"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Editor } from "@monaco-editor/react"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { AppContext } from "./AppContext"
import { CodeViewer } from "./components/code-viewer"
import { MaxLengthSelector } from "./components/maxlength-selector"
import ModelSelector from "./components/model-selector"
import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { models, types } from "./data/models"
import { presets } from "./data/presets"

export default function PlaygroundPage() {
  const [code, setCode] = useState<string | undefined>("// Enter HTML here")
  const [jsx, setJSX] = useState<string>("")
  const editorRef = useRef(null)
  const [isTypescript, setIsTypescript] = useState(false)
  const [componentName, setComponentName] = useState<string>("ComponentName")
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [isClientComponent, setIsClientComponent] = useState<boolean>(false)
  const [wrapInFunctionComponent, setWrapInFunctionComponent] = useState(false)

  useEffect(() => {
    const editorInstance = editorRef.current

    const timeoutId = setTimeout(() => {
      editorInstance?.getAction("editor.action.formatDocument")?.run()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    document.body.classList.add("html-to-jsx")
    return () => document.body.classList.remove("html-to-jsx")
  }, [])

  function convertHtmlToJSX(html: string): string {
    let jsx = html.replace(/\bclass=/g, "className=")
    jsx = jsx.replace(/\bfor=/g, "htmlFor=")

    jsx = jsx.replace(/\bon([a-z]+)/g, function (match: any, group: string) {
      return "on" + group.charAt(0).toUpperCase() + group.slice(1)
    })

    jsx = jsx.replace(/=(\w+)/g, function (match: any, group: string) {
      return `="${group}"`
    })

    jsx = jsx.replace(/style="([^"]*)"/g, function (match: any, group: string) {
      let style = group.split(";").reduce(function (style, rule) {
        let parts = rule.split(":")
        if (parts[1]) {
          let key = parts[0].trim()
          let value = parts[1].trim()
          if (!isNaN(value as any)) {
            value = parseInt(value).toString()
          } else if (value !== "true" && value !== "false") {
            value = `'${value}'`
          }
          key = key.replace(/-./g, function (x) {
            return x[1].toUpperCase()
          })
          style += key + ": " + value + ", "
        }
        return style
      }, "")
      return `style={{${style}}}`
    })

    const booleanAttributes = [
      "checked",
      "selected",
      "disabled",
      "readOnly",
      "multiple",
      "hidden",
    ]
    booleanAttributes.forEach((attr) => {
      const re = new RegExp(
        `<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*?\\b${attr}(?![^>]*?>)`,
        "g"
      )
      jsx = jsx.replace(re, `<$1 ${attr}={true}`)
    })

    const selfClosingTags = ["br", "hr", "img", "input", "link", "meta"]
    selfClosingTags.forEach((tag) => {
      const re = new RegExp(`<${tag}\\b([^>]*)(?<!/)>`, "g")
      jsx = jsx.replace(re, `<${tag}$1 />`)
    })

    jsx = jsx.replace(
      /<!--([\s\S]*?)-->/g,
      function (match: any, group: string) {
        const lines = group.split("\n")
        return lines.map((line) => `{/*${line.trim()}*/}`).join("\n")
      }
    )

    jsx = jsx.replace(
      /<(svg|path|circle|rect|line|polyline|polygon|text|g|defs|use|mask)[^>]*>/g,
      function (match: any) {
        return match.replace(/-([a-z])/g, function (match: any, group: string) {
          return group.toUpperCase()
        })
      }
    )

    if (isClientComponent) {
      jsx = jsx.replace(/&amp;/g, "is client")
    }

    return jsx
  }

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(jsx)
      .then(() => {
        console.log("Copying to clipboard was successful!")
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 5000)
      })
      .catch((err) => {
        console.error("Could not copy text: ", err)
      })
  }, [jsx])

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      setCode(value)
      let jsxCode = convertHtmlToJSX(value)

      const clientPrefix = isClientComponent ? "'use client';\n" : ""

      const renderedJSX = wrapInFunctionComponent
        ? isTypescript
          ? `${clientPrefix}const ${componentName}: React.FC = () => {\n  return (<>\n${jsxCode}\n</>);\n};\n\nexport default ${componentName};`
          : `${clientPrefix} export default function ${componentName}() {\n  return (<>\n${jsxCode}\n</>);\n}`
        : jsxCode

      setJSX(renderedJSX)

      if (jsxCode.length > 0) {
        useEffect(() => {
          document.body.classList.add("isTyping")
          const timeout = setTimeout(() => {
            document.body.classList.remove("isTyping")
          }, 1000)
          return () => clearTimeout(timeout)
        }, [jsxCode])
      }
    }
  }

  return (
    <>
      <AppContext.Provider
        value={{
          isTypescript,
          setIsTypescript,
          componentName,
          setComponentName,
          showNotification,
          setShowNotification,
          isClientComponent,
          setIsClientComponent,
          wrapInFunctionComponent,
          setWrapInFunctionComponent,
        }}
      >
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <div className="md:hidden">
            <Image
              src="/examples/playground-light.png"
              width={1280}
              height={916}
              alt="Playground"
              className="block dark:hidden"
            />
            <Image
              src="/example s/playground-dark.png"
              width={1280}
              height={916}
              alt="Playground"
              className="hidden dark:block"
            />
          </div>
          <div className="hidden h-full flex-col md:flex">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
              <h2 className="text-lg font-semibold">Playground</h2>
              <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                <PresetSelector presets={presets} />
                <PresetSave />
                <div className="hidden space-x-2 md:flex">
                  <CodeViewer />
                  <PresetShare />
                </div>
                <PresetActions />
              </div>
            </div>
            <Separator />
            <Tabs defaultValue="insert" className="flex-1">
              <div className=" h-full py-6">
                <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px] w-full pr-8">
                  <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                    <div className="grid gap-2">
                      <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Mode
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent
                          className="w-[320px] text-sm"
                          side="left"
                        >
                          Choose the interface that best suits your task. You
                          can provide: a simple prompt to complete, starting and
                          ending text to insert a completion within, or some
                          text with instructions to edit it.
                        </HoverCardContent>
                      </HoverCard>
                      <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="insert">
                          <span className="sr-only">Insert</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                              fill="currentColor"
                            ></path>
                            <rect
                              x="4"
                              y="15"
                              width="3"
                              height="2"
                              rx="1"
                              fill="currentColor"
                            ></rect>
                            <rect
                              x="8.5"
                              y="15"
                              width="3"
                              height="2"
                              rx="1"
                              fill="currentColor"
                            ></rect>
                            <rect
                              x="13"
                              y="15"
                              width="3"
                              height="2"
                              rx="1"
                              fill="currentColor"
                            ></rect>
                          </svg>
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <ModelSelector types={types} models={models} />
                    <MaxLengthSelector defaultValue={[256]} />
                  </div>
                  <div className="md:order-1">
                    <TabsContent value="complete" className="mt-0 border-0 p-0">
                      <div className="flex h-full flex-col space-y-4">
                        <button
                          onClick={handleCopy}
                          className="absolute right-0 top-0 z-50 rounded-md border border-zinc-700 bg-zinc-900 p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="#fff"
                            viewBox="0 0 256 256"
                          >
                            <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
                          </svg>
                        </button>
                        <Editor
                          height="60vh"
                          defaultLanguage="javascript"
                          defaultValue={code}
                          className="rounded-full"
                          options={{
                            minimap: {
                              enabled: false,
                            },
                            wordWrap: "on",
                            renderValidationDecorations: "off",
                          }}
                          onChange={handleEditorChange}
                        />
                        <div className="flex items-center space-x-2">
                          <Button>Submit</Button>
                          <Button variant="secondary">
                            <span className="sr-only">Show history</span>
                            <CounterClockwiseClockIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="insert" className="mt-0 border-0 p-0">
                      <div className="flex flex-col space-y-4">
                        <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                          <Editor
                            height="60vh"
                            defaultLanguage="javascript"
                            defaultValue={code}
                            className="rounded-full"
                            options={{
                              minimap: { enabled: false },
                              formatOnPaste: true,
                              formatOnType: true,
                              wordWrap: "on",
                              renderValidationDecorations: "off",
                            }}
                            onChange={handleEditorChange}
                          />
                          <div className="relative">
                            <button
                              onClick={handleCopy}
                              className="absolute right-0 top-0 z-50 rounded-md border border-zinc-700 bg-zinc-900 p-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="#fff"
                                viewBox="0 0 256 256"
                              >
                                <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path>
                              </svg>
                            </button>
                            <Editor
                              height="60vh"
                              defaultLanguage="javascript"
                              value={jsx}
                              options={{
                                minimap: {
                                  enabled: false,
                                },
                                wordWrap: "on",
                                renderValidationDecorations: "off",
                              }}
                              theme="vs-dark"
                            />
                          </div>{" "}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button>Submit</Button>
                          <Button variant="secondary">
                            <span className="sr-only">Show history</span>
                            <CounterClockwiseClockIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="edit" className="mt-0 border-0 p-0">
                      <div className="flex flex-col space-y-4">
                        <div className="grid h-full gap-6 lg:grid-cols-2">
                          <div className="flex flex-col space-y-4">
                            <div className="flex flex-1 flex-col space-y-2">
                              <Label htmlFor="input">Input</Label>
                              <Textarea
                                id="input"
                                placeholder="We is going to the market."
                                className="flex-1 lg:min-h-[580px]"
                              />
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Label htmlFor="instructions">Instructions</Label>
                              <Textarea
                                id="instructions"
                                placeholder="Fix the grammar."
                              />
                            </div>
                          </div>
                          <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button>Submit</Button>
                          <Button variant="secondary">
                            <span className="sr-only">Show history</span>
                            <CounterClockwiseClockIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}
