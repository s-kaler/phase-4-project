import { NavLink, Navigate, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    //creating link to user's profile page
    let profileLink =  ''
    if (user) {
        profileLink = `/artist/${user.id}`
    }
    else  {
        profileLink = "/"
    }

    function handleLoginClick(){
        navigate("/login");
    }

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                setUser(null);
                navigate("/");
            }
        });
    }

    
    
    //navigation bar includes links to homepage, 
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {" "}
            <NavLink to="/search" className="nav-link">Search</NavLink>
            {" "}
            {user.id !== '' ? <NavLink to={profileLink} className="nav-link">My Profile</NavLink> : <></>}
            {user.id !== '' ?
                <button onClick={handleLogoutClick} className="logging">Log Out</button> :
                <button onClick={handleLoginClick} className="logging">Log In</button>}
        </nav>
    )
}

export default NavBar;