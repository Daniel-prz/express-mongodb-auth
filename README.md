# express-mongodb-auth

Cloned github repo to local
Created express server with mongoose connection
Created model User for user objects
Created /POST register route that hashes user password
Created /POST login route that generates json web token for authentication
Created /GET /admin protected, admin-only route using jwt for auth and RBAC middleware to verify admin status
Created /GET dashboard protected route

Tested routes

Register route with hashed password
![alt text](<Screenshot 2024-06-13 224422.png>)
Login with returned json web token
![alt text](<Screenshot 2024-06-13 224459.png>)
Access dashboard protected route with jwt
![alt text](<Screenshot 2024-06-13 233400.png>)
Register admin user
![alt text](<Screenshot 2024-06-13 235524.png>)
Login admin
Access /GET /admin with jwt
![alt text](<Screenshot 2024-06-14 000129.png>)
Register regular user
![alt text](<Screenshot 2024-06-14 000802.png>)
Login as User
Access denied to /GET /admin as regular user
![alt text](<Screenshot 2024-06-14 000435.png>)
