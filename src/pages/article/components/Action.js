import React from 'react'
import {Link} from "react-router-dom"
import FollowingBtn from "../../../components/FollowingBtn"
import AddToFavorites from "../../../components/AddToFavorites"

const Actions = ({author, article, deleteArticle, doFetch}) => {

  return (
    <div className="article-meta">
      <Link to={`/profiles/${article.author.username}`}>
        <img src={article.author.image}
             alt={article.author.username}/>
      </Link>
      <div className="info">
        <Link to={`/profiles/${article.author.username}`}>
          {article.author.username}
        </Link>
        <span className="date">
        {article.createdAt}
      </span>
      </div>
      {!author && (
        <span>
        <FollowingBtn
          username={article.author.username}
          following={article.author.following}
        />
      </span>
      )}
      <span>
      <AddToFavorites
        isFavorited={article.favorited}
        favoritesCount={article.favoritesCount}
        articleSlug={article.slug}
        doFetchProps={doFetch}
      />
    </span>
      {author && (
        <span>
        <Link
          className='btn btn-outline-secondary btn-sm'
          to={`/articles/${article.slug}/edit`}>
          <i className="ion-edit"/>
          Edit article
        </Link>
        <button
          className='btn btn-sm btn-outline-danger'
          onClick={deleteArticle}
        >
          <i className="ion-trash-a"/>
          Delete article
        </button>
      </span>
      )}
    </div>
  )
}

export default Actions