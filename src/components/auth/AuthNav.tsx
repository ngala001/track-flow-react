import { Link, useNavigate } from "react-router-dom"

type AuthNavTab = {
  title: string
  href: string
}

const AuthNav = ({title, href}: AuthNavTab) => {
    const navigate = useNavigate()
  return (
    <nav className="flex justify-between py-6 px-3 container mx-auto">
        <Link 
          to={"/"}
          className="text-3xl text-red-500 font-bold"
        >
            FastTrack.
        </Link>
        <div>
           {
            title && 
           <button onClick={() => navigate(`/auth/${href}`)} className="btn">{title}</button>
           }
        </div>
    </nav>
  )
}

export default AuthNav