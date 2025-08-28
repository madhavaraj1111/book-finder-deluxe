import { Card, CardContent } from "@/components/ui/card";

export function BookCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-[3/4] loading-pulse"></div>
        
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="h-6 loading-pulse rounded"></div>
            <div className="h-4 w-3/4 loading-pulse rounded"></div>
            <div className="h-3 w-1/2 loading-pulse rounded"></div>
          </div>

          <div className="flex gap-2">
            <div className="h-5 w-16 loading-pulse rounded-full"></div>
            <div className="h-5 w-20 loading-pulse rounded-full"></div>
          </div>

          <div className="space-y-2">
            <div className="h-3 loading-pulse rounded"></div>
            <div className="h-3 loading-pulse rounded"></div>
            <div className="h-3 w-4/5 loading-pulse rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}