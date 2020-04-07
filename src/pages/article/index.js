import React, {useEffect} from "react"
import useFetch from "../../hooks/useFetch"
import {Link} from "react-router-dom"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import TagList from "../../components/TagList"

const Article = props=> {
	const slug = props.match.params.slug
	const apiUrl = `/articles/${slug}`
	const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)
	console.log(response, error, isLoading);

	useEffect(()=>{
		doFetch()
	}, [doFetch])

	return (
		<div className='article-page'>
			<div className="banner">
				{!isLoading && response && (
					<div className='container'>
						<h1>{response.article.title}</h1>
						<div className="article-meta">
							<Link to={`/profiles/${response.article.author.username}`}>
								<img src={response.article.author.image} alt={response.article.author.username}/>
							</Link>
							<div className="info">
								<Link to={`/profiles/${response.article.author.username}`}>
									{response.article.author.username}
								</Link>
								<span className="date">
									{response.article.createdAt}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="container page">
				{isLoading && <Loading/>}
				{error !== null && error !== false && <ErrorMessage/>}
				{!isLoading && response && (
					<div className="row article-content">
						<div className="col-xs-12">
							<div>
								<p>{response.article.body}</p>
							</div>
							<TagList tags={response.article.tagList}/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Article