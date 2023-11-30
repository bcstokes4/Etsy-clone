## Users

### Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on the `/signup` page:
    - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on the `/login` page:
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the log-in form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-in form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on the `/login` page to allow me to visit the site as a guest without signing up or logging in.
  - When I'm on the `/login` page:
    - I can click on a Demo User button to log me in and allow me access as a normal user.
      - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  - While on any page of the site:
    - I can log out of my account and be redirected to the home page `/` displaying all the restaurants I can order from.
      - So that I can easily log out to keep my information secure.

## Products

### View All Products

- As an unregistered and unauthorized user, I want to be able to view all of the products being listed on the `/products` page.
  - When I'm on the `/products` page:
    - I would like to see the most popular products from each category immediately listed.
    - I would like the ability to click on a category from a menu above all the product listings to immediately filter all the products to pertain to that category only.
        - in order to view the products more appropriately
    - I would like the ability to quickly add the product to the cart via a modal without having to go to the details page.
        - A quick view button on the product will appear upon hover to allow this
    - Upon clicking a product I want to be redirected to the `/products/:productId` page.

### View a Single Product

- As an unregistered and unauthorized user, I want to be able to view the details of a single product upon clicking on the product on the `/products/:productId` page.
  - When I'm on the `/products/:productId` page: 
    - I will be able to view all of the information regarding the product such as the seller, price, description
    - All of the reviews for the product will also be displayed under the product
    - The ability to add to cart as well as the quantity will be on the page

### Add a Product

- As a logged in and authenticated user, I want to be able to post a product for sale onto the website on the `/users/:userId` page. 
  - On the `/users/:userId` page:
    - I would like to have a "post listing" button which will popup a form modal
        - Upon submission of the form, the listing will be added to the `/users/:userId` page as well as the `/products` page.
    - I want to be redirected back to the `/users/:userId` page after submission.
  
### Update a Product

- As a logged in and authenticated user, I want to be able to edit a previous product listing I have posted on the `/users/:userId` page.
  - On the `/users/:userId` page:
    - I would like an "Edit listing" button under the specific listing I wish to update.
        - Upon clicking this button the form modal will again pop up but this time will have pre-entered data dependent on the previous properties of the product.
        - Any of the form features will have the ability to be change.
    - I want to be redirected back to the `/users/:userId` page after submission.

### Delete a Product

- As a logged in and authenticated user, I want to be able to delete a previous product listing I have posted on the `/users/:userId` page.
  - On the `/users/:userId` page:
    - I would like a "delete listing" button under the specific listing I wish to delete.
    - Upon clicking the button, a confirmation modal will pop up asking to confirm deletion
    - After submitting, I want to be redirected back to the `/users/:userId` page.


## Cart 

- As an unregistered and unauthorized user, I want to be able to click on the cart button in the navigation bar anywhere on the website.
  - Upon clicking the cart button:
    - All of the current items in the cart will be shown on a side panel.
    - The ability to clear the cart, update product quantity, as well as remove a product from cart will be available.
    - I want there to be a "checkout" button displayed by "clear cart" button which will redirect me to the `/checkout` page.

- As an unregistered and unauthorized user, I want to be able to update the cart either through the cart side panel or by navigating to the `/checkout` page with the "checkout       button".
  - When using the side panel, I can clear cart, adjust quantity as well as clear cart.
  - When on the `/checkout` page, I want to have the same functionality as the side panel. 

- I want to be prompted via a modal to sign up or log in when trying to complete the order when unregistered and unauthorized.

## Orders

- As a logged in and authenticated user, I want to be able to place and order on the `/checkout` page.
  - This page will again be reached by clicking the "checkout" button
    - There will be a form to fill out with the users information as well as listing out the products and their quantities.
    - The ability to change the order such as product quantity, removing items and all will be allowed.
    - After completing the order, the modal will close and the user will be redirected to the `/users/:userId` page.


## Reviews

### Read Reviews
- As an unregistered and unauthorized user, I want to be able to read the reviews for a product on the `/products/:productId` page.
  - All of the reviews will be listed under the specific product by how recent the review was and the average rating will be included in the product listing

### Create Review
- As a logged in and authenticated user, I want to be able to place a review on the `/users/:userId` page.
  - When on the `/users/:userId` page:
    - I want to have the ability to create a review for each of the products purchased only once per product per order. 
        - There will be a listing of all the previous orders and each of the products in the order that a review has not been submitted for will render a button allowing user to do so.

### Update Review
  - When on the `/users/:userId` page:
    - I want to be able to update any of my previous reviews
    - I would like there to be an update review button beside products in previous orders I have already placed a review for
    - BONUS: 
        - On the `/products/:productId` page: 
            - I would like for there to be an update/delete review button on the review I had previously left.

### Delete Review

  - When on the `/users/:userId` page:
    - I want to be able to delete any of my previous reviews
    - I would like there to be a delete review button beside the update button on the respective product 
    - BONUS: 
        - On the `/products/:productId` page: 
            - I would like for there to be an update/delete review button on the review I had previously left. 

## Favorites

- As a logged in and authenticated user, I want the ability to favorite a product throughout the website.
  - I would like each product image to have a heart on hover that will allow me to favorite it.
  - Deleting a favorite will be as simple as clicking the heart again.
  - I would like for all of my favorited products to be shown on the `/users/:userId` page.

