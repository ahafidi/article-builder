"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import Editor from "@/components/Editor"
import React from "react"

import { ContentContext } from '@/components/Context'
import Loader from "@/components/Loader"
import Preview from "@/components/Preview"

export function Playground() {
  const [content, setContent] = React.useState('')

  return (
    <ResizablePanelGroup direction="horizontal">
      <ContentContext.Provider value={{ content, setContent }}>
        <ResizablePanel minSize={30} defaultSize={60}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={30} defaultSize={40}>
          <React.Suspense fallback={<Loader />}>
            <Preview />
          </React.Suspense>
        </ResizablePanel>
      </ContentContext.Provider>
    </ResizablePanelGroup>
  )
}
