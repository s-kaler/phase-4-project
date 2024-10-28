import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ArtistSongs({artistId}) {

    useEffect(() => {
        fetch(`/artistsongs/${artistId}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })
    })
    return (
        <>
        </>
    )
}

export default ArtistSongs;