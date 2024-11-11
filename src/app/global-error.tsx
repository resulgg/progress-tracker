'use client'

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="h-screen w-full flex items-center justify-center">
          <Card className="w-[420px] text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Something went wrong!</CardTitle>
              <CardDescription>
                An unexpected error occurred. Our team has been notified.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{error.message}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => reset()}>Try again</Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  )
} 