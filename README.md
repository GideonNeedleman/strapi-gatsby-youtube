# Building & Deploying a Static Blog with Gatsby and Strapi for Free

Strapi is a headless Content Management System (CMS) that will function as the backend to our blog. You can login to Strapi through an Admin panel and add all of your blog post, author and category content. Strapi then makes this content data available through an API that you can grab with the frontend of your choice.

Gatsby is a frontend React framework that we will use to query the Strapi content with GraphQL. Gatsby is a static site generator and will use this content to build out a series of webpages including all of the blog posts.

We will investigate free options to deploy both Strapi and Gatsby with online services so that users can add content and view the final blog.

## Setup Gatsby

Navigate to root of the project folder and install the Gatsby app with:

```text
npm init gatsby
```

- Choose a name for your site and
- Name the folder for your site `frontend`.
- Choose `JavaScript`
- For the CMS choose `No (or I'll add it later)`
- For the styling system choose `No (or I'll add it later)`
- Don't select any additional features and choose `Done`
- Finally select `Yes` to build the Gatsby app.

### Install `gatsby-source-strapi` Plugin

Gatsby works with a series of source plugins to connect to various sources of data and has one specifically to connect to Strapi.

Navigate to the `frontend` folder and run:

```text
npm install --save gatsby-source-strapi gatsby-transformer-remark
```

This will install the `gatsby-source-strapi` plugin that allows Gatsby to consume Strapi API data and also installs the `gatsby-transformer-remark` plugin that transforms the markdown content we authored into HTML code.

## Edit `gatsby-config.js`

Any plugins you install need to be added to the `gatsby-config.js` file to be registered and sometimes the plugins can accept different types of options. Replace the current contents of `gatsby-config.js` with:

```js
//gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL || "http://127.0.0.1:1337",
  collectionTypes: ["post", "category", "author"],
};

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    "gatsby-transformer-remark",
  ],
};
```

You'll also need to create a `.env.development` file inside the `frontend` folder and add the following variable:

```text
STRAPI_API_URL=http://127.0.0.1:1337
```

### Test Strapi API

Run the Gatsby app by navigating to the `frontend` folder and running `npm run develop`.

Next visit `http://localhost:8000/___graphql` in your browser to open the Gatsby GraphiQL Playground. Here you can build and test graphql queries on all the of data that Gatsby is able to consume.

### Add Gatsby Code

Now we will build out the actual website pages in Gatsby. Copy and paste the code found in the [Strapi tutorial](https://strapi.io/blog/how-to-build-a-static-blog-with-gatsby-and-strapi) to create the Layout component, Home Page, Post Page and Category Page. Also add the `layout.css` file and import it into the `Layout.js` component with `import "./layout.css"`

The graphql queries on the different pages and components will fetch data from the local Strapi development server and use it to dynamically generate the pages of your website. Note that the Strapi server must be running when you run Gatsby's `npm run develop` command, otherwise Gatsby won't be able to fetch this data.
