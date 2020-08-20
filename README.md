# GITHUB Repositories Stats

## ENV Vars

* PORT: The por that this backup should listen to
* BCRYPT_ROUNDS: How many rounds bcrypt should use
* JWT_SECRET: A secret password to encrypt JWT
* MONGO_CONNECTION_STRING: The mongodb connection string
* GITHUB_API_ENDPOINT: The github api with optional credentials, eg: https://USERNAME:PASSWORD@api.github.com/

## GITHub Credentials
*IMPORTANT*
You should inform a credential in the github url because it'll upgrade your rate limit from 60 requests per hour to 5000 requests per hour.

https://developer.github.com/v3/#rate-limiting

## ADRs

### Database

I would use DynamoDB, but I couldn't use any cloud resources, so the second most performatic option was mongodb. If I had more time I would use Redis to keep the stats.

### Backend

I would use AWS Serverless (sam cli), but I couldn't use any cloud resources, so the second option was a monolith that is possible to deploy to azure appservice or heroku or build an docker container.

## Technical debts

### Fault tolerance

All processing occurs in run-time in memory without any fault tolerance, even network fail.
All the pagination process should be stored to database to be possible to continue where it stops


### helpers.github.search

The github search api says that results might be incomplete due timeout
We are not checking if the result are complete or not.
We exepct that result even if incomplete, it'll return the most popular repositories with given name
But in future we should check if there is a way to get full results from github api.

### Time track

* Aug 18, 2020 5:10 PM  to  Aug 19, 2020 2:40 AM  =  7:30
* Aug 19, 2020 5:00 PM  to  Aug 19, 2020 ----------------


## What's included

* Babel
* Eslint
* Prettier
* Editorconfig
* Jest
* Jsdoc
* Swagger
* Vscode Program Debugger
* VScode Jest Debugger

## Please keep using

* git flow
* conventional commits (feat, fix, refactor, chore, docs, sytle, perf, vendor, test, etc..)

