# MySQL Class cosmology database

## Installation 
* `git clone <repository-url>` this repository
* Using the [env_template](env_template) create `.env` file, and fill with relevant information.
* `npm install` to install the dependencies
* `node .\setup.js` to setup the database with the tables. 

## Running server
* `node .\index.js` to run the server. 

## Routes
  ### Authenticate
  * Handles logging in and JWT token authentication.
  
  ### Query
  * Handles requests that deal with srt queries
  
  ### Results
  * Handles requests that deal with srt results
  
  ### Source
  * Handles requests that deal with srt sources.
  
  ### User
  * Handles requests that deal with website users. Can only be fulfilled if user is an admin.
  
# TODO
* Need to check user submitted input to prevent SQL injection. Might be as easy as checking for escape characters for SQL.
* Deploy backend for testing.

