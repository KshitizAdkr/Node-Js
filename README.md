# ecmo-api-49

- npm i express cors helmet mongose nodemailer joi(for frontend) multer
  for react:
- npm i tailwindcss/vite

for beginnig:

- npm i express //--save-dev =>Dev dependencies
  adds 67 more packages(along with express,other packages gets installed too)

  Express uses mocha : npm i mocha --save-dev

  Read for tomorrow : what is http,http package, http verbs, Request response cycle?

  HTTP : Protocol used to send and receive data.

  HTTP Package: This package contains a set of high-level functions and classes that make it easy to consume HTTP resources.
  : is a built-in module for creating HTTP servers and handling requests.

  HTTP Verbs : HTTP verbs define the action to be performed on a resource.(get, post, put, patch)

  Request-Response cycle : Client sends a http request.
  server processes the request and prepares a response.
  server sends the response to client which might be html,json etc.
  client receives and processses the response.

//npm i nodemon -g

Don't use this at http.createServer:
(request, response) => {
//console.log(request)
let url = request.url;
let method = request.method;

    console.log({url, method})
    response.end("Hello")

}

CRUDE

## Project Architecture

- Folder Structure

  - ```
      node_modules/
      public/   //is safe,runs on index.js
      src/
          modules/
              auth/
                  auth.model
                  auth.controller
                  auth.service
                  auth.router
                  auth.validation
              product/


              model/
                  auth.model
              controller
                  auth.controller
              router
                  auth.router
              service
                  auth.service
              validation
                  auth.validation

      .gitignore
      index.js
      package-lock.json
      package.json
      README.md
    ```

  ```

  ```

route = url

server side rendering
client side rendering

//Insomia or postman

//Postman

- For sign in: can use any,such as google,github or any.
- create a personal workspace
- create new (get)
- paste the url of localhost(the one running from express js) and click "Send".
- There's no landing page in postman,only testing

### Features Breakdown:

- Authentication and authorization
  - Register
  - Activate
  - Login
  - Refresh Token
  - Logged in user profile
  - Forget password request
  - Token verify for forget password
  - Reset Password
- Banners/Sliders
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- Brand
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- Category //Title,slug
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- User //Name,email,passwaord,phone no
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- Product //Product name, description, overview ,price, image
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- Order //User id,product id, Quanttity, Price
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- Order detail(cart) // No. of qunatity, total price , Product id
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- Payment/Transcations // Stripe/Khalti
  - Create
  - Read all
  - Single read
  - Update
  - Delete
- Chat // DialogueFlow , Automated message,
  - Create
  - Read all
  - Single read
  - Update
  - Delete

---

open/close
: open = open to expansion
: close = close for modifcation

- Voucher/Coupons
- XP
- Blogs
- Static
- Inventory
- Logistic

//CRUD: create, read, update, delete

app.use: universal method i.e. accepts all get,push,.....,etc.
Middleware can manipulate the incoming request.

Custom middlware, routing level middleware,error handling error

joi,yup,xod,clas validator
server configuration related mistake: 500 error     

cloudinary:
env file isn't uploaded at github
unlink helps in deletion

scrypt
bcrypt

const salt = bcrypt.genSaltSync(12)
data.password = bcrypt.hashSync(data.password, salt)

## Database 
    - SQL Database
        - mysql, mariadb, postgresql, sqlite, msql, oracledb 
    - NoSQL Database
        - NoSQL

## User Cred: (ATLAS)
 - Username: kshitizadhikari8
 - Password: BmGD1nVdUjaSsWyh

User(password authentication for database):
    3eTr8XVrDjxrLQsn

 Public Domain: 0.0.0.0/0 or 8.8.8.8/8