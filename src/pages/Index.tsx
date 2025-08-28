import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { BookCardSkeleton } from "@/components/BookCardSkeleton";
import { NoResults } from "@/components/NoResults";
import { searchBooks, transformBookData, searchSuggestions } from "@/services/googleBooksApi";
import heroBackground from "@/assets/hero-bg.jpg";
import { BookOpen, Search, Sparkles } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const { data: searchResult, isLoading, error, refetch } = useQuery({
    queryKey: ["books", searchQuery],
    queryFn: () => searchBooks(searchQuery),
    enabled: !!searchQuery && hasSearched,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
  };

  const handleTryAgain = () => {
    if (searchQuery) {
      refetch();
    }
  };

  const books = searchResult?.items?.map(transformBookData) || [];
  const showNoResults = hasSearched && !isLoading && books.length === 0;
  const showResults = hasSearched && (books.length > 0 || isLoading);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-accent" />
                <BookOpen className="h-10 w-10" />
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                Discover Your Next
                <br />
                <span className="text-accent">Great Read</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Search through millions of books and find the perfect story waiting for you
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <SearchBar
                onSearch={handleSearch}
                isLoading={isLoading}
                suggestions={searchSuggestions}
                className="mb-6"
              />
              
              {!hasSearched && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  <span className="text-sm text-white/70 mr-2">Try:</span>
                  {searchSuggestions.slice(0, 5).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSearch(suggestion)}
                      className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors backdrop-blur-sm border border-white/20"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            {!isLoading && books.length > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <Search className="h-5 w-5 text-muted-foreground" />
                <h2 className="text-2xl font-serif font-semibold">
                  Search Results for "{searchQuery}"
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({searchResult?.totalItems?.toLocaleString()} found)
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {isLoading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <BookCardSkeleton key={i} />
                  ))
                : books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))
              }
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {showNoResults && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <NoResults
              query={searchQuery}
              onClear={handleClearSearch}
              onTryAgain={handleTryAgain}
            />
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-serif font-semibold mb-2">Something went wrong</h3>
              <p className="text-muted-foreground mb-4">
                We're having trouble searching for books right now. Please try again.
              </p>
              <button
                onClick={handleTryAgain}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
