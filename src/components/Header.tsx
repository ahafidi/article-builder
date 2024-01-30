import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <div className="mx-5">
      <div className="space-y-1 my-5">
        <h1 className="text-sm font-medium leading-none">
          Article Builder <span className="text-muted-foreground">&mdash; by <a href="https://twitter.com/ahafidi_" target="_blank" className="hover:text-gray-800">@ahafidi_</a></span>
        </h1>
      </div>
      <Separator />
    </div>
  )
}
