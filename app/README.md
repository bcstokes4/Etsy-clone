## Contact Me:
[![LinkedIn](https://img.shields.io/badge/-linkedin-%230A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brian-stokes-86a842124/)
[![Gmail](https://img.shields.io/badge/-gmail-%23EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:bcstokes4@gmail.com)

## Installation Instructions
### Backend
- Run `pipenv -r install requirements.txt` to install necessary packages and dependencies
- Create an .env file (see .env.example)
- Make sure the SQLite3 database connection URL is in the .env file
- Local database records can be changed in the `/app/seeds` directory
- Database mapping and versioning achieved through Flask and Alembic. Models located in `/app/models` directory
- Enter environment shell with `pipenv shell`:
  - Run `flask db upgrade` to create instance of database
  - Run `flask seed all` to load database with local seed records
- To start backend server, simply run `flask run` inside the local shell

### Frontend
- In `/react-app` directory, run `npm install` to install packages and dependencies
- Ensure the node version being used is 16 via `nvm use 16`
- Run `npm start` to start React server

## Landing Page
![image](https://github.com/bcstokes4/Etsy-clone/assets/115053813/4a8e4df0-db1d-4b9f-991a-bd763290749b)

## Technology Used
### Frameworks and Libraries
![Python](https://img.shields.io/badge/-Python-%233776AB?style=for-the-badge&logo=python&logoColor=white) 
![Flask](https://img.shields.io/badge/-Flask-%23000000?style=for-the-badge&logo=python&logoColor=white) 
![React](https://img.shields.io/badge/-React-%2361DAFB?style=for-the-badge&logo=react&logoColor=black) 
![Redux](https://img.shields.io/badge/-Redux-%23764ABC?style=for-the-badge&logo=react&logoColor=white) 
![CSS3](https://img.shields.io/badge/-CSS3-%231572B6?style=for-the-badge&logo=react&logoColor=white) 
![HTML5](https://img.shields.io/badge/-HTML5-%23E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white)
![Javascript](https://img.shields.io/badge/-JavaScript-black?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

 ### Database:
 ![Postgres](https://img.shields.io/badge/-postgresql-%234169E1?style=for-the-badge&logo=javascript&logoColor=white)

 ### Hosting:
 ![Render](https://img.shields.io/badge/-render-%2346E3B7?style=for-the-badge&logo=render&logoColor=white)

 ## API Endpoints

### AUTH
| Endpoint                   | Method | Purpose                                                                                           | Response                                                   |
|----------------------------|--------|---------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| `/api/auth`                | GET    | Fetches user information upon the initial app load and subsequent refreshes.                     | Returns an object representing the current user if logged in. |
| `/api/auth/unauthorized`   | POST   | Handles cases where a protected route does not pass validations for the current user.             | Returns an object with an error property, an array with the value 'Unauthorized.' |
| `/api/auth/signup`         | POST   | Processes the creation of a new user by sending signup form data to the backend.                   | Returns an object representing the current user after successful login if account creation succeeds. |
| `/api/auth/login`          | POST   | Attempts to log in a user with the provided credentials.                                          | Returns an object representing the current user if validation succeeds. |
| `/api/auth/logout`         | POST   | Logs out the current user.                                                                        | Returns an object with the message 'User logged Out' if successful. |


### USERS
| Endpoint                           | Method | Purpose                                                    | Response                                                |
|------------------------------------|--------|------------------------------------------------------------|---------------------------------------------------------|
| `/api/users/:userId`               | GET    | Attempts to get the information of the user with a specific `userId`. | Returns an object with user information.     |

### PRODUCTS
| Endpoint                             | Method | Purpose                                                                     | Response                                                          |
|--------------------------------------|--------|-----------------------------------------------------------------------------|-------------------------------------------------------------------|
| `/api/products`                         | GET    | Attempts to get all the products listed on SportHub.                          | Returns an array of objects.                                |
| `/api/products/:productId`                 | GET    | Attempts to get the information for a specific product. | If the product exists, it returns an object with product details.               |
| `/api/product`                         | POST   | Attempts to create a new product. | If the request passes form validations, it returns an object with the new product details.         |
| `/api/products/:productId`                 | POST   | Attempts to update the product. | If the product exists and the request passes form validations, it returns an object with the new updated details. | 
| `/api/products/:productId`                 | DELETE | Attempts to delete the product. | If the product exists and belongs to the user, it returns the object `{"status": "successfully deleted product"}`.        |

### Product Images
| Endpoint                         | Method | Purpose                                                                                   | Response                                          |
|----------------------------------|--------|-------------------------------------------------------------------------------------------|---------------------------------------------------|
| `/api/products/:productId/images`        | POST   | Attempts to add an image for the product. | If the request is valid, it returns the new image record as an object. |
| `/api/products/:productId/images/:imageId`        | POST   | Attempts to update an image for the product. | If the request is valid, it returns the updated image record as an object. |
| `/api/products/:productId/images/:imageId`        | DELETE   | Attempts to delete an image for the product. | If the product exists and belongs to the user, it returns the object `{"status": "successfully deleted image"}`.        |


### REVIEWS
| Endpoint                         | Method | Purpose                                                                                   | Response                                          |
|----------------------------------|--------|-------------------------------------------------------------------------------------------|---------------------------------------------------|
| `/api/products/:productId/reviews`        | POST   | Attempts to add a review record for the product. | If the request is valid, it returns the new review record as an object. |
| `/api/products/:productId/reviews/:reviewId`        | POST   | Attempts to update a review record for the product. | If the request is valid, it returns the updated review record as an object. |
| `/api/reviews/:reviewId`        | DELETE   | Attempts to delete a review record for the product. | If the product exists and belongs to the user, it returns the object `{"status": "successfully deleted review"}`.        |


### ORDERS
| Endpoint                         | Method | Purpose                                                                                   | Response                                          |
|----------------------------------|--------|-------------------------------------------------------------------------------------------|---------------------------------------------------|
| `/api/orders`        | GET   | Attempts to get all the orders for session user. | If the request is valid, it returns an array of the users order objects. |
| `/api/orders/:orderID`        | GET   | Attempts to get a single order for session user. | If the request is valid, it returns the proper order object. |
| `/api/orders`        | POST   | Creates an order for the session user | Once the request is validated via middleware, the newly created order record will be returned as an object |

### FAVORITES
| Endpoint                         | Method | Purpose                                                                                   | Response                                          |
|----------------------------------|--------|-------------------------------------------------------------------------------------------|---------------------------------------------------|
| `/api/favorites/:productId`        | POST   | Creates a favorite for a product for session user. | If the request is valid, it returns the object `{"status": "successfully added favorite"}`. |
| `/api/favorites/:productId`        | DELETE   | Deletes a favorite for a product for session user. | If the request is valid, it returns the object `{"status": "successfully deleted favorite"}`. |



