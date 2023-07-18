import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header flex items-center justify-center w-[300px] bg-gray-800 min-h-[44px] py-2 px-4 mx-auto rounded-bl-2xl rounded-br-2xl">
      <div className="menu title font-semibold text-[20px]" onClick={() => navigate("/")}>GH Repository Explorer</div>
    </div>
  )
}

export default Header