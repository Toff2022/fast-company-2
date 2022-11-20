import React from "react"

const Bookmark = ({ bookmark, id, onToggleBookmark, ...rest }) => {

    const getBookmarkClasses = (bookmark) => {
        let bookmarkClasses = ''
        if(bookmark === false) {
          return bookmarkClasses +=  "bi bi-bookmark"
        } else {
          return bookmarkClasses += "bi bi-bookmark-fill"
        } 
      }
    
return (

    <button className='btn btn-light btn-outline-dark'
        onClick={()=> onToggleBookmark(id, bookmark)}>
       <i className= { getBookmarkClasses(bookmark)}>
       </i>
    </button>
  )
}

export default Bookmark
