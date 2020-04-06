import React from 'react'
import {range} from '../utils/range'
import {Link} from "react-router-dom"

const PaginationItem = ({page, currentPage, url}) => {
	const classesLi = `page-item${currentPage === page ? ' active' : ''}`
	return (
		<li
			className={classesLi}
		>
			<Link
				to={`${url}?page=${page}`}
				className='page-link'>
				{page}
			</Link>
		</li>
	)
}

const Pagination = ({total, url, limit, currentPage}) => {
	const pagesCount = Math.ceil(total / limit)
	const pages = range(1, pagesCount)

	return (
		<ul className='pagination'>
			{
				pages.map(page => (
					<PaginationItem
						key={page}
						page={page}
						currentPage={currentPage}
						url={url}
					/>
				))
			}
		</ul>
	)
}

export default Pagination