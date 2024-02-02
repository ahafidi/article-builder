"use client"

import { Bold, Code2, Heading, Highlighter, Image, Italic, Link, List, ListOrdered, Quote, Sigma, Strikethrough, Subscript, Superscript, Table, Underline } from "lucide-react"

import { Textarea } from "@/components//ui/textarea"
import { ContentContext } from '@/components/Context'
import {
  Button,
} from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React from "react"

export default function Editor() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const { content, setContent } = React.useContext(ContentContext)

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
  const handleUnderline = handleEmphasis('++')
  const handleStrikethrough = handleEmphasis('~~')

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

  const handleHighlighter = handleEmphasis('==')
  const handleSuperscript = handleEmphasis('^')
  const handleSubscript = handleEmphasis('~')

  const handleTable = () => {
    const table = '|   |   |   |\n|---|---|---|\n|   |   |   |\n|   |   |   |\n'
    setContent(c => c + table)
  }

  return (
    <div className="flex flex-col ml-5">
      <div className="flex flex-row items-center m-0 gap-x-2 min-w-fit">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHeading}
        >
          <Heading className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-10 my-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleBold}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleItalic}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleUnderline}
        >
          <Underline className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStrikethrough}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-10 my-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLink}
        >
          <Link className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleImage}
        >
          <Image className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleQuote}
        >
          <Quote className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCode}
        >
          <Code2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMath}
        >
          <Sigma className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-10 my-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleList}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOrderedList}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-10 my-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleHighlighter}
        >
          <Highlighter className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSuperscript}
        >
          <Superscript className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSubscript}
        >
          <Subscript className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-10 my-2" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleTable}
        >
          <Table className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="mb-2 " />
      <div className="mr-2">
        <Textarea
          className="min-h-screen overflow-hidden font-mono border-none rounded-none resize-none focus-visible:ring-0"
          placeholder="Type your text here."
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onInput={e => {
            if (textareaRef.current)
              textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px"
          }}
        />
      </div>
    </div>
  )
}
