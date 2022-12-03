Simple User Management API
    Introduction: This is a Rest API for user registration and Management. It accepts JSON request body, returns JSON response and used Authorization type: Bearer Token.

To start the development server.
    1. Open your Terminal
    2. git clone https://github.com/AdonisJr/YonduBackend.github.io.git
    4. Go to backend/
    5. npm install - to install all dependencies
    3. npm run dev - to run the server

Here are the step by step instructions on how to test API endpoint.
    1. Download and Install postman (https://www.postman.com/)
    2. Open postman and import (YONDU.postman_collection.json) under backend/postmanScripts
    
    API endpoints:

        Get Athorization Token
            Endpoint: post -  http://localhost:3000/token
            Request Body Parameter:
                email
                password    
            Responses
                status: 400 - Invalid email or password.
                        200 - Successfully login.

            NOTE: Get Athorization Token you need to login using your email and password. 
                so basically if you dont have account yet. need to add user first.
            
        Add User
            Endpoint: post - http://localhost:3000/users
            Body Parameters:
                {
        (required)  "first_name": "Henson",
        (required)  "last_name": "Lao",
                    "address": "MANILA",
                    "post_code": "8500",
                    "contact_number": "09121793541",
        (required)  "email": "henson.lao@gmail.com",
        (required)  "user_name": "hendaughter",
        (required)  "password": "123"
                }
            Responses: 
                status: 422 - Parameter Required ( first_name, last_name, email, user_name, password )
                        201 - Successfully created.


        Get All Users
            Endpoint: get - http://localhost:3000/users
            Header Parameter
                (required)Athorization
                    Example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNywiaWF0IjoxNjcwMDczMjM2fQ.pDLw31XD-5rF43mEuM_jtVfHtVr7fb_KkyS-xkj-Uqs
            Responses
                status: 200 Successfully retreived (number of records).


        Delete Multiple Users
            Endpoint: delete - http://localhost:3000/users
            Header Parameter
                (required)Athorization
                    Example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNywiaWF0IjoxNjcwMDczMjM2fQ.pDLw31XD-5rF43mEuM_jtVfHtVr7fb_KkyS-xkj-Uqs
                Responses
                    status: 200 - Successfully deleted (number of records).
        
        Edit User
            Endpoint: put - http://localhost:3000/users/1 or http://localhost:3000/users/:user_id
            PATH PARAMETERS
                user_id
            Header Parameter
                (required)Athorization
                    Example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNywiaWF0IjoxNjcwMDczMjM2fQ.pDLw31XD-5rF43mEuM_jtVfHtVr7fb_KkyS-xkj-Uqs
            Body Parameter
                {
                    "first_name": "Henson",
                    "last_name": "Lao",
                    "address": "Agusan del Surs",
                    "post_code": "8500",
                    "contact_number": "09121793542",
                    "password": "123"
                }
            Responses
                status: 404 - User ID not found
                        200 - Successfully updated
            
        
        Delete Specific User
            Endpoint: put - http://localhost:3000/users/1 or http://localhost:3000/users/:user_id
            PATH PARAMETERS
                user_id
            Header Parameter
                (required)Athorization
                    Example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNywiaWF0IjoxNjcwMDczMjM2fQ.pDLw31XD-5rF43mEuM_jtVfHtVr7fb_KkyS-xkj-Uqs
            Responses
                status: 200 - Successfully deleted





any suggestions or corrections please feel free contact me

gmail: adonisjr.suico@gmail.com
linkedin: https://www.linkedin.com/in/adonis-jr-suico-0036891b2/
portfolio website: https://adonis-suico.website/
