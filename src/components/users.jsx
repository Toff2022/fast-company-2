import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users, onDelete, onToggleBookmark, ...rest }) => {
    const [professions, setProfessions] = useState();
    const pageSize = 2;

    const [selectedProf, setselectedProf] = useState();

    const handleProfessionSelect = (item) => {
        console.log(item);
        setselectedProf(item);
    };

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        // console.log("pageIndex: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;

    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setselectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        valueProperty="_id"
                        contentProperty="name"
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                {<SearchStatus length={count} />}

                {count !== 0 && (
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => {
                                return (
                                    <User
                                        key={user._id}
                                        {...rest}
                                        {...user}
                                        id={user._id}
                                        name={user.name}
                                        qualities={user.qualities}
                                        professionName={user.profession.name}
                                        completedMeetings={
                                            user.completedMeetings
                                        }
                                        rate={user.rate}
                                        bookmark={user.bookmark}
                                        onToggleBookmark={onToggleBookmark}
                                        onDelete={onDelete}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center"></div>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};
export default Users;
