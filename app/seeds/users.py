from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', name='demo-lition', email='demo@aa.io', password='password', created_at=datetime.today())
    steve = User(
        username='SteveJobs', name='Steve Jobs', email='steve@apple.com', password='password', created_at=datetime.today())
    elon = User(
        username='ElonMusk', name='Elon Musk', email='elon@tesla.com', password='password', created_at=datetime.today())
    oprah = User(
        username='OprahWinfrey', name='Oprah Winfrey', email='oprah@own.tv', password='password', created_at=datetime.today())
    jordan = User(
        username='MichaelJordan', name='Michael Jordan', email='michael@airjordan.com', password='password', created_at=datetime.today())
    madonna = User(
        username='Madonna', name='Madonna', email='madonna@singer.com', password='password', created_at=datetime.today())
    beyonce = User(
        username='Beyonce', name='Beyoncé', email='beyonce@singer.com', password='password', created_at=datetime.today())
    cristiano = User(
        username='CristianoRonaldo', name='Cristiano Ronaldo', email='cristiano@soccer.com', password='password', created_at=datetime.today())
    bill = User(
        username='BillGates', name='Bill Gates', email='bill@microsoft.com', password='password', created_at=datetime.today())
    jim = User(
        username='JimCarrey', name='Jim Carrey', email='jim@actor.com', password='password', created_at=datetime.today())
    dwayne = User(
        username='DwayneJohnson', name='Dwayne Johnson', email='dwayne@actor.com', password='password', created_at=datetime.today())
    serena = User(
        username='SerenaWilliams', name='Serena Williams', email='serena@tennis.com', password='password', created_at=datetime.today())
    dali = User(
        username='SalvadorDali', name='Salvador Dalí', email='dali@artist.com', password='password', created_at=datetime.today())
    taylor = User(
        username='TaylorSwift', name='Taylor Swift', email='taylor@singer.com', password='password', created_at=datetime.today())
    kobe = User(
        username='KobeBryant', name='Kobe Bryant', email='kobe@nba.com', password='password', created_at=datetime.today())

    db.session.add(demo)
    db.session.add(steve)
    db.session.add(elon)
    db.session.add(oprah)
    db.session.add(jordan)
    db.session.add(madonna)
    db.session.add(beyonce)
    db.session.add(cristiano)
    db.session.add(bill)
    db.session.add(jim)
    db.session.add(dwayne)
    db.session.add(serena)
    db.session.add(dali)
    db.session.add(taylor)
    db.session.add(kobe)

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
