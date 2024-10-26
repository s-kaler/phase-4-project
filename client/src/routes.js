import App from './components/App';
import Home from './components/Home';
import Search from './components/Search';
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage';
import PlaylistPage from './components/PlaylistPage';
import Login from './components/Login';
import SignUp from './components/SignUp';

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
                element: <ArtistPage />
            },
            {
                path: '/album/:albumId',
                element: <AlbumPage />
            },
            {
                path: '/playlist/:playlistId',
                element: <PlaylistPage />
            }
        ]
    }
]

export default routes;