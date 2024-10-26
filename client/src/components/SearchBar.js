import React from 'react';
import Select from 'react-select'

function SearchBar() {
    const [searchSelect, setSearchSelect] = useState('')
    const options = [
        { value: 'artist', label: 'Artist' },
        { value: 'album', label: 'Album' },
        { value: 'song', label: 'Song' }
    ]

    return (
        <span className="SearchBox">
            <select>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="song">Song</option>
            </select>
            <input type="text" placeholder="Search..." />
        </span>
    );
}

export default SearchBar;