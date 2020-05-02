import React, {useEffect, useState} from 'react'
import CommentsForm from "./commentsForm"
import CommentsList from "./commentsList"
import useFetch from "../../../../hooks/useFetch"
import Loading from "../../../../components/Loading"
import ErrorMessage from "../../../../components/ErrorMessage"

const Comments = ({slug}) => {
  const [body, setBody] = useState('')
  const apiUrl = `/articles/${slug}/comments`

  const[, doFetchSubmit] = useFetch(apiUrl)
  const[{response, error, isLoading}, doFetch] = useFetch(apiUrl)

  const submitHandler = event => {
    event.preventDefault()
    doFetchSubmit({
      method: 'post',
      data: {comment: {body}}
    })
    setBody('')
  }

  useEffect(()=>{
    doFetch()
  }, [doFetch, doFetchSubmit])

  if(isLoading) return <div className="text-center"><Loading /></div>
  if(error) return <ErrorMessage />

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <CommentsForm
          onSubmit={submitHandler}
          setBody={setBody}
          body={body}
        />
        <CommentsList
          comments={response}
        />

      </div>
    </div>
  )
}

export default Comments