const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export interface BookVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    categories?: string[];
    pageCount?: number;
    language?: string;
  };
}

export interface SearchResult {
  items?: BookVolume[];
  totalItems: number;
}

export async function searchBooks(query: string, maxResults: number = 20): Promise<SearchResult> {
  try {
    const url = new URL(GOOGLE_BOOKS_API);
    url.searchParams.set("q", query);
    url.searchParams.set("maxResults", maxResults.toString());
    url.searchParams.set("printType", "books");
    url.searchParams.set("orderBy", "relevance");

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`);
    }

    const data: SearchResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
}

export function transformBookData(volume: BookVolume) {
  const { volumeInfo } = volume;
  
  return {
    id: volume.id,
    title: volumeInfo.title || "Unknown Title",
    authors: volumeInfo.authors || [],
    publishedDate: volumeInfo.publishedDate || "",
    description: volumeInfo.description || "",
    imageLinks: volumeInfo.imageLinks,
    categories: volumeInfo.categories || [],
    pageCount: volumeInfo.pageCount,
    language: volumeInfo.language || "en",
  };
}

// Popular search suggestions
export const searchSuggestions = [
  "Harry Potter",
  "Stephen King",
  "Science Fiction",
  "Biography",
  "Self Help",
  "Mystery",
  "Romance",
  "Fantasy",
  "Programming",
  "History",
  "Psychology",
  "Business",
  "Cooking",
  "Travel",
  "Philosophy"
];