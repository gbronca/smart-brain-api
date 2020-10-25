# How to Deploy

1. Install Heroku CLI
2. in terminal type:
   1. `heroku create`
   2. `git push heroku master`
3. Add Heroku Postgres database add-on
4. Check in Heroku CLI if it is connected correctly by typing in terminal: `heroku pg:info`.
5. Connect tot he database by typing `heroku pg:psql`
6. Create the database tables in the server
7. Update `db.connection`

   ```Javascript
   connection: {
       connectionString : process.env.DATABASE_URL,
       ssl: true
   }
    ```
