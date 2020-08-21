# GITHUB Repositories Stats

This software will gather and keep information about github repositories

## Enviroment Variables

* PORT: The port that this backend should listen to
* BCRYPT_ROUNDS: How many rounds bcrypt should use
* JWT_SECRET: A secret password to encrypt JWT
* MONGO_CONNECTION_STRING: The mongodb connection string
* GITHUB_API_ENDPOINT: The github api, this is optional there is a default value to "https://api.github.com/"
* STATS_UPDATE_PERIODICITY: The amount in milliseconds to update the stats, default to 24h

## Git Hub Token
You should inform a GITHUB_TOKEN in .env file  
It'll upgrade your rate limit from 60 requests per hour to 5000 requests per hour.  
  
https://developer.github.com/v3/#rate-limiting  
  
https://github.com/settings/tokens  
  
## ADRs

### Database

I would use DynamoDB, but I couldn't use any cloud resources, so the second most performatic option was mongodb.

### Backend

I would use AWS Serverless (sam cli), but I couldn't use any cloud resources, so the second option was a monolith that is possible to deploy to azure appservice or heroku or build an docker container.

## Technical debts

### Fault tolerance

* All processing occurs in run-time in memory without any fault tolerance, even network fail.
* All pagination process should be stored to database/or/RabbitMQ to be possible to continue where it stops

### Github search API

* The github search api says that results might be incomplete due timeout. We are not checking if the result are complete or not. But that result has the most popular libs the should be enough.

### Pagination

* Pagination could do better to detect the last page
* Pagination could be more performatic
* Pagination isn't network fault torelant

### Client data validation

* It's missing a code to valid user inputs like express validator or hapi/joy

## What's included

* Babel
* Eslint
* Prettier
* Editorconfig
* Jest
* Jsdoc
* Swagger
* Vscode Program Debugger

## Please keep using

* Git Flow
* Conventional Commits (feat, fix, refactor, chore, doc, sytle, perf, vendor, test, etc..

### Time track

* Aug 18, 2020 5:10 PM  to  Aug 19, 2020 02:40 AM  =  9:30
* Aug 19, 2020 5:00 PM  to  Aug 19, 2020 11:49 PM  -  6:49
* Aug 20, 2020 5:12 PM  to  Aug 20, 2020 8:35 PM   -  3:23
* *Total: 19:42*
