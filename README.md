# Building & Deploying a Static Blog with Gatsby and Strapi for Free

Strapi is a headless Content Management System (CMS) that will function as the backend to our blog. You can login to Strapi through an Admin panel and add all of your blog post, author and category content. Strapi then makes this content data available through an API that you can grab with the frontend of your choice.

Gatsby is a frontend React framework that we will use to query the Strapi content with GraphQL. Gatsby is a static site generator and will use this content to build out a series of webpages including all of the blog posts.

We will investigate free options to deploy both Strapi and Gatsby with online services so that users can add content and view the final blog.

## Update to PostgreSQL Database

### Test Migrate Data

Use Strapi's [Data Transfer](https://docs.strapi.io/dev-docs/data-management/transfer) ability to migrate data from local SQLite db to deployed SQLite db.

1. On deployed instance: Settings > Transfer Tokens: + create transfer token. Add name, duration, token type: push (to push from local to remote)
2. Save token
3. `npm run strapi transfer -- --to http://deployUrl/admin`
4. paste token, agree to proceed

After 15 minutes of inactivity, reload deployed instance and notice it hangs. This is cold start because we're using free tier. Need to wait ~1 min to wake up server.

### Using Postgres db

While the data migration does work, the SQLite on the deployed instance isn't persistent because we're using the free-tier on Render. After 15 minutes of inactivity, Render will shut down the Strapi server and the disk storage (including SQLite db) is lost.

Solution is to use a persistent (and free) postgres db hosted somewhere else. In this tutorial we will use [Neon](https://neon.tech/) as our database provider.

1. Create account at Neon
2. Create db-migration branch for new edits (will push to main & trigger rebuilds on Render)
3. Change Render branch to db-migration
4. Install postgres `npm i pg`
5. Install [Strapi neon tech db plugin](https://market.strapi.io/plugins/strapi-neon-tech-db-branches) `npm i strapi-neon-tech-db-branches`
6. Generate Neon api key from above link and add variables to .env file: `NEON_API_KEY, NEON_PROJECT_NAME, NEON_ROLE, GIT_BRANCH`.
   - Use `GIT_BRANCH=main`. Any name would work; we're not using Neon's db branching feature for different development/staging/production environments
7. Add env vars to Render > Environment
8. On deployed instance generate new transfer token
9. Switch locally to main branch that maintains connection to SQLite db
10. `npm run strapi transfer -- --to http://deployUrl/admin` to push data from SQLite db up to deployed instance with postgres db.
