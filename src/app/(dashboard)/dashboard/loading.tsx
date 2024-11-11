import { LoaderCircle } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="container mx-auto flex justify-center pt-48">
      <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
