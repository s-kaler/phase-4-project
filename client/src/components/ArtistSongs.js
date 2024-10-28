import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ArtistSongs({ artistId, isUserArtist, playlists }) {
    const [user, setUser, userPlaylists] = useOutletContext();
    const [songData, setSongData] = useState([])
    useEffect(() => {
        fetch(`/artists/${artistId}/songs`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            setSongData(data)
        })
        console.log(userPlaylists)
    }, [])


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
                song_id: song.id
            }),
        })
       .then(r => r.json())
       .then(data => {
            console.log(data)
            alert("Song added to playlist!")
        })
    }
    

    const songList = songData.map(song => {
        //console.log(isUserArtist)
        if (isUserArtist){
            return (
                <div key = {song.id}>
                    <li>{song.title} - {formatDuration(song.duration)} - <button onClick={() => handleDelete(song)}>Delete</button></li>
                    <form onSubmit={(e) => handleAddToPlaylist(song, e)}>
                        <select name="selections">
                            {userPlaylistOptions}
                        </select>
                        <button type="submit">Add To Playlist</button>
                    </form>
                </div>
                )
        }
        else {
            return (
                <div key={song.id} >
                    <li key={song.id}>{song.title} - {formatDuration(song.duration)}</li>
                    <form onSubmit={(e) => handleAddToPlaylist(song, e)}>
                        <select name="selections">
                            {userPlaylistOptions}
                        </select>
                        <button type="submit">Add To Playlist</button>
                    </form>
                </div>
            )
        }
    })
    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10? '0' : ''}${seconds}`;
    }

    return (
        <>
        <h2>Songs</h2>
        <ul>
            {songList}
        </ul>
        </>
    )
}

export default ArtistSongs;