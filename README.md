❗️ Please don't forget to copy .env.example to .env with port 4000, if there's no 'env'. 
❗️ Please don't forget to run server (npm run start:dev) before running tests (npm run test)

Instruction
1. Install dependencies: npm ci
2.	Create .env file (copy from .env.example): cp .env.example .env
3. npm run start:dev
4. npm run test
5. Open postman or analog and check localhost

User API Testing

Create User
POST http://localhost:4000/user
json
{"login": "alice", "password": "alice123"}

Get All Users
GET http://localhost:4000/user

Get User by ID
GET http://localhost:4000/user/:id

Update Password
PUT http://localhost:4000/user/:id
json
{"oldPassword": "alice123", "newPassword": "newalice"}
Delete User

DELETE http://localhost:4000/user/:id

Track API Testing

Create Track
POST http://localhost:4000/track
json
{"name": "Song 1", "artistId": null, "albumId": null, "duration": 180}

Get Track
GET http://localhost:4000/track/:id

Update Track
PUT http://localhost:4000/track/:id
json
{"name": "Song 1 updated", "duration": 200}
Delete Track

DELETE http://localhost:4000/track/:id

Artist API Testing

Create Artist
POST http://localhost:4000/artist
json
{"name": "Rammstein", "grammy": false}

Get All Artists
GET http://localhost:4000/artist

Get Artist by ID
GET http://localhost:4000/artist/:id

Update Artist
PUT http://localhost:4000/artist/:id
json
{"name": "Rammstein Band", "grammy": true}

Delete Artist
DELETE http://localhost:4000/artist/:id

Album API Testing

Create Album
POST http://localhost:4000/album
json
{"name": "Mutter", "year": 2001, "artistId": "uuid"}

Get All Albums
GET http://localhost:4000/album

Get Album by ID
GET http://localhost:4000/album/:id

Update Album
PUT http://localhost:4000/album/:id
json
{"name": "New Album Name", "year": 2002, "artistId": null}
Delete Album

DELETE http://localhost:4000/album/:id