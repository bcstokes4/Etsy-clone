from app.models import db, Order
from datetime import datetime
import csv

def seed_orders():
    with open("app/seeds/csv-files/order_seed.csv", "r") as file2:
        csvreader = csv.reader(file2)
        for order_row in csvreader:
                try:
                    order = Order(
                        user_id=int(order_row[0]),
                        is_completed=True, 
                        address=order_row[1],
                        price=float(order_row[2]),
                        created_at=datetime.now()
                    )
                    db.session.add(order)
                except (ValueError, IndexError) as e:
                    print(f"Error processing row: {order_row}. Details: {e}")

        db.session.commit()




def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))
        
    db.session.commit()
