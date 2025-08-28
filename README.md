# Book Finder App

A comprehensive book search application built for college students to discover books across various categories and search types using the Open Library API.

##  User Persona

**Alex - College Student**
- Needs to search for academic textbooks, research materials, and leisure reading
- Wants multiple ways to discover books (by title, author, subject)
- Values quick access to full-text resources and book metadata
- Prefers clean, distraction-free interfaces for research

##  Features

### Core Functionality
- **Multiple Search Types**: Title, Author, Subject, and comprehensive "All" search
- **Advanced Filtering**: Search within specific categories (Academic, Fiction, Non-Fiction, Professional)
- **Rich Book Information**: Cover images, publication details, page count, edition count
- **Full-Text Indicators**: Visual badges showing books with available full-text access
- **Responsive Design**: Optimized for both desktop and mobile devices

### Student-Focused Features
- **Academic Categories**: Quick access to textbooks and academic resources
- **Subject-Based Search**: Find books by academic subjects like "Computer Science", "Psychology"
- **Publisher Information**: Identify textbook publishers and academic sources
- **Edition Tracking**: See multiple editions available for textbooks

##  Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React's built-in useState and useEffect hooks
- **API**: Open Library Search API (no authentication required)
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Ready for CodeSandbox, StackBlitz, or similar platforms

##  Project Structure

```
src/
├── components/
│   ├── BookCard.tsx          # Individual book display component
│   ├── SearchBar.tsx         # Search input with filters
│   ├── NoResults.tsx         # Empty state with suggestions
│   └── LoadingSpinner.tsx    # Loading state component
├── services/
│   └── bookService.ts        # Open Library API integration
├── pages/
│   └── Index.tsx             # Main application page
└── types/
    └── book.ts               # TypeScript interfaces
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd book-finder-deluxe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) to view the app
