import React from 'react'
import {Link} from "react-router-dom"

const generateDate = date => {
  const dateOld = new Date(date)
  return dateOld.toDateString()
}

const CommentsList = ({comments}) => {
  console.log(comments);
  return (
    <div>
      {comments && comments.comments.map(comment=> (
        <div className="card" key={comment.id}>
          <div className="card-block">
            <p className="card-text">{comment.body}</p>
          </div>
          <div className="card-footer">
            <Link
              className="comment-author"
              to={`/profile/${comment.author.username}`}>
              <img
                className="comment-author-img"
                src={comment.author.image} alt=""/>
            </Link> &nbsp;
            <Link
              className="comment-author"
              to={`/profile/${comment.author.username}`}
            >{comment.author.username}</Link>
            <span
              className="date-posted"
            > {generateDate(comment.createdAt)} </span>
            <button
              style={{padding: 0}}
              className="btn mod-options"
            ><i className="ion-trash-a"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommentsList