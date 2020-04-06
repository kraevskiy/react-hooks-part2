import React from 'react'
import {NavLink} from "react-router-dom";

const FeedToggler = ({tagName}) => {

  return (
    <div className='feed-toggle'>
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink to='/feed' className='nav-link'>
            Your feed
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/' className='nav-link' exact>
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} className='nav-link'>
              <i className='ion-pound'/> &nbsp;
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FeedToggler