import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  suggestions?: string[];
  className?: string;
}

export function SearchBar({ onSearch, isLoading = false, suggestions = [], className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()) && suggestion !== query
  ).slice(0, 5);

  const handleSearch = useCallback((searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
      setQuery(trimmedQuery);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
      handleSearch(filteredSuggestions[selectedIndex]);
    } else {
      handleSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredSuggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)} ref={suggestionsRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for books, authors, or topics..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            className="search-input pl-12 pr-20 h-14 text-lg rounded-full border-2 focus:border-primary"
            disabled={isLoading}
          />
          
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 rounded-full"
          >
            {isLoading ? "..." : "Search"}
          </Button>
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevated z-50 overflow-hidden">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              className={cn(
                "w-full text-left px-4 py-3 hover:bg-muted transition-colors text-sm",
                index === selectedIndex && "bg-muted"
              )}
              onClick={() => handleSearch(suggestion)}
            >
              <Search className="inline-block mr-3 h-4 w-4 text-muted-foreground" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}