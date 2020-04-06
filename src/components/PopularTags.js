import React, {useEffect} from 'react'

import useFetch from "../hooks/useFetch"
import Loading from "./Loading"
import ErrorMessage from "./ErrorMessage"
import {Link} from "react-router-dom"

const PopularTags = () => {
  const [{response, isLoading, error}, doFetch] = useFetch('/tags')

  useEffect(() => {
    doFetch()
  }, [doFetch])
  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      {isLoading && <Loading/>}
      {error && <ErrorMessage/>}
      <div className="tag-list">
        {response && response.tags.map(tag=>(
          <Link
            key={tag}
            to={`/tags/${tag}`}
            className="tag-default tag-pill"
          >{tag}</Link>
        ))}
      </div>
    </div>
  )
}

export default PopularTags