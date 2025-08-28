const OPEN_LIBRARY_API = "https://openlibrary.org/search.json";
const COVER_API = "https://covers.openlibrary.org/b";

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  subject?: string[];
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
  edition_count?: number;
  has_fulltext?: boolean;
  public_scan_b?: boolean;
}

export interface OpenLibrarySearchResult {
  docs: OpenLibraryBook[];
  numFound: number;
  start: number;
  numFoundExact: boolean;
}

export interface TransformedBook {
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

export async function searchBooks(
  query: string, 
  maxResults: number = 20,
  searchType: 'title' | 'author' | 'subject' | 'all' = 'all'
): Promise<OpenLibrarySearchResult> {
  try {
    const url = new URL(OPEN_LIBRARY_API);
    
    // Build search query based on type
    let searchQuery = query;
    if (searchType === 'title') {
      searchQuery = `title:${query}`;
    } else if (searchType === 'author') {
      searchQuery = `author:${query}`;
    } else if (searchType === 'subject') {
      searchQuery = `subject:${query}`;
    }
    
    url.searchParams.set("q", searchQuery);
    url.searchParams.set("limit", maxResults.toString());
    url.searchParams.set("fields", "key,title,author_name,first_publish_year,isbn,cover_i,subject,publisher,language,number_of_pages_median,edition_count,has_fulltext,public_scan_b");

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Open Library API error: ${response.status}`);
    }

    const data: OpenLibrarySearchResult = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
}

export async function searchBooksByTitle(title: string, maxResults: number = 20): Promise<OpenLibrarySearchResult> {
  return searchBooks(title, maxResults, 'title');
}

export async function searchBooksByAuthor(author: string, maxResults: number = 20): Promise<OpenLibrarySearchResult> {
  return searchBooks(author, maxResults, 'author');
}

export async function searchBooksBySubject(subject: string, maxResults: number = 20): Promise<OpenLibrarySearchResult> {
  return searchBooks(subject, maxResults, 'subject');
}

export function getCoverImageUrl(coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M'): string | undefined {
  if (!coverId) return undefined;
  return `${COVER_API}/id/${coverId}-${size}.jpg`;
}

export function transformBookData(book: OpenLibraryBook): TransformedBook {
  const coverImage = book.cover_i ? getCoverImageUrl(book.cover_i, 'M') : undefined;
  const smallCoverImage = book.cover_i ? getCoverImageUrl(book.cover_i, 'S') : undefined;
  
  return {
    id: book.key,
    title: book.title || "Unknown Title",
    authors: book.author_name || [],
    publishedDate: book.first_publish_year ? book.first_publish_year.toString() : "",
    description: "", // Open Library doesn't provide descriptions in search results
    imageLinks: coverImage ? {
      thumbnail: coverImage,
      smallThumbnail: smallCoverImage,
    } : undefined,
    categories: book.subject?.slice(0, 5) || [], // Limit to first 5 subjects
    pageCount: book.number_of_pages_median,
    language: book.language?.[0] || "en",
    publisher: book.publisher?.slice(0, 3) || [], // Limit to first 3 publishers
    isbn: book.isbn?.slice(0, 2) || [], // Limit to first 2 ISBNs
    editionCount: book.edition_count,
    hasFulltext: book.has_fulltext || false,
  };
}

// Search suggestions for Alex's needs as a college student
export const searchSuggestions = [
  // Academic subjects
  "Computer Science",
  "Psychology", 
  "History",
  "Mathematics",
  "Biology",
  "Philosophy",
  "Economics",
  "Literature",
  
  // Popular genres for students
  "Science Fiction",
  "Self Help",
  "Biography",
  "Study Skills",
  "Programming",
  "Research Methods",
  
  // Classic authors students often read
  "Shakespeare",
  "Jane Austen",
  "George Orwell",
  "Ernest Hemingway",
  "F. Scott Fitzgerald",
];

// Advanced search suggestions by category
export const searchCategories = {
  academic: [
    "Textbooks",
    "Research Methods", 
    "Study Guides",
    "Academic Writing",
    "Critical Thinking"
  ],
  fiction: [
    "Classic Literature",
    "Contemporary Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery"
  ],
  nonFiction: [
    "Biography",
    "History",
    "Self Help",
    "Psychology",
    "Philosophy"
  ],
  professional: [
    "Career Development",
    "Leadership",
    "Business",
    "Technology",
    "Innovation"
  ]
};