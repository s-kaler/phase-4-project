import React, { useEffect, useState } from "react";
import { Outlet, Switch, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    /*
    const [currentUser, setCurrentUser] = useState({
        username: '',
        userId: 1,
    });
    */
    //const navigate = useNavigate();

    const [user, setUser] = useState(null);

    /*
    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            }
            else setUser(null)
        });
    }, []);
    */


    console.log(isLoggedIn)

    return <div className="App">
        <NavBar user={user} setUser={setUser} />
        <main>
            <Outlet context={[isLoggedIn]} />
        </main>
    </div>
}

export default App;