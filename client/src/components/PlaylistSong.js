import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import './App.css';

function PlaylistSong({ isUserArtist, pSong, handleRemove, handleAddToPlaylist, userPlaylists }) {
    const [formRating, setFormRating] = useState(0)
    const [ratingText, setRatingText] = useState(formatRating('Not Yet Rated'))
    console.log(pSong.rating)
    //console.log(isUserArtist)
    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    useEffect(() => {
        if (pSong.rating) {
            setFormRating(pSong.rating)
            setRatingText(formatRating(pSong.rating))
        }
    }, [])
    
    function formatRating(rating) {
        if (rating > 0) {
            let ratingStr = ''
            for (let i = 0; i < rating; i++) {
                ratingStr += "★"
            }
            return ratingStr;
        }
        else {
            return "Not Yet Rated"
        }
    }
    

    function onRemove(pSong) {
        fetch(`/playlistsongs/${pSong.id}`, {
            method: "DELETE",
        })
        .then(r => {
            handleRemove(pSong)
            alert("Song deleted successfully!") })
            
    }


    function handleEditRating(e) {
        e.preventDefault()
        fetch(`/playlistsongs/${pSong.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                rating: e.target.newRating.value
            })
        })
        setRatingText(formatRating(e.target.newRating.value))
    }

    let userPlaylistOptions = []

    if (userPlaylists) {
        if (userPlaylists.length > 0) {
            userPlaylistOptions = userPlaylists.map(playlist => (
                <option key={playlist.id} value={playlist.id} name={playlist.name}>{playlist.name}</option>
            ))
        }
        else {
            userPlaylistOptions = <option value=""></option>
        }
    }

    if (isUserArtist) {
        return (
            <div key={pSong.id} className="playlist-song">
                <li className="songlist" key={pSong.id}>
                    {pSong.song.title} by <Link to={`/artist/${pSong.song.artist.id}`}>{pSong.song.artist.username}</Link>
                    - {formatDuration(pSong.song.duration)} - |
                    {" "}{ratingText}
                    {" "}<button onClick={() => onRemove(pSong)}>Remove</button>
                    <form onSubmit={handleEditRating}>
                        <input type="number" min="1" max="5" name="newRating" value={formRating} onChange={(e) => {setFormRating(e.target.value)}} />
                        <button type="submit">Update Rating</button>
                    </form>
                </li>
                {userPlaylists.length > 0 ?
                    <form onSubmit={(e) => handleAddToPlaylist(pSong.song, e)}>
                        <select name="selections">
                            {userPlaylistOptions}
                        </select>
                        <button type="submit">Add To Playlist</button>
                    </form>
                :<></>}
            </div>
        )
    }
    else {
        return (
            <div key={pSong.id} className="playlist-song">
                <li className="songlist" key={pSong.id}>{pSong.song.title} by <Link to={`/artist/${pSong.song.artist.id}`}>{pSong.song.artist.username}</Link>
                    - {formatDuration(pSong.song.duration)} - |
                    {" "}{ratingText}
                </li>
            </div>
        )
    }
}

export default PlaylistSong;