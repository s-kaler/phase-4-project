import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link, useNavigate } from "react-router-dom";

function PlaylistPage() {
    const params = useParams();
    const [user, setUser] = useOutletContext();
    const [isUserArtist, setIsUserArtist] = useState(false)
    const [playlistData, setPlaylistData] = useState({
        name: "",
        artist_id: null,
        artist: {
            username: "",
        }
    })
    const [songs, setSongs] = useState([])

    useEffect(() => {
        fetch(`/playlists/${params.playlistId}`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            if (user && user.id === parseInt(data.artist.id)) {
                setIsUserArtist(true)
            }
            setPlaylistData({
                name: data.name,
                artist_id: data.artist_id,
                artist: data.artist,
            })
        })
        fetch(`/playlists/${params.playlistId}/songs`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setSongs(data)
        })
    },[]);
    let songList = []
    if(songs) {
        songList = songs.map(pSong => {
            if (isUserArtist) {
                return (
                    <li className="songlist" key={pSong.id}>{pSong.song.title} by {pSong.song.artist.username} - {formatDuration(pSong.song.duration)} - <button onClick={() => handleRemove(pSong)}>Remove</button></li>
                )
            }
            else {
                return (
                    <li className="songlist" key={pSong.id}>{pSong.song.title} by {pSong.song.artist.username} - {formatDuration(pSong.song.duration)}</li>
                )
            }
        })
    }
    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function handleRemove(pSong) {
        fetch(`/playlistsongs/${pSong.id}`, {
            method: "DELETE",
        })
        .then(r => {})
        .then(data => {
            setSongs(songs.filter(s => s.id!== pSong.id))
            alert("Song deleted successfully!")
        })
    }


    return (
        <div>
            <h1>{playlistData.name}</h1>
            <p>Created by {playlistData.artist.username}</p>
            <ul>
                {songList}
            </ul>
        </div>
    )
}

export default PlaylistPage;