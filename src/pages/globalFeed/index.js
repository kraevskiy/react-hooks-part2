import React, {Fragment, useEffect} from "react"

import useFetch from "../../hooks/useFetch"
import Feed from "../../components/Feed"
import Pagination from "../../components/Pagination"
import {getPaginator, limit} from "../../utils/parseUrl"
import {stringify} from "query-string"

const GlobalFeed = ({location, match}) => {
	const {offset, currentPage} = getPaginator(location.search)
	const stringifiedParams = stringify({
		limit, offset
	})
	const apiUrl = `/articles?${stringifiedParams}`
	const [{response, isLoading, error}, doFetch] = useFetch(apiUrl)
	const url = match.url

	useEffect(()=>{
		doFetch()
	}, [doFetch, currentPage])
	return (
		<div className='home-page'>
			<div className='banner'>
				<div className="container">
					<h1>Medium Clone</h1>
					<p>A place to share knowledge</p>
				</div>
			</div>
			<div className="container page">
				<div className="row">
					<div className="col-md-9">
						{isLoading && <div>Loading</div>}
						{error && <div>Error</div>}
						{!isLoading && response && (
							<Fragment>
								<Feed articles={response.articles} />
								<Pagination
									total={response.articlesCount}
									limit={limit}
									url={url}
									currentPage={currentPage}/>
							</Fragment>
						)}
					</div>
					<div className="col-md-3">
						<div className="sidebar"><p>Popular Tags</p>
							<div className="tag-list">
								<a href='/' className="tag-default tag-pill"> test </a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GlobalFeed