import React, {useEffect, useState} from 'react';
import { useOutletContext, Link } from 'react-router-dom';

function ArtistPlaylists({ artistId, playlists }){
    const [playlistData, setPlaylistData] = useState([])
    useEffect(() => {
        fetch(`/artists/${artistId}/playlists`)
            .then(r => r.json())
            .then(data => {
                //console.log(data)
                setPlaylistData(data)
            })
    }, [])
    
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
    

    return (
        <>
            <h2>Playlists</h2>
            {playlistList}
        </>
    )
}


export default ArtistPlaylists;