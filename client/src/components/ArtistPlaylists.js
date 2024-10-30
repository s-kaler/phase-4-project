import React, {useEffect, useState} from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import './App.css';

function ArtistPlaylists({ artistId, playlists }){
    const [playlistData, setPlaylistData] = useState([])
    
    let playlistList = []
    if (playlists) {
        playlistList = playlists.map(playlist => {
            return (
                <div key={playlist.id}>
                    <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                    <br></br>
                </div>
            )
        })
    }
    
    if (playlists.length > 0)
    {
        return (
            <>
                <h2>Playlists</h2>
                {playlistList}
            </>
        )
    }
    else {
        return (
            <h2>No playlists found.</h2>
        )
    }
}


export default ArtistPlaylists;