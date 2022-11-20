import React, { useState } from 'react'
import api from '../api'
import 'bootstrap'
import SearchStatus from './searchStatus'
import Users from './users'

function App ()  {

  const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (_id) => {
      setUsers(prevState => prevState.filter(user => user._id !== _id))
    }
    
   const handleToggleBookmark = (_id) => {
    const newUsers = users.map((user)=> {
       if(user._id === _id && user.bookmark === false) {
          user.bookmark = true
          return user
        } else  if(user._id === _id && user.bookmark === true) {
           user.bookmark = false
           return user
        } else {
          return user
        }
     })
     setUsers(newUsers)
   }
  
    return (
      <div>
        
            { <SearchStatus length={users.length} /> }
            <Users  onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                    users={users}
          />
      </div>
  )
} 

export default App