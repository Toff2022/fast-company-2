import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({
    id,
    name,
    qualities,
    professionName,
    completedMeetings,
    rate,
    bookmark,
    onToggleBookmark,
    onDelete
}) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => {
                        return (
                            <Qualitie
                                key={quality._id}
                                color={quality.color}
                                name={quality.name}
                                id={quality._id}
                            />
                        );
                    })}
                </td>
                <td>{professionName}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
                <td>
                    <Bookmark
                        bookmark={bookmark}
                        id={id}
                        onToggleBookmark={onToggleBookmark}
                    />
                </td>

                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

export default User;
