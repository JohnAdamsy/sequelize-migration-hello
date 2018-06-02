# sequelize-migration-hello
Testing of db migrations and using sequelize models stored in a private npm registry somewhere

## Description
A modified fork from [abelnation](https://github.com/abelnation/sequelize-migration-hello) and with contributions from  [lestoni](https://github.com/lestoni).

A simple web server is provided that allows you to interact with the app at each step
of the way via simple get/post requests with following endpoints:

- `GET  /users`: view all users
- `POST /users`: create a new user
- `GET  /users/dsql`: view sequelize description of users table
- `GET  /users/dpg`: view postgres description of users table


The repo comes with a helper script for executing migration steps: `migrate.js`.  It
supports the following commands:

- `status`: print current migration status
- `up/migrate`: executed all unexecuted migrations
- `down/reset`: revert all executed migrations
- `next/migrate-next`: execute the next pending migration
- `prev/reset-prev`: revert the previous executed migration
- `reset-hard`: reset the database using a `dropdb`/`createdb` postgres command

Execute a command via:

```shell
node ./migrate.js <command>
```

## Full demo flow

```shell
HOST="localhost:9333"
GET="curl -H "Content-Type: application/json" -X GET"
POST="curl -H "Content-Type: application/json" -X POST"

npm install

# start webserver
# will automatically restart when code changes
npm start

git checkout 01-initial
node ./migrate.js up

${GET} ${HOST}/users
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison"}'
${GET} ${HOST}/users
# Not supported yet
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison","eyeColor":"blue"}'

git checkout 02-addCol
node ./migrate.js up

# should see new column with default values
${GET} ${HOST}/users
# old app code still works, new column not yet supported
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison"}'
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison","eyeColor":"blue"}'

git checkout 03-app-support-added
node ./migrate.js up

# both verisons of add should now work
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison"}'
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison","eyeColor":"blue"}'

git checkout 04-lock-down-db
node ./migrate.js up

# both verisons of add should now work, db enforces not null and no default value
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison"}'
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison","eyeColor":"blue"}'

git checkout 05-lock-down-app
node ./migrate.js up

# old version of add now is forbidden
${POST} ${HOST}/users -d '{"firstName":"Abel","lastName":"Allison"}'
```

