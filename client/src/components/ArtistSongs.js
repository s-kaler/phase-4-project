import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ArtistSongs({artistId}) {
    const [songData, setSongData] = useState([])
    useEffect(() => {
        fetch(`/artists/${artistId}/songs`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setSongData(data)
        })
    }, [])

    const songlist = songData.map(song => {
        return (
            <li key={song.id}>{song.title} - {formatDuration(song.duration)}</li>
        )
    })
    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10? '0' : ''}${seconds}`;
    }

    return (
        <>
        <h3>Songs</h3>
        <ul>
            {songlist}
        </ul>
        </>
    )
}

export default ArtistSongs;