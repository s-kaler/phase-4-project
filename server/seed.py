#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Artist, Song, Playlist, PlaylistSong

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Artist.query.delete()
        Song.query.delete()
        Playlist.query.delete()
        PlaylistSong.query.delete()

        
        
        ar1 = Artist(email=fake.email(), username=fake.first_name(), _password_hash='1234', biography=None, image_url=None)
        ar2 = Artist(email=fake.email(), username=fake.first_name(), _password_hash='2341', biography=None, image_url=None)
        ar3 = Artist(email=fake.email(), username=fake.first_name(), _password_hash='3412', biography=None, image_url=None)
        ar4 = Artist(email=fake.email(), username=fake.first_name(), _password_hash='4123', biography=None, image_url=None)
        db.session.add_all([ar1,ar2,ar3,ar4])
        db.session.commit()
        
        song1 = Song(title=fake.word(), duration=randint(1,240), artist_id=1)
        song2 = Song(title=fake.word(), duration=randint(1,240), artist_id=1)
        song3 = Song(title=fake.word(), duration=randint(1,240), artist_id=1)
        song4 = Song(title=fake.word(), duration=randint(1,240), artist_id=2)
        song5 = Song(title=fake.word(), duration=randint(1,240), artist_id=2)
        song6 = Song(title=fake.word(), duration=randint(1,240), artist_id=2)
        song7 = Song(title=fake.word(), duration=randint(1,240), artist_id=3)
        song8 = Song(title=fake.word(), duration=randint(1,240), artist_id=3)
        song9 = Song(title=fake.word(), duration=randint(1,240), artist_id=3)
        song10 = Song(title=fake.word(), duration=randint(1,240), artist_id=4)
        song11 = Song(title=fake.word(), duration=randint(1,240), artist_id=4)
        song12 = Song(title=fake.word(), duration=randint(1,240), artist_id=4)
        db.session.add_all([song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12])
        db.session.commit()
        