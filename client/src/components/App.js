import React, { useEffect, useState } from "react";
import { Outlet, Switch, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import './App.css';

function App() {
    
    const [user, setUser] = useState({
        username: '',
        id: '',
    });
    const [userPlaylists, setUserPlaylists] = useState([])
    //const navigate = useNavigate();
    
    useEffect(() => {
        // auto-login
        fetch("/check_session")
        .then((r) => {
            if (r.ok) {
                r.json().then((fetchedUser) => {
                    //console.log(user);
                    setUser(fetchedUser)
                    fetch(`/artists/${fetchedUser.id}/playlists`)
                        .then(r => r.json())
                        .then(data => {
                            setUserPlaylists(data)
                        })
                });
            }
        });
    }, []);

    return <div className="App">
        <NavBar user={user} setUser={setUser} />
        <main>
            <Outlet context={[user, setUser, userPlaylists, setUserPlaylists]}/>
        </main>
    </div>
}

export default App;