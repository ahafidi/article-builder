"use client"

import { Bold, Code2, Heading, Image, Italic, Link, List, ListOrdered, Quote, Sigma, Strikethrough, Underline } from "lucide-react"

import { Textarea } from "@/components//ui/textarea"
import {
  Button,
} from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React from "react"

export default function Editor() {

  const [content, setContent] = React.useState('')

  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const [cursorPosition, setCursorPosition] = React.useState<number | null>(null)

  const handleHeading = () => {
    if (!textareaRef.current) return

    const cursorPos = textareaRef.current.selectionStart
    const contentArray = content.split('\n')
    let currentLineStart = 0

    // Find the start position of the current line
    for (let i = 0; i < contentArray.length; i++) {
      if (currentLineStart + contentArray[i].length >= cursorPos) {
        const line = contentArray[i]
        let newContent = ''

        if (line.startsWith('######')) // h6 is the limit
          break

        if (line.startsWith('#')) {
          newContent = `${content.substring(0, currentLineStart)}#${content.substring(currentLineStart)}`
        } else {
          newContent = `${content.substring(0, currentLineStart)}# ${content.substring(currentLineStart)}`
        }

        setContent(newContent)
        break
      }

      currentLineStart += contentArray[i].length + 1 // +1 for the newline character
    }
    setCursorPosition(currentLineStart)
  }

  React.useEffect(() => {
    if (textareaRef.current && cursorPosition !== null) {
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition)
      textareaRef.current.focus()
      setCursorPosition(null)
    }
  }, [cursorPosition])

  return (
    <div className="h-full flex flex-col ml-5">
      <div className="m-0 flex flex-row gap-x-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHeading}
        >
          <Heading className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="my-2 h-10" />

        <Button
          variant="ghost"
          size="icon"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Underline className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="my-2 h-10" />

        <Button variant="ghost" size="icon">
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Image className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Code2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Sigma className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="my-2 h-10" />

        <Button variant="ghost" size="icon">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="mb-2 " />
      <div className="mr-2 grow">
        <Textarea
          className="resize-none h-full border-none focus-visible:ring-0"
          placeholder="Type your text here."
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  )
}
