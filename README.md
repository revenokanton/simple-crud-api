# Simple CRUD API
A simple restful NodeJS CRUD


## Routes

|          ROUTE            |       HTTP        |      DESCRIPTION      | 
| ------------------------- | ----------------- | --------------------- |
| /api/person               |       GET         | Show all persons     | 
| /api/person/:personId     |       GET         | Show by id           | 
| /api/person               |       POST        | Add new person       | 
| /api/person/:personId     |       PUT         | Update person by id  |    
| /api/person/:personId     |       DELETE      | Delete person by id  |

## Running


```
npm install
```
Run API in development mode with:
```
npm run start:dev
```
Run API in production mode with:
```
npm run start:prod
```
