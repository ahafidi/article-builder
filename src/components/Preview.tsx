"use client"

import { ContentContext } from "@/components/Context"
import React from "react"

export default function Preview() {
  const { content } = React.useContext(ContentContext)

  return (
    <div className="flex items-center justify-center p-5">
      <span className="font-semibold">{content}</span>
    </div>
  )
}
