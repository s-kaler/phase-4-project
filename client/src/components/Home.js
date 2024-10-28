import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Home() {
    const [user, setUser, userPlaylists] = useOutletContext();
    console.log(user)
    
    return (
        <>
            <h1>Home</h1>
            <h2>Artists</h2>
            <h2>Playlists</h2>
        </>
    )
}

export default Home;