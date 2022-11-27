import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";

const Users = ({ users, id, onDelete, onToggleBookmark, ...rest }) => {
    const count = users.length;
    const [professions, setProfessions] = useState();
    const pageSize = 4;

    const [selectedProf, setselectedProf] = useState();

    const handleProfessionSelect = (item) => {
        console.log(item);
        setselectedProf(item);
    };

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    });

    const handlePageChange = (pageIndex) => {
        // console.log("pageIndex: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setselectedProf();
    };
    return (
        <>
            {professions && (
                <>
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
                </>
            )}
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
                                    completedMeetings={user.completedMeetings}
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};
export default Users;
