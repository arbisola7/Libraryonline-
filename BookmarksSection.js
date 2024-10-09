// BookmarksSection.js
import React from "react";

const BookmarksSection = ({ bookmarks, removeFromBookmarks, books }) => {
  return (
    <div className="bookmarks-section">
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarks.map((bookId) => {
          const book = books.find((b) => b.id === bookId);
          if (!book) return null; // Kontrollo nëse libri ekziston

          return (
            <div key={book.id} className="book-item">
              <h3>{book.volumeInfo.title}</h3>
              <p>Authors: {book.volumeInfo.authors?.join(", ") || "Unknown"}</p>
              <button onClick={() => removeFromBookmarks(book.id)}>
                Remove from bookmarks
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BookmarksSection;
