"use client"

import { Loader2 } from "lucide-react"

export default function Loader() {
  return (<div className="flex justify-center p-5">
    <Loader2 className="animate-spin" />
  </div>)
}
