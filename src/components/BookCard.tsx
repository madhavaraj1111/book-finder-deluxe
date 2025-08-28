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
    smallThumbnail?: string;
  };
  categories?: string[];
  pageCount?: number;
  language?: string;
  publisher?: string[];
  isbn?: string[];
  editionCount?: number;
  hasFulltext?: boolean;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const coverImage = book.imageLinks?.thumbnail || "/placeholder.svg";
  const publishYear = book.publishedDate || "N/A";
  const truncatedDescription = book.description
    ? book.description.length > 150
      ? book.description.substring(0, 150) + "..."
      : book.description
    : "Click to explore this book on Open Library";
  
  const handleCardClick = () => {
    // Open Library book URL format
    const bookKey = book.id.startsWith('/works/') ? book.id : `/works/${book.id}`;
    window.open(`https://openlibrary.org${bookKey}`, '_blank');
  };

  return (
    <Card 
      className="book-card card-gradient h-full overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={coverImage}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {book.hasFulltext && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="text-xs bg-green-600 text-white">
                Full Text
              </Badge>
            </div>
          )}
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
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Published: {publishYear}</span>
                {book.editionCount && book.editionCount > 1 && (
                  <span>{book.editionCount} editions</span>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced metadata for students */}
          <div className="space-y-2">
            {book.pageCount && (
              <p className="text-xs text-muted-foreground">
                {book.pageCount} pages
              </p>
            )}
            
            {book.categories && book.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {book.categories.slice(0, 2).map((category, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {book.categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{book.categories.length - 2} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {truncatedDescription}
          </p>
          
          {/* Publisher info for academic books */}
          {book.publisher && book.publisher.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {book.publisher[0]}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}