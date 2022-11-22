import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmark, id, onToggleBookmark, ...rest }) => {
    const getBookmarkClasses = (bookmark) => {
        let bookmarkClasses = "";
        if (bookmark === false) {
            return (bookmarkClasses += "bi bi-bookmark");
        } else {
            return (bookmarkClasses += "bi bi-bookmark-fill");
        }
    };

    return (
        <button
            className="btn btn-light btn-outline-dark"
            onClick={() => onToggleBookmark(id, bookmark)}
        >
            <i className={getBookmarkClasses(bookmark)}></i>
        </button>
    );
};
Bookmark.propTypes = {
    bookmark: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};
export default Bookmark;
