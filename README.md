## Tech Issues Report Application

A simplified technical issues management system, applicable to small- and medium-size organizations.

The app has two views: **User** and **Admin**.

Admin functionalities include:
- Overall view of all tickets in the database, sorted by priority or status.
- Edit the status of each ticket.
- Change account password.

User functionalities include:
- Overall view of all tickets in the database, sorted by priority or status.
- Create new ticket.
- Change account password.

As my vision for the project is to be deployed to a server and is open to the internet, I did not add the **_Create/ Register new account_** feature as part of this app. This is because I want the system admin to have more control over the users in the system (they would have to manually add the user by sending POST request to the server, which can be automated by writing a small script using the pre-set secret API key).

The environment file must include:
- DATABASE_URL (for database connection)
- JWT_KEY (for authentication)
- API_KEY (for authentication route, prevent unauthenticated users from accessing the api route and crawl data)
- BASE_URL (for api routing)

Want to test the app out? Use the following login credentials!

THIS APP IS OPEN TO THE INTERNET, SO PLEASE WATCH OUT WHAT YOU COMMENT!!

**Admin View:**
_Username:_ testAdmin1
_Password:_ testAdm1n!

**User View:**
_Username:_ testUser1
_Password:_ n0tAT3stUs3r!

## Some screenshots
![CleanShot 2025-01-05 at 20 59 16@2x](https://github.com/user-attachments/assets/a44cbb30-d3d6-4fb5-80d9-2fc3fdd25cae)
![CleanShot 2025-01-05 at 21 00 00@2x](https://github.com/user-attachments/assets/1ba52f44-1a06-44d1-a4f6-48bb767a9472)
![CleanShot 2025-01-05 at 21 01 29@2x](https://github.com/user-attachments/assets/9b979f39-15e3-4651-b6fc-e777e5f2386a)



 
