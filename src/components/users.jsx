import React, { useState } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import User from './user'

const Users = ({users, id, onDelete, onToggleBookmark, ...rest}) => {
  const count = users.length
  const pageSize = 4

const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    console.log('pageIndex: ', pageIndex)
    setCurrentPage(pageIndex)
  }

const userCrop = paginate(users, currentPage, pageSize)

return (
          <>
          {count !== 0 && (
          <table className ="table table-bordered">
          <thead className ="table-dark">
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
            {  userCrop.map((user) => { return (
          <User key={user._id} {...rest} {...user}
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
            )}
            )}
          </tbody>
      </table>
  )} 
        <Pagination 
        itemsCount={count} 
        pageSize={pageSize} 
        currentPage={currentPage}
        onPageChange={handlePageChange} />
        </>
  )
} 
export default Users 