import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="menu title" onClick={() => navigate("/")}>GH Repository Explorer</div>
    </div>
  )
}

export default Header