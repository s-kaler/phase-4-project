import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import './App.css';
import PlaylistSong from "./PlaylistSong";

function PlaylistPage() {
    const params = useParams();
    const [user, setUser, userPlaylists, setUserPlaylists] = useOutletContext();
    const [isUserArtist, setIsUserArtist] = useState(false)
    const [playlistData, setPlaylistData] = useState({
        name: "",
        genre: "",
        artist_id: null,
        artist: {
            username: "",
        }
    })
    const [songs, setSongs] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [areYouSure, setAreYouSure] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
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
                genre: data.genre,
                artist_id: data.artist_id,
                artist: data.artist,
            })
        })
        fetch(`/playlists/${params.playlistId}/songs`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            setSongs(data)
            setIsLoaded(true)
        })
        if(user.id !== ''){
            fetch(`/artists/${user.id}/playlists`)
                .then(r => r.json())
                .then(data => {
                    setUserPlaylists(data)
                })
        }
        
    },[]);


    function handleAddToPlaylist(song, e) {
        e.preventDefault();
        console.log(e.target.selections.value)
        console.log(song.id)
        fetch(`/playlists/${e.target.selections.value}/songs`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song_id: song.id,
                rating: "0"
            }),
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                if(e.target.selections.value === params.playlistId) {
                    setSongs([...songs, data])
                }
                alert("Song added to playlist!")
            })
    }

    let songList = []

    if(songs)  {
        songList = songs.map(pSong => {
            return (
                <PlaylistSong
                    key={pSong.id}
                    pSong={pSong}
                    handleAddToPlaylist={handleAddToPlaylist}
                    handleRemove={handleRemove}
                    isUserArtist={isUserArtist}
                    userPlaylists={userPlaylists}
                />
            )
        })
    }

    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function formatRating(rating) {
        if (rating === 0 || rating === null) {
            return "Not Yet Rated"
        }
        else {
            let ratingStr = ''
            for (let i = 0; i < rating; i++) {
                ratingStr += "★"
            }
            return ratingStr;
        }
    }

    function handleRemove(pSong) {
        setSongs(songs.filter(s => s.id!== pSong.id))
        alert("Song deleted successfully!")
    }
    

    function handleEditClick() {
        setIsEditing(!isEditing)
    }



    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(30),
        genre: yup.string().required("Must enter a genre").max(15),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: playlistData.name,
            genre: playlistData.genre,
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
                        genre: data.genre,
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
                <br />
                <input
                    id="genre"
                    name="genre"
                    onChange={formik.handleChange}
                    value={formik.values.genre}
                />
                <p style={{ color: "red" }}> {formik.errors.genre}</p>
                <br />
                <button type="submit">Update Playlist</button>
            </form>
            <br></br>
            {areYouSure ? <button type="button" onClick={handleDelete}>Are You Sure?</button> :
                <button type="button" onClick={() => setAreYouSure(true)}>Delete Playlist</button>  }
            
            <button type="button" onClick={handleEditClick}>Cancel</button>
        </>
    )

    function handleAddToPlaylist(song, e) {
        e.preventDefault();
        console.log(e.target.selections.value)
        console.log(song.id)
        fetch(`/playlists/${e.target.selections.value}/songs`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song_id: song.id,
                rating: "0"
            }),
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                alert("Song added to playlist!")
                setSongs([...songs, data])
            })

    }

    if (!isLoaded) {
        return (
            <h3>Loading...</h3>
        )
    }
    else {
        if(isUserArtist)
        {
            return (
                <div className="playlist-page">
                    {isEditing ? editFormik :
                        <>
                            <h1>{playlistData.name}</h1>
                            <h3>Genre: {playlistData.genre}</h3>
                            <button name="edit-button" onClick={handleEditClick}>Edit Playlist</button>
                        </>
                    }
                    <p>Created by <Link to={`/artist/${playlistData.artist.id}`}> {playlistData.artist.username}</Link ></p>
                    <ul>
                        {songList}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div className="playlist-page">
                    <h1>{playlistData.name}</h1>
                    <h3>Genre: {playlistData.genre}</h3>  
                    <p>Created by <Link to={`/artist/${playlistData.artist.id}`}> {playlistData.artist.username}</Link ></p>
                    <ul>
                        {songList}
                    </ul>
                </div>
            )
        }
    }
}

export default PlaylistPage;
