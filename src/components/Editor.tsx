"use client"

import { Bold, Code2, Heading, Image, Italic, Link, List, ListOrdered, Quote, Sigma, Strikethrough, Underline } from "lucide-react"

import { Textarea } from "@/components//ui/textarea"
import {
  Button,
} from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React from "react"

export default function Editor() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const [content, setContent] = React.useState('')
  const [cursorPosition, setCursorPosition] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (textareaRef.current && cursorPosition !== null) {
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition)
      textareaRef.current.focus()
      setCursorPosition(null)
    }
  }, [cursorPosition])

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

  const handleEmphasis = (emphasis: string) => () => {
    if (!textareaRef.current) return

    const startPos = textareaRef.current.selectionStart
    const endPos = textareaRef.current.selectionEnd

    // Retrieve the content
    const startContent = content.substring(0, startPos)
    const selectedContent = content.substring(startPos, endPos)
    const endContent = content.substring(endPos)

    const newContent = `${startContent}${emphasis}${selectedContent}${emphasis}${endContent}`

    setContent(newContent)

    const newStartPos = startPos + emphasis.length
    const newEndPos = newStartPos + selectedContent.length

    setTimeout(() => { // Add a slight delay to ensure proper execution
      textareaRef.current!.setSelectionRange(newStartPos, newEndPos)
      textareaRef.current!.focus()
    }, 0)
  }

  const handleBold = handleEmphasis('**')
  const handleItalic = handleEmphasis('*')
  const handleUnderline = handleEmphasis('__')
  const handleStrikethrough = handleEmphasis('--')

  const handleLink = () => {
    if (!textareaRef.current) return

    const startPos = textareaRef.current.selectionStart
    const endPos = textareaRef.current.selectionEnd

    const startContent = content.substring(0, startPos)
    const selectedContent = content.substring(startPos, endPos)
    const endContent = content.substring(endPos)

    const newContent =
      selectedContent === ''
        ? `${startContent}[text link](url)${endContent}`
        : `${startContent}[${selectedContent}](url)${endContent}`

    setContent(newContent)

    const newStartPos = startPos + 1
    const newEndPos = newStartPos + (selectedContent.length > 0 ? selectedContent.length : 9)

    setTimeout(() => {
      textareaRef.current!.setSelectionRange(newStartPos, newEndPos)
      textareaRef.current!.focus()
    }, 0)
  }

  const handleImage = () => {
    if (!textareaRef.current) return

    const startPos = textareaRef.current.selectionStart
    const endPos = textareaRef.current.selectionEnd

    const startContent = content.substring(0, startPos)
    const selectedContent = content.substring(startPos, endPos)
    const endContent = content.substring(endPos)

    const newContent =
      selectedContent === ''
        ? `${startContent}![alt text](url)${endContent}`
        : `${startContent}![${selectedContent}](url)${endContent}`

    setContent(newContent)

    const newStartPos = startPos + 2
    const newEndPos = newStartPos + (selectedContent.length > 0 ? selectedContent.length : 9)

    setTimeout(() => {
      textareaRef.current!.setSelectionRange(newStartPos, newEndPos)
      textareaRef.current!.focus()
    }, 0)
  }

  const handleQuote = () => {
    if (!textareaRef.current) return

    const cursorPos = textareaRef.current.selectionStart
    const contentArray = content.split('\n')
    let currentLineStart = 0

    for (let i = 0; i < contentArray.length; i++) {
      if (currentLineStart + contentArray[i].length >= cursorPos) {
        const line = contentArray[i]
        let newContent = ''

        if (line.startsWith('>')) {
          newContent = `${content.substring(0, currentLineStart)}>${content.substring(currentLineStart)}`
        } else {
          newContent = `${content.substring(0, currentLineStart)}> ${content.substring(currentLineStart)}`
        }

        setContent(newContent)
        break
      }

      currentLineStart += contentArray[i].length + 1
    }
    setCursorPosition(currentLineStart)
  }

  const handleCode = handleEmphasis('`')
  const handleMath = handleEmphasis('$')

  const handleList = () => {
    if (!textareaRef.current) return

    const cursorPos = textareaRef.current.selectionStart
    const contentArray = content.split('\n')
    let currentLineStart = 0

    for (let i = 0; i < contentArray.length; i++) {
      if (currentLineStart + contentArray[i].length >= cursorPos) {
        const line = contentArray[i]
        const newContent = `${content.substring(0, currentLineStart)}- ${content.substring(currentLineStart)}`
        setContent(newContent)
        break
      }

      currentLineStart += contentArray[i].length + 1
    }
    setCursorPosition(currentLineStart)
  }

  const handleOrderedList = () => {
    if (!textareaRef.current) return

    const cursorPos = textareaRef.current.selectionStart
    const contentArray = content.split('\n')
    let currentLineStart = 0

    for (let i = 0; i < contentArray.length; i++) {
      if (currentLineStart + contentArray[i].length >= cursorPos) {
        const line = contentArray[i]
        const newContent = `${content.substring(0, currentLineStart)}1. ${content.substring(currentLineStart)}`
        setContent(newContent)
        break
      }

      currentLineStart += contentArray[i].length + 1
    }
    setCursorPosition(currentLineStart)
  }

  return (
    <div className="h-full flex flex-col ml-5">
      <div className="m-0 flex flex-row gap-x-2 items-center min-w-fit">
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
          onClick={handleBold}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleItalic}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleUnderline}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStrikethrough}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="my-2 h-10" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLink}
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleImage}
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleQuote}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCode}
        >
          <Code2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMath}
        >
          <Sigma className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="my-2 h-10" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleList}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOrderedList}
        >
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
