import React from 'react'

import useFetch from "../hooks/useFetch"

const FollowingBtn = ({username, following}) => {
  const apiUrl = `/profiles/${username}/follow`
  const [{response}, doFetch] = useFetch(apiUrl)
  const textBtn = response
    ? response.profile.following
      ? `Unfollowing ${username}`
      : `Following ${username}`
    : following
      ? `Unfollowing ${username}`
      : `Following ${username}`
  const isFollowingResponse = response ? response.profile.following : following

  const cls = isFollowingResponse ? 'btn btn-sm action-btn btn-outline-secondary' : 'btn btn-sm action-btn btn-secondary'

  const handleFollowing = event => {
    event.preventDefault()
    doFetch({
      method: isFollowingResponse ? 'delete' : 'post'
    })
  }

  return (
    <button
      className={cls}
      onClick={handleFollowing}
    >
      <i className="ion-plus-round"/> &nbsp;
      {textBtn}
    </button>
  )
}

export default FollowingBtn