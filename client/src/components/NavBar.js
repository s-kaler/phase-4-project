import { NavLink } from "react-router-dom";

function NavBar({ currentUser, isLoggedIn }) {
    //creating link to user's profile page
    const profileLink = `/profile/${currentUser.userId}`;
    //navigation bar includes links to homepage, logged in user's profile, and page to write a new blog post
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {" "}
            <NavLink to={profileLink} className="nav-link">{currentUser.username}'s Profile</NavLink>
            {isLoggedIn ? <button onClick={logout} className="logout">Logout</button> : <></>}
        </nav>
    )
}

export default NavBar;