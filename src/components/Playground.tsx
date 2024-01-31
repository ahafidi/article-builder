import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import Editor from "@/components/Editor"

export function Playground() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={45} defaultSize={50}>
        <Editor />
      </ResizablePanel>
      <ResizableHandle className="h-screen" withHandle />
      <ResizablePanel minSize={35} defaultSize={50}>
        <div className="flex items-center justify-center p-5">
          <span className="font-semibold">Preview</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
