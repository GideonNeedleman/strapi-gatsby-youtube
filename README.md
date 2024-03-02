# Building & Deploying a Static Blog with Gatsby and Strapi for Free

Strapi is a headless Content Management System (CMS) that will function as the backend to our blog. You can login to Strapi through an Admin panel and add all of your blog post, author and category content. Strapi then makes this content data available through an API that you can grab with the frontend of your choice.

Gatsby is a frontend React framework that we will use to query the Strapi content with GraphQL. Gatsby is a static site generator and will use this content to build out a series of webpages including all of the blog posts.

We will investigate free options to deploy both Strapi and Gatsby with online services so that users can add content and view the final blog.

## Setting up Strapi

We start by following this [Strapi tutorial](https://strapi.io/blog/how-to-build-a-static-blog-with-gatsby-and-strapi) with some modifications.

### Setup your repository

Begin by creating a GitHub repo and cloning it on your machine. Our monorepo will hold both the frontend Gatsby application as well as the backend Strapi application.

### Create Strapi App

Inside your repo folder run the following command to create your strapi app:

```text
npx create-strapi-app@latest backend
```

Choose `quickstart` to setup Strapi with an SQLite database.

### Create Admin User

Once Strapi is installed, the local development server should start and a webpage automatically open up with a prompt to create your Admin account.

You can also manually open this page by first running the Strapi development server with the command `npm run develop` and then navigating your browser to `http://localhost:1337/admin `

### Adding Content

Follow the steps in the [Strapi tutorial](https://strapi.io/blog/how-to-build-a-static-blog-with-gatsby-and-strapi) to build out your content.

You will begin by creating your content types: `post`, `category`& `author`. You create these by selecting the different data fields each content type will contain, including relation fields that connect them together. These schema will be stored within the Strapi code, while the actual content will be stored in a database.

When building the `post` content type in Strapi v4, make sure you use the `Rich Text (Markdown)` option and not the `Rich Text (Blocks)` option. Strapi v4 has added the new Blocks option, however all the content for the blog posts will be written in Markdown.

To add the content, copy and paste data [located here](https://hackmd.io/0bV-6UU4RlKc-_DRg-eGzg). I suggest you press the pencil button on the top left to enter markdown mode to enable easier copy & pasting.

### API Permissions

You will need to now allow access to the API for querying records. This will make it possible for Gatsby to consume the Strapi data.

Go to `Settings > Roles > Public` and check `find` and `findOne` for `post`, `author` & `category`.

Next under `Content types builder` check `Select all` for both `Components` and `Content-Types`.

Finally save. Now any unauthenticated, public user can query Strapi for your content data.

### GraphQL Plugin

To [install the GraphQL plugin](https://market.strapi.io/plugins/@strapi-plugin-graphql) run `npm install @strapi/plugin-graphql` inside your `backend` folder.

Now when you run your Strapi server, you can go to `http://localhost:1337/graphql` to access the graphql playground and experiment with running queries.
