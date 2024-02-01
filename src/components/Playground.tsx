"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import Editor from "@/components/Editor"
import React from "react"

import { ContentContext } from '@/components/Context'
import Preview from "@/components/Preview"

export function Playground() {
  const [content, setContent] = React.useState('')

  return (
    <ResizablePanelGroup direction="horizontal">
      <ContentContext.Provider value={{ content, setContent }}>
        <ResizablePanel minSize={30} defaultSize={50}>
          <Editor />
        </ResizablePanel>
        <ResizableHandle className="h-screen" withHandle />
        <ResizablePanel minSize={30} defaultSize={50}>
          <Preview />
        </ResizablePanel>
      </ContentContext.Provider>
    </ResizablePanelGroup>
  )
}
