'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function DashboardItemError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto p-6 flex items-center justify-center">
      <Card className="w-[420px] text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle>Content Error</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()}>Try again</Button>
        </CardFooter>
      </Card>
    </div>
  )
} 