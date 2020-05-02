import React, {useContext} from 'react'
import {CurrentUserContext} from "../../../../../context/curentUser/currentUserContext"

const CommentsForm = ({onSubmit, body, setBody}) => {
  const [currentUserState] = useContext(CurrentUserContext)



  return (
    <form className="card comment-form" onSubmit={onSubmit}>
      <fieldset>
        <div className="card-block">
          <textarea
          className="form-control"
          rows="3"
          placeholder="Write a comment..."
          value={body}
          onChange={e=>{setBody(e.target.value)}}/>
        </div>
        <div className="card-footer">
          <img
            className="comment-author-img"
            src={currentUserState.currentUser.image}
            alt=""/>
          <button
            className="btn btn-sm btn-primary"
            type="submit"
            disabled={body.length < 3}
          > Post Comment</button>
        </div>
      </fieldset>
    </form>
  )
}

export default CommentsForm