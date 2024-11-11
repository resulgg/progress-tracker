import { LoaderCircle } from "lucide-react"

export default function DynamicPageLoading() {
  return (
    <div className="container mx-auto pt-48 flex justify-center">
      <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
} 