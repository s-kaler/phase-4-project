from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!



class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    biography = db.Column(db.String)
    image_url = db.Column(db.String)

    songs = db.relationship('Song', back_populates='artist', cascade='all, delete-orphan')

    playlists =  db.relationship('Playlist', back_populates='artist')


    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Song(db.Model, SerializerMixin):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    duration = db.Column(db.String, nullable=False)

    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    artist = db.relationship('Artist', back_populates='songs')
    
    playlist_songs = db.relationship('PlaylistSong', back_populates='song', cascade='all, delete-orphan')

    playlists = association_proxy('playlist_songs', 'playlist', creator=lambda playlist_obj: PlaylistSong(playlist=playlist_obj))


class Playlist(db.Model, SerializerMixin):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    artist = db.relationship('Artist', back_populates='playlists')

    playlist_songs = db.relationship('PlaylistSong', back_populates='playlist', cascade='all, delete-orphan')

    songs = association_proxy('playlist_songs', 'song', creator=lambda song_obj: PlaylistSong(song=song_obj))


# Association Model to store many-to-many relationship between playlist and song
class PlaylistSong(db.Model, SerializerMixin):
    __tablename__ = 'playlist_songs'

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, unique=True)

    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)
    playlist = db.relationship('Playlist', back_populates='playlist_songs')

    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    song = db.relationship('Song', back_populates='playlist_songs')