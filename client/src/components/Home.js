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
        <div className="Home">
            <h1>SoundFound</h1>
            <div className="HomeDiv">
                <h2>Featured Artists</h2>
                {allArtists.map(artist => (
                    <div className="HomeList" key={artist.id}>
                        <Link to={`/artist/${artist.id}`}>{artist.username}</Link>
                    </div>
                ))}
            </div>
            <div className="HomeDiv">
                <h2>Featured Playlists</h2>
                {allPlaylists.map(playlist => (
                    <div key={playlist.id} className="HomeList">
                        <p> <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>: {playlist.genre} | Created by <Link to={`/artist/${playlist.artist.id}`}>{playlist.artist.username}</Link></p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;