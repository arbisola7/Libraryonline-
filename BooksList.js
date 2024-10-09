// BooksList.js
import React from "react";

const BooksList = ({ books, toggleBookmark, inputTerm, bookmarks }) => {
  return (
    <div className="books-list">
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.volumeInfo.title}</h3>
            <p>Authors: {book.volumeInfo.authors?.join(", ") || "Unknown"}</p>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
            <button onClick={() => toggleBookmark(book.id)}>
              {bookmarks.includes(book.id)
                ? "Remove from bookmarks"
                : "Add to bookmarks"}
              {bookmarks.includes(book.id) ? "☆" : "★"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BooksList;
