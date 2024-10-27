#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Artist, Album, Song, Playlist, PlaylistSong

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Artist.query.delete()
        Album.query.delete()
        Song.query.delete()
        Playlist.query.delete()

        ar1 = Artist(email=fake.email(), username=fake.first_name(), _password_hash=fake.password(), biography='', image_url='')
        ar2 = Artist(email=fake.email(), username=fake.first_name(), _password_hash=fake.password(), biography='', image_url='')
        ar3 = Artist(email=fake.email(), username=fake.first_name(), _password_hash=fake.password(), biography='', image_url='')
        ar4 = Artist(email=fake.email(), username=fake.first_name(), _password_hash=fake.password(), biography='', image_url='')
        ar5 = Artist(email=fake.email(), username=fake.first_name(), _password_hash=fake.password(), biography='', image_url='')
        db.session.add_all([ar1,ar2,ar3,ar4,ar5])
        db.session.commit()
        