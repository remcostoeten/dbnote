"use client"

import { useCallback, useEffect, useState } from "react"
import { Editor } from "@monaco-editor/react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Home: React.FC = () => {
  const [code, setCode] = useState<string | undefined>("// Enter HTML here")
  const [jsx, setJSX] = useState<string>("")
  const [componentName, setComponentName] = useState<string>("ComponentName")
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [isClientComponent, setIsClientComponent] = useState<boolean>(false)
  const [wrapInFunctionComponent, setWrapInFunctionComponent] = useState(false)
  const [isTypescript, setIsTypescript] = useState(false)

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

      const renderedJSX = wrapInFunctionComponent
        ? isTypescript
          ? `export default function ${componentName}(): React.FC {\n ${jsxCode} \n}`
          : `export default function ${componentName}() {\n return (<>${jsxCode} \n</>)}`
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
      <div className="- absolute left-0 right-0 top-0 z-0 h-full">
        <div className="absolute bottom-0 left-0 right-0 h-[300px]"></div>
      </div>
      <div className="relative isolate pt-14">
        <div className="flex align-middle items-center">
          <Input
            type="checkbox"
            className="m-w-[20px] mr-2 w-[40px]"
            checked={wrapInFunctionComponent}
            onChange={(e) => setWrapInFunctionComponent(e.target.checked)}
          />
          <Label className="font-semibold text-xl">
            Wrap in functional component?
          </Label>
          <div className="flex flex-col">
            <Label>Component name</Label>
            <Input
              type="text"
              className="ml-2"
              onChange={(e) => setComponentName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex align-middle items-center mt-2">
          <Input
            type="checkbox"
            className="m-w-[20px] mr-2 w-[40px]"
            checked={isTypescript}
            onChange={(e) => setIsTypescript(e.target.checked)}
          />
          <Label className="font-semibold text-xl">TypeScript?</Label>
        </div>
        <div className="flex align-middle items-center">
          <Input
            type="checkbox"
            className="m-w-[20px] mr-2 w-[40px]"
            checked={isClientComponent}
            onChange={(e) => setIsClientComponent(e.target.checked)}
          />
          <Label className="font-semibold text-xl">Client component?</Label>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {showNotification ? (
            <div
              aria-live="assertive"
              className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
              <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-white">
                          Successfully copied!
                        </p>
                      </div>
                      <div className="ml-4 flex flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setShowNotification(false)}
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="relative mt-16 grid max-w-full gap-4 rounded-md border border-zinc-900 bg-neutral-900 p-4 shadow-[0_20px_207px_rgba(249,_115,_22,_0.2)] ring-1 ring-white/10 sm:mt-24 sm:grid-cols-2">
            <Editor
              height="60vh"
              defaultLanguage="javascript"
              defaultValue={code}
              className="rounded-full"
              theme="vs-dark"
              options={{
                minimap: {
                  enabled: false,
                },
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
