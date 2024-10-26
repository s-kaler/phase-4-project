import App from './components/App';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Search from './components/Search';
import ArtistPage from './components/ArtistPage';

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
                path: '/profile/:userId',
                element: <UserProfile />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/artist/:artistId',
                element: <ArtistPage />
            }
        ]
    }
]

export default routes;