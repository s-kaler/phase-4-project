import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './App.css';

function ArtistSongs({ artistId, isUserArtist, songs }) {
    const [user, setUser, userPlaylists] = useOutletContext();
    const [songData, setSongData] = useState(songs)

    function handleDelete(song) {
        fetch(`/songs/${song.id}`, {
            method: "DELETE",
        })
       .then(r => {})
       .then(data => {
            setSongData(songData.filter(s => s.id!== song.id))
            alert("Song deleted successfully!")
        })
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
        })
    }
    

    const songList = songData.map(song => {
        if(user.id !== '')
        {
            if (isUserArtist) {
                return (
                    <div key={song.id}>
                        <li>{song.title} - {formatDuration(song.duration)} - <button onClick={() => handleDelete(song)}>Delete</button></li>
                        {userPlaylists.length > 0 ?
                        <form onSubmit={(e) => handleAddToPlaylist(song, e)}>
                            <select name="selections">
                                {userPlaylistOptions}
                            </select>
                            <button type="submit">Add To Playlist</button>
                        </form>
                        : <></>}
                    </div>
                )
            }
            else {
                return (
                    <div key={song.id} >
                        <li>{song.title} - {formatDuration(song.duration)}</li>
                        {userPlaylists.length > 0 ?
                            <form onSubmit={(e) => handleAddToPlaylist(song, e)}>
                                <select name="selections">
                                    {userPlaylistOptions}
                                </select>
                                <button type="submit">Add To Playlist</button>
                            </form>
                        : <></>}
                    </div>
                )
            }
        }
        else {
            return (
                <div key={song.id}>
                    <li>{song.title} - {formatDuration(song.duration)}</li>
                </div>
            )
        }
        
    })
    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10? '0' : ''}${seconds}`;
    }
    if (songList.length > 0) {

        return (
            <>
            <h2>Songs</h2>
            <ul>
                {songList}
            </ul>
            </>
        )
    }
    else {
        return (
            <h2>No songs found.</h2>
        )
    }
}

export default ArtistSongs;