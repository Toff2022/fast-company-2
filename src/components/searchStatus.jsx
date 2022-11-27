import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (length) => {
        if (length === 0) {
            return "Никто не встретится с тобой сегодня";
        } else if (length === 2 || length === 3 || length === 4) {
            return `${length} человека встретятся с тобой сегодня`;
        } else if (length === 1) {
            return `${length} человек встретится с тобой сегодня`;
        } else if (length > 4) {
            return `${length} человек встретятся с тобой сегодня`;
        }
    };

    return (
        <h2>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {renderPhrase(length)}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
