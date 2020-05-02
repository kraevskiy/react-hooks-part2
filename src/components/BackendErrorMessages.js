import React from 'react'

const BackendErrorMessages = ({backendErrors}) => {
	const errorMessages = Object.keys(backendErrors).map(name => {
		const message = backendErrors[name].join(' ')
		return `${name} ${message}`
	})
	return (
		<React.Fragment>
			{
				errorMessages.map((item, index) => (
					<div key={index} className="alert alert-danger" role="alert">
						{item}
					</div>
				))
			}
		</React.Fragment>
	)

}

export default BackendErrorMessages