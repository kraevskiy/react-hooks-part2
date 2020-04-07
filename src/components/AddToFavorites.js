import React from 'react'

import useFetch from "../hooks/useFetch"

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
  const apiUrl = `/articles/${articleSlug}/favorite`
  const [{response}, doFetch] = useFetch(apiUrl)
  const favoritesCountWithResponse = response ? response.article.favoritesCount : favoritesCount
  const cls = response
    ? response.article.favorited
      ? 'btn btn-sm btn-primary'
      : 'btn btn-sm btn-outline-primary'
    : isFavorited
        ? 'btn btn-sm btn-primary'
        : 'btn btn-sm btn-outline-primary'
  const isFavoritedIsResponse = response ? response.article.favorited : isFavorited
  const handleLike = event => {
    event.preventDefault()
    doFetch({
      method: isFavoritedIsResponse ? 'delete' : 'post'
    })
  }



  return (
    <button className={cls} onClick={handleLike}>
      <i className="ion-heart"/>
      <span>&nbsp;{favoritesCountWithResponse}</span>
    </button>
  )
}

export default AddToFavorites