"use client"

import { Github, Moon, Sun } from "lucide-react"
import React from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Header() {
  const [darkMode, setDarkMode] = React.useState(false)

  React.useEffect(() => {
    if (darkMode)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }, [darkMode])

  return (
    <div className="mx-5">
      <div className="flex justify-between items-center my-2 text-sm font-medium">
        <h1 className="">
          Article Builder
          <span className="text-muted-foreground">
            &nbsp;&mdash; by&nbsp;
            <a
              href="https://twitter.com/ahafidi_"
              target="_blank"
              className="hover:text-gray-800 dark:hover:text-gray-200"
            >
              @ahafidi_
            </a>
          </span>
        </h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open('https://github.com/ahafidi/article-builder', '_blank')!.focus()}
          >
            <Github />
          </Button>
          <Separator orientation="vertical" className="h-10" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(d => !d)}
          >
            {darkMode ? <Moon /> : <Sun />}
          </Button>

        </div>
      </div>
      <Separator />
    </div >
  )
}
