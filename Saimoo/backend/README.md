## Setup Project

``` bash
# install dependencies
$ npm install

.env
    DATABASE_URL="your database url"

# if database has data
$ npx prisma db pull

# else if database hasn't data
$ npx prisma migrate dev --name init

# generate prisma client
$ npx prisma generate
``` 

## Command

``` bash
# run project
$ npm start

# run project in dev mode
$ npm run dev

# run unit test
$ npm test
```


## Project Structure

```plaintext
src/
├── config/
├── controllers/  
├── middlewares        
├── models/                     
├── routes
├── utils/
├── services/
├── utils/
│ 
├── app.ts
└── server.ts

tests/
├── routes/
├── integration/
└── unit/
```