import App from './components/App';
import Home from './components/Home';
import Search from './components/Search';
import ArtistPage from './components/ArtistPage';
import PlaylistPage from './components/PlaylistPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ArtistSongs from './components/ArtistSongs';
import ArtistPlaylists from './components/ArtistPlaylists';
import NewSong from './components/NewSong';
import NewPlaylist from './components/NewPlaylist';

const routes =  [
    {
        path: '/',
        element: <App />,
        children: [
            { 
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/artist/:artistId',
                element: <ArtistPage />,
                children: [
                    {
                        element: <ArtistSongs />,
                    },
                    {
                        element: <ArtistPlaylists />,
                    }
                ]
            },
            {
                path: '/playlist/:playlistId',
                element: <PlaylistPage />
            },
            {
                path: '/newsong',
                element: <NewSong />
            },
            {
                path: '/newplaylist',
                element: <NewPlaylist />
            }
        ]
    }
]

export default routes;