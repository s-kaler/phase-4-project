import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function PlaylistPage() {
    const params = useParams();
    const [user, setUser, userPlaylists, setUserPlaylists] = useOutletContext();
    const [isUserArtist, setIsUserArtist] = useState(false)
    const [playlistData, setPlaylistData] = useState({
        name: "",
        artist_id: null,
        artist: {
            username: "",
        }
    })
    const [songs, setSongs] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [areYouSure, setAreYouSure] = useState(false)
    const navigate = useNavigate();

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
        fetch(`/artists/${user.id}/playlists`)
        .then(r => r.json())
        .then(data => {
            setUserPlaylists(data)
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

    function handleEditClick() {
        setIsEditing(!isEditing)
    }


    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(30),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: playlistData.name,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/playlists/${params.playlistId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
                .then(r => r.json())
                .then(data => {
                    setPlaylistData({
                        name: data.name,
                        artist_id: data.artist_id,
                        artist: {
                            username: data.artist.username,
                        }
                    })
                    setIsEditing(false)
                    alert("Profile updated successfully!")
                })
        },
    });

    function handleDelete() {
        fetch(`/playlists/${params.playlistId}`, {
            method: "DELETE",
        })
       .then(r => {
         if (r.ok) {
             alert("Playlist deleted successfully!")
             setAreYouSure(false)
             const poppedPlaylist = [...userPlaylists]
             poppedPlaylist.splice(poppedPlaylist.findIndex(p => p.id === parseInt(params.playlistId)), 1)
             setUserPlaylists([poppedPlaylist])
             navigate("/artist/" + user.id)
         }
       });
    }

    const editFormik = (
        <>
            <h2>Edit Playlist</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>
                <br></br>
                <button type="submit">Update Playlist</button>
            </form>
            <br></br>
            {areYouSure ? <button type="button" onClick={handleDelete}>Are You Sure?</button> :
                <button type="button" onClick={() => setAreYouSure(true)}>Delete Playlist</button>  }
            
            <button type="button" onClick={handleEditClick}>Cancel</button>
        </>
    )

    return (
        <div>
            {isEditing ? editFormik :
                <>
                    <h1>{playlistData.name}</h1>
                    <button name="edit-button" onClick={handleEditClick}>Edit Playlist</button>
                </>
            }
            <p>Created by {playlistData.artist.username}</p>
            <ul>
                {songList}
            </ul>
        </div>
    )
}

export default PlaylistPage;