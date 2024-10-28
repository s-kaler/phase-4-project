import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import './App.css';

function Home() {
    const [user, setUser, userPlaylists] = useOutletContext();
    const [allArtists, setAllArtists] = useState([])
    const [allSongs, setAllSongs] = useState([])
    const [allPlaylists, setAllPlaylists] = useState([])
    //console.log(user)

    useEffect(() => {
        fetch(`/artists`)
            .then(r => r.json())
            .then(data => {
                //console.log(data)
                setAllArtists(data)
            })
        fetch(`/songs`)
            .then(r => r.json())
            .then(data => {
                //console.log(data)
                setAllSongs(data)
            })
        fetch(`/playlists`)
            .then(r => r.json())
            .then(data => {
                //console.log(data)
                setAllPlaylists(data)
            })
    }, [])

    return (
        <>
            <h1>Home</h1>
            <div className="HomeBox">
                <h2>Artists</h2>
                {allArtists.map(artist => (
                    <div key={artist.id}>
                        <Link to={`/artist/${artist.id}`}>{artist.username}</Link>
                    </div>
                ))}
            </div>
            <div className="HomeBox">
                <h2>Playlists</h2>
                {allPlaylists.map(playlist => (
                    <div key={playlist.id}>
                        <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                        <p>by {playlist.artist.username}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;