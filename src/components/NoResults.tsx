import { Button } from "@/components/ui/button";
import { RefreshCw, BookOpen } from "lucide-react";
import noResultsImage from "@/assets/no-results.jpg";

interface NoResultsProps {
  query: string;
  onClear: () => void;
  onTryAgain: () => void;
}

export function NoResults({ query, onClear, onTryAgain }: NoResultsProps) {
  const suggestions = [
    "Try different keywords or synonyms",
    "Check your spelling",
    "Use broader search terms (e.g., 'physics' instead of 'quantum mechanics')",
    "Search by author name in the filter",
    "Try searching for a subject or category",
    "Look for textbook publishers like 'Pearson' or 'McGraw Hill'",
    "Search for classic titles if studying literature"
  ];

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden shadow-card">
          <img
            src={noResultsImage}
            alt="No results found"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-semibold text-foreground">
            No Books Found
          </h3>
          <p className="text-muted-foreground">
            Sorry, we couldn't find any books matching{" "}
            <span className="font-medium text-foreground">"{query}"</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Don't worry! Open Library has millions of books. Let's try a different search.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-left">
          <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Try these suggestions:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 justify-center pt-4">
          <Button variant="outline" onClick={onClear} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Clear Search
          </Button>
          <Button onClick={onTryAgain} className="gap-2">
            <BookOpen className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}