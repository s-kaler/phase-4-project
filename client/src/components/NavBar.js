import { NavLink, Navigate, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    //creating link to user's profile page
    //const profileLink = `/profile/${currentUser.userId}`;
    const profileLink = `/artist/1`;

    function handleLoginClick(){
        navigate("/login");
    }

    function handleLogoutClick() {
        /*
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
            }
        });
        */
        setUser(null);
    }

    
    
    //navigation bar includes links to homepage, 
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {" "}
            <NavLink to="/search" className="nav-link">Search</NavLink>
            {user ? <NavLink to={profileLink} className="nav-link">My Profile</NavLink> : <></>}
            {user ?
                <button onClick={handleLogoutClick} className="logging">Log Out</button> :
                <button onClick={handleLoginClick} className="logging">Log In</button>}
        </nav>
    )
}

export default NavBar;