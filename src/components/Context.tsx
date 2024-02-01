"use client"

import React from "react"

type ContentState = {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export const ContentContext = React.createContext<ContentState>({
  content: '',
  setContent: () => { }
})
