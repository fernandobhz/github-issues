# GITHUB Repositories Stats

This software will gather and keep information about github repositories

## Enviroment Variables

* PORT: The port that this backend should listen to
* BCRYPT_ROUNDS: How many rounds bcrypt should use
* JWT_SECRET: A secret password to encrypt JWT
* MONGO_CONNECTION_STRING: The mongodb connection string
* GITHUB_API_ENDPOINT: The github api, this is optional there is a default value to "https://api.github.com/"
* FIRST_STATS_UPDATE_DELAY: A delay for the first stat update
* STATS_UPDATE_PERIODICITY: The amount in milliseconds to update the stats, default to 24h
* NETWORK_RETRY_ATTEMPTS: An array with number of seconds to wait before retry another network call, eg: [1, 10, 60, 600]. This means that the first attempt will be delayed in 1 sec, the second one in 10 seconds, the third in 1 minute and the last in 10 minutes

## Git Hub Token
You should inform a GITHUB_TOKEN in .env file  
It'll upgrade your rate limit from 60 requests per hour to 5000 requests per hour.  
  
https://developer.github.com/v3/#rate-limiting  
  
https://github.com/settings/tokens  
  
## Technical debts

### Fault tolerance

* There is a fault tolerance for network fails in pagination, but it's not robust as a RabbitMQ can be.

### Github search API

* The github search api says that results might be incomplete due timeout. We are not checking if the result are complete or not. But that result has the most popular libs the should be enough.

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
* Git Flow
* Conventional Commits (feat, fix, refactor, chore, doc, sytle, perf, vendor, test, etc..

