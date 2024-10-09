// App.js
import React, { useState, useEffect } from "react";
import BooksList from "./BooksList";
import BookmarksSection from "./BookmarksSection";
import "./styles.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [inputTerm, setInputTerm] = useState("");
  const [activeTab, setActiveTab] = useState("books");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=search+terms"
        );
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const toggleBookmark = (bookId) => {
    const isBookmarked = bookmarks.includes(bookId);
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter((id) => id !== bookId)
      : [...bookmarks, bookId];
    setBookmarks(updatedBookmarks);
  };

  const removeFromBookmarks = (bookId) => {
    const updatedBookmarks = bookmarks.filter((id) => id !== bookId);
    setBookmarks(updatedBookmarks);
  };

  const handleSearch = (term) => {
    setInputTerm(term);
  };

  return (
    <div className="app">
      <div className="tabs">
        <button
          className={activeTab === "books" ? "active" : ""}
          onClick={() => setActiveTab("books")}
        >
          Books
        </button>
        <button
          className={activeTab === "bookmarks" ? "active" : ""}
          onClick={() => setActiveTab("bookmarks")}
        >
          Bookmarks
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search books..."
          value={inputTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Kushtet për shfaqjen e pjesëve të UI */}
      {activeTab === "books" && books.length > 0 && (
        <BooksList
          books={books}
          toggleBookmark={toggleBookmark}
          inputTerm={inputTerm}
          bookmarks={bookmarks}
        />
      )}

      {activeTab === "books" && books.length === 0 && <p>No books found.</p>}

      {activeTab === "bookmarks" && bookmarks.length > 0 && (
        <BookmarksSection
          bookmarks={bookmarks}
          removeFromBookmarks={removeFromBookmarks}
          books={books}
        />
      )}

      {activeTab === "bookmarks" && bookmarks.length === 0 && (
        <p>No bookmarks yet.</p>
      )}
    </div>
  );
};

export default App;
