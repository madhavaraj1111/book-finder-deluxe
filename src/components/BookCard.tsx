import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  imageLinks?: {
    thumbnail?: string;
  };
  categories?: string[];
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const coverImage = book.imageLinks?.thumbnail || "/placeholder.svg";
  const publishYear = book.publishedDate ? new Date(book.publishedDate).getFullYear() : "N/A";
  const truncatedDescription = book.description
    ? book.description.length > 150
      ? book.description.substring(0, 150) + "..."
      : book.description
    : "No description available.";

  return (
    <Card className="book-card card-gradient h-full overflow-hidden group cursor-pointer">
      <CardContent className="p-0">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={coverImage}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-serif font-semibold text-lg leading-tight line-clamp-2 text-card-foreground">
              {book.title}
            </h3>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">
                {book.authors?.join(", ") || "Unknown Author"}
              </p>
              <p className="text-xs text-muted-foreground">
                Published: {publishYear}
              </p>
            </div>
          </div>

          {book.categories && book.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {book.categories.slice(0, 2).map((category, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {truncatedDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}