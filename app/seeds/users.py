from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', name='demo-lition', email='demo@aa.io', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/rick-astley-pfp.jpeg')
    steve = User(
        username='SteveJobs', name='Steve Jobs', email='steve@apple.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/steve-jobs-pfp.jpeg')
    elon = User(
        username='ElonMusk', name='Elon Musk', email='elon@tesla.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/elon-pfp.jpeg')
    oprah = User(
        username='OprahWinfrey', name='Oprah Winfrey', email='oprah@own.tv', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/oprah-pfp.jpeg')
    jordan = User(
        username='MichaelJordan', name='Michael Jordan', email='michael@airjordan.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/jordan-pfp.jpeg')
    anthony = User(
        username='Anthony', name='Anthony Kiedis', email='anthony@singer.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/keidis-pfp.jpeg')
    phoebe = User(
        username='Phoebe', name='Phoebe Bridgers', email='phoebe@singer.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/phoebe-pfp.jpeg')
    cristiano = User(
        username='CristianoRonaldo', name='Cristiano Ronaldo', email='cristiano@soccer.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/christiano-pfp.jpeg')
    bernie = User(
        username='Bernie', name='Bernie Sanders', email='bernie@microsoft.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/bernie-pfp.jpeg')
    jim = User(
        username='JimCarrey', name='Jim Carrey', email='jim@actor.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/jim-pfp.jpeg')
    paul = User(
        username='PaulRudd', name='Paul Rudd', email='paul@actor.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/paul-rudd-pfp.jpeg')
    serena = User(
        username='SerenaWilliams', name='Serena Williams', email='serena@tennis.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/serena-pfp.jpeg')
    dali = User(
        username='SalvadorDali', name='Salvador Dalí', email='dali@artist.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/dali-pfp.jpeg')
    theweeknd = User(
        username='TheWeeknd', name='TheWeeknd', email='tw@singer.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/theweeknd-pfp.jpeg')
    eddie = User(
        username='EddieMurphy', name='Eddie Murphy', email='eddie@actor.com', password='password', created_at=datetime.today(), profile_picture='https://sporthub-bucket.s3.amazonaws.com/sporthub-seeders/eddie-pfp.jpeg')

    db.session.add(demo)
    db.session.add(steve)
    db.session.add(elon)
    db.session.add(oprah)
    db.session.add(jordan)
    db.session.add(anthony)
    db.session.add(phoebe)
    db.session.add(cristiano)
    db.session.add(bernie)
    db.session.add(jim)
    db.session.add(paul)
    db.session.add(serena)
    db.session.add(dali)
    db.session.add(theweeknd)
    db.session.add(eddie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
