# GITHUB Repositories Stats
  
## ENV Vars
  
* PORT: The port that this backend should listen to  
* BCRYPT_ROUNDS: How many rounds bcrypt should use  
* JWT_SECRET: A secret password to encrypt JWT  
* MONGO_CONNECTION_STRING: The mongodb connection string  
* GITHUB_API_ENDPOINT: The github api, this is optional there is a default value to "https://api.github.com/"  
* STATS_UPDATE_PERIODICITY: The amount in milliseconds to update the stats, default to 24h  

## GITHub Credentials
*IMPORTANT*  
You should inform a GITHUB_TOKEN in .env file  
It'll upgrade your rate limit from 60 requests per hour to 5000 requests per hour.  

https://developer.github.com/v3/#rate-limiting  
  
https://github.com/settings/tokens  
  
## ADRs  
  
### Database  
  
I would use DynamoDB, but I couldn't use any cloud resources, so the second most performatic option was mongodb.  
  
### Backend  
  
I would use AWS Serverless (sam cli), but I couldn't use any cloud resources, so the second option was a monolith that   is possible to deploy to azure appservice or heroku or build an docker container.  
  
## Technical debts  
  
### Fault tolerance  
  
All processing occurs in run-time in memory without any fault tolerance, even network fail.  
All the pagination process should be stored to database to be possible to continue where it stops  
It would be a good fit a RabbitMQ as well.  
  
### helpers.github.search  
  
The github search api says that results might be incomplete due timeout  
We are not checking if the result are complete or not.  
We exepct that result even if incomplete, it'll return the most popular repositories with given name  
But in future we should check if there is a way to get full results from github api.  
  
### Pagination  
  
Pagination is relying that the last page will be less than 100 items  
Event though if that happens will not produces errors in the system  
because the error handler will only log this to console, it would be good  
to be fixed. Check if there is offical way to paginate on github api or  
check if the last page exists without throwing errors  
  
Pagination is relying only on github, it's not checking the issue/resource number  
If every resource/issue is numbered, it should check it after pagination ends  
If all values has been requested properly  
  
*Fault tolerance* That same issue, if the pagination of a repository fails on middle of it  
It continues on next repository from the first page  
  
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
  
* Git Flow  
* Conventional Commits (feat, fix, refactor, chore, doc, sytle, perf, vendor, test, etc..  
  
### Time track  
  
* Aug 18, 2020 5:10 PM  to  Aug 19, 2020 02:40 AM  =  7:30  
* Aug 19, 2020 5:00 PM  to  Aug 19, 2020 11:49 PM  -  6:49  
---  
* Total: 14:19  
  
## TODO
  
* Add > check if it exists before  
* Unit tests  
