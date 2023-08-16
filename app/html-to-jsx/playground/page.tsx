"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Editor } from "@monaco-editor/react"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

import { AppContext } from "./AppContext"
import PropsEditor from "./components/ props-editor"
import { CodeViewer } from "./components/code-viewer"
import { MaxLengthSelector } from "./components/maxlength-selector"
import ModelSelector from "./components/model-selector"
import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { models, types } from "./data/models"
import { presets } from "./data/presets"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function PlaygroundPage() {
  const [code, setCode] = useState<string | undefined>("// Enter HTML here")
  const [jsx, setJSX] = useState<string>("")
  const editorRef = useRef(null)
  const [isTypescript, setIsTypescript] = useState(false)
  const [componentName, setComponentName] = useState<string>("ComponentName")
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [isClientComponent, setIsClientComponent] = useState<boolean>(false)
  const [wrapInFunctionComponent, setWrapInFunctionComponent] = useState(false)
  const [propsInput, setPropsInput] = useState("")
  const [propsArray, setPropsArray] = useState<string[]>([""])

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

      const trimmedPropsArray = propsArray.map((prop) => prop.trim())
      const hasProps = trimmedPropsArray.some((prop) => prop.length > 0)
      let renderedJSX

      const propsString = trimmedPropsArray.join(", ")

      if (wrapInFunctionComponent) {
        if (isTypescript && hasProps) {
          const interfaceProps = `
    interface ${componentName}Props {
        ${propsString.split(",").join("?: any;\n  ")}?: any;
    }`

          const propsType = hasProps ? `<${componentName}Props>` : ""
          const funcProps = hasProps ? `({ ${propsString} })` : "()"

          renderedJSX = `
    ${clientPrefix}
    ${interfaceProps}
    
    const ${componentName}: React.FC${propsType} = ${funcProps} => {
        return (<>\n${jsxCode}\n</>);
    };
    
    export default ${componentName};
    `
        } else {
          renderedJSX = `
    ${clientPrefix}
    
    export default function ${componentName} (${
            hasProps ? `{${propsString}}` : ""
          }) {
        return (<>\n${jsxCode}\n</>);
    };
    `
        }
      } else {
        renderedJSX = jsxCode
      }

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

  function handlePropChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const updatedProps = [...propsArray]
    updatedProps[index] = event.target.value
    setPropsArray(updatedProps)
  }

  function addNewProp() {
    setPropsArray([...propsArray, ""])
  }

  function removeProp(index: number) {
    const updatedProps = [...propsArray]
    updatedProps.splice(index, 1)
    setPropsArray(updatedProps)
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
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            delay: 0.5,
          }}
          className="overflow-hidden rounded-[0.5rem] border bg-background shadow"
        >
          <Badge
            variant="default"
            className="transform-translate-x-3 absolute  right-0 -translate-x-12 translate-y-3"
          >
            Beta
          </Badge>
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
          <div className="hidden h-full flex-col md:flex ">
            <div className="container relative mb-1.5 mt-8 flex items-start justify-between space-y-2 pb-4 pt-0 sm:flex-row sm:items-end sm:space-y-0.5 md:h-16">
              <div className="flex w-40  flex-col gap-2">
                <Label className="translate-x-2.5">
                  What is the component name?
                </Label>
                <Input
                  type="text"
                  className="note-border w-[auto]"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  placeholder="Enter Component name)"
                />
              </div>

              <PropsEditor
                propsArray={propsArray}
                handlePropChange={handlePropChange}
                addNewProp={addNewProp}
                removeProp={removeProp}
              />
              <div className="ml-auto flex w-full space-x-2 sm:justify-end"></div>
            </div>
            <Tabs defaultValue="insert" className="flex-1">
              <div className=" h-full py-6">
                <div className="grid h-full w-full items-stretch gap-6 pr-8 md:grid-cols-[1fr_200px]">
                  <div className="hidden flex-col space-y-4 sm:flex md:order-2">
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
                          aa
                        </button>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{
                            damping: 15,
                            delay: 1,
                          }}
                        >
                          <Editor
                            height="60vh"
                            defaultLanguage="javascript"
                            defaultValue={code}
                            className="rounded-full"
                            options={{
                              minimap: {
                                enabled: true,
                              },
                              wordWrap: "on",
                              FormData: true,

                              renderValidationDecorations: "off",
                            }}
                            onChange={handleEditorChange}
                          />
                        </motion.div>
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
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{
                            damping: 15,
                            delay: 1,
                          }}
                          className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1"
                        >
                          <Editor
                            height="60vh"
                            defaultLanguage="javascript"
                            defaultValue={code}
                            className="rounded-full"
                            options={{
                              formatOnPaste: true,
                              formatOnType: true,
                              wordWrap: "on",
                              renderValidationDecorations: "off",
                              minimap: { enabled: false },
                              lineNumbers: "off",
                              lineDecorationsWidth: 12,
                              suggest: {
                                showFiles: false,
                              },
                            }}
                            onChange={handleEditorChange}
                          />
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{
                              damping: 15,
                              delay: 1,
                            }}
                            className="relative"
                          >
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
                                formatOnPaste: true,
                                formatOnType: true,
                                wordWrap: "on",
                                renderValidationDecorations: "off",
                                minimap: { enabled: false },
                                lineNumbers: "off",
                                lineNumbersMinChars: 3,
                                lineDecorationsWidth: 12,
                                suggest: {
                                  showFiles: false,
                                },
                              }}
                              theme="vs-dark"
                            />
                          </motion.div>
                        </motion.div>
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
                <h2 className="absolute right-0  top-0 w-full text-lg font-semibold">
                  Still in beta 🚀
                </h2>
              </div>
            </Tabs>
            <div className="m-3 flex gap-2 p-3">
              <PresetSelector presets={presets} />

              <PresetSave />
              <CodeViewer />
              <PresetShare />
              <PresetActions />
            </div>
          </div>
        </motion.div>
      </AppContext.Provider>
    </>
  )
}
