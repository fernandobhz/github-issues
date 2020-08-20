# Node.js Monolith Boilerplate

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

## Structure

* apis
* classes
* core
* helpers
* models

## Routes

* GET /
* GET /api-docs
* POST /users/register
* POST /users/login
* POST /users/close-account

## ADRs

### Database

I would use DynamoDB, but I couldn't use any cloud resources, so the second most performatic option was mongodb.

### Backend

I would use AWS Serverless (sam cli), but I couldn't use any cloud resources, so the second option was a monolith that is possible to deploy to azure appservice or heroku or build an docker container.

## Technical debts

### helpers.github.search

The github search api says that results might be incomplete due timeout
We are not checking if the result are complete or not.
We exepct that result even if incomplete, it'll return the most popular repositories with given name
But in future we should check if there is a way to get full results from github api.

### Time track

* Aug 18, 2020 5:10 PM  to  Aug 19, 2020 2:30 AM  =  6:50

