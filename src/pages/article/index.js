import React, {useContext, useEffect, useState} from "react"
import useFetch from "../../hooks/useFetch"
import {Link, Redirect} from "react-router-dom"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import TagList from "../../components/TagList"
import {CurrentUserContext} from "../../context/curentUser/currentUserContext"

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

	useEffect(()=>{
		if(!deleteArticleResponse){
			return
		}
		setIsSuccessfullDelete(true)
	}, [deleteArticleResponse])

	if(isSuccessfullDelete){
		return <Redirect to={'/'}/>
	}

	return (
    <div className='article-page'>
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className='container'>
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                <img src={fetchArticleResponse.article.author.image} alt={fetchArticleResponse.article.author.username}/>
              </Link>
              <div className="info">
                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
									{fetchArticleResponse.article.createdAt}
								</span>
              </div>
              {isAuthor() && (
                <span>
									<Link
                    className='btn btn-outline-secondary btn-sm'
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}>
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
      </div>
    </div>
  )
}

export default Article