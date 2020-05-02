import React, {useContext, useEffect, useState, Fragment} from "react"
import useFetch from "../../hooks/useFetch"
import {Redirect} from "react-router-dom"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import TagList from "../../components/TagList"
import {CurrentUserContext} from "../../context/curentUser/currentUserContext"
import Actions from "./components/Action"
import Comments from "./components/Comments/Comments"

const Article = props => {
  const slug = props.match.params.slug
  const apiUrl = `/articles/${slug}`
  const [
    {
      response: fetchArticleResponse,
      error: fetshArticleError,
      isLoading: fetchArticleIsLoading
    },
    doFetch] = useFetch(apiUrl)
  const [
    {
      response: deleteArticleResponse
    },
    doDeleteArticle] = useFetch(apiUrl)
  const [currentUserState] = useContext(CurrentUserContext)
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false)

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false
    }
    return fetchArticleResponse.article.author.username === currentUserState.currentUser.username
  }

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete'
    })
  }



  useEffect(() => {
    doFetch()
  }, [doFetch])

  useEffect(() => {
    if (!deleteArticleResponse) {
      return
    }
    setIsSuccessfullDelete(true)
  }, [deleteArticleResponse])

  if (isSuccessfullDelete) {
    return <Redirect to={'/'}/>
  }

  return (
    <div className='article-page'>
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className='container'>
            <h1>{fetchArticleResponse.article.title}</h1>
            <Actions
              author={isAuthor()}
              article={fetchArticleResponse.article}
              deleteArticle={deleteArticle}
              doFetch={doFetch}
            />
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading/>}
        {fetshArticleError !== null && fetshArticleError !== false && <ErrorMessage/>}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList}/>
            </div>
          </div>
        )}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <Fragment>
            <hr/>
            <div className="article-actions">
              <Actions
                author={isAuthor()}
                article={fetchArticleResponse.article}
                deleteArticle={deleteArticle}
                doFetch={doFetch}
              />
            </div>
          </Fragment>
        )}
        {currentUserState.isLoggedIn && !fetchArticleIsLoading && fetchArticleResponse && (
          <Comments
            slug={fetchArticleResponse.article.slug}
          />
        )}
      </div>
    </div>
  )
}

export default Article