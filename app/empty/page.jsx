"use client"
import Link from "next/link"
import React from "react"

export default function custoMmenu() {
  return (
    <>
      {" "}
      <Link
        href={item.done ? item.href : "#"} // Disable link if "done" is false
        className={cn(
          "flex w-fit items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
          "text-white ",
          item.done === false && "cursor-not-allowed opacity-80" // Add "disabled" class if "done" is false
        )}
      >
        {item.title}
      </Link>
      <div className="inline-flex h-[236px] w-[1440px] flex-col items-center justify-start bg-white shadow">
        <div className="inline-flex w-[1280px] items-start justify-start px-8">
          <div className="flex h-[156px] shrink grow basis-0 items-start justify-start gap-6 py-8">
            <div className="flex h-[92px] shrink grow basis-0 items-start justify-start gap-4 rounded-lg p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-gray-200 bg-white p-3 shadow">
                <div className="inline-flex h-6 w-6 items-center justify-center py-[3px] pl-1 pr-[3.35px]" />
              </div>
              <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3">
                <div className="flex h-[68px] flex-col items-start justify-start gap-1 self-stretch">
                  <div className="inline-flex items-center justify-start gap-2 self-stretch">
                    <div className="text-base font-semibold leading-normal text-gray-900">
                      About us
                    </div>
                  </div>
                  <div className="self-stretch text-sm font-normal leading-tight text-slate-600">
                    Learn about our story and our mission statement.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[92px] shrink grow basis-0 items-start justify-start gap-4 rounded-lg p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-gray-200 bg-white p-3 shadow">
                <div className="inline-flex h-6 w-6 items-center justify-center pb-1 pl-[2.39px] pr-[3px] pt-[3px]" />
              </div>
              <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3">
                <div className="flex h-[68px] flex-col items-start justify-start gap-1 self-stretch">
                  <div className="inline-flex items-center justify-start gap-2 self-stretch">
                    <div className="text-base font-semibold leading-normal text-gray-900">
                      Press
                    </div>
                  </div>
                  <div className="self-stretch text-sm font-normal leading-tight text-slate-600">
                    News and writings, press releases, and resources.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[92px] shrink grow basis-0 items-start justify-start gap-4 rounded-lg p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-gray-200 bg-white p-3 shadow">
                <div className="inline-flex h-6 w-6 items-center justify-center px-0.5 py-[3px]" />
              </div>
              <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3">
                <div className="flex h-[68px] flex-col items-start justify-start gap-1 self-stretch">
                  <div className="inline-flex items-center justify-start gap-2 self-stretch">
                    <div className="text-base font-semibold leading-normal text-gray-900">
                      Careers
                    </div>
                    <div className="flex items-center justify-start gap-1.5 rounded-md border border-gray-300 bg-white px-2 py-0.5 shadow">
                      <div className="flex h-2 w-2 items-center justify-center p-px">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      </div>
                      <div className="text-center text-sm font-medium leading-tight text-slate-700">
                        We’re hiring!
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch text-sm font-normal leading-tight text-slate-600">
                    We’re always looking for talented people. Join us!
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[92px] shrink grow basis-0 items-start justify-start gap-4 rounded-lg p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-gray-200 bg-white p-3 shadow">
                <div className="inline-flex h-6 w-6 items-center justify-center px-0.5 py-[3px]" />
              </div>
              <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3">
                <div className="flex h-[68px] flex-col items-start justify-start gap-1 self-stretch">
                  <div className="inline-flex items-center justify-start gap-2 self-stretch">
                    <div className="text-base font-semibold leading-normal text-gray-900">
                      Legal
                    </div>
                  </div>
                  <div className="self-stretch text-sm font-normal leading-tight text-slate-600">
                    All the boring stuff that we Dan from legal made us add.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-start justify-center self-stretch bg-gray-50">
          <div className="flex h-20 items-center justify-start gap-4 px-8">
            <div className="flex h-20 shrink grow basis-0 items-center justify-center py-7">
              <div className="flex items-center justify-center gap-2">
                <div className="text-base font-semibold leading-normal text-violet-700">
                  Looking for a new career? Get in touch
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
