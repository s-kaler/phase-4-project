import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar"

function NavBar({ logout, login, currentUser, isLoggedIn=false }) {
    //creating link to user's profile page
    //const profileLink = `/profile/${currentUser.userId}`;
    const profileLink = `/profile/1`;
    
    //navigation bar includes links to homepage, logged in user's profile, and page to write a new blog post
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {" "}
            <SearchBar />
            {isLoggedIn ? <NavLink to={profileLink} className="nav-link">My Profile</NavLink> : <></>}
            {isLoggedIn ?
                <button onClick={login} className="logging">Log Out</button> :
                <button onClick={logout} className="logging">Log In</button>}
        </nav>
    )
}

export default NavBar;