# Building & Deploying a Static Blog with Gatsby and Strapi for Free

Strapi is a headless Content Management System (CMS) that will function as the backend to our blog. You can login to Strapi through an Admin panel and add all of your blog post, author and category content. Strapi then makes this content data available through an API that you can grab with the frontend of your choice.

Gatsby is a frontend React framework that we will use to query the Strapi content with GraphQL. Gatsby is a static site generator and will use this content to build out a series of webpages including all of the blog posts.

We will investigate free options to deploy both Strapi and Gatsby with online services so that users can add content and view the final blog.

## Deploy Gatsby to Cloudflare

### Build Project

We first need to use Gatsby to build the actual HTML, JS and CSS files that will be deployed. To do this, from the `frontend` folder run:

```text
npm run build
```

### Deploy Blog

You will need to create an account and login to [Cloudflare](https://www.cloudflare.com/).

Next add the `wrangler` Cloudflare command line tool from the `frontend` folder:

```text
npm install wrangler --save-dev
```

Wrangler will allow you to now push your blog files up to Cloudflare by running:

```text
npx wrangler pages deploy public
```

This will deploy the project files in the `public` folder that you just built and push them up to the Cloudflare Pages service. You may need to grant access to Wrangler to your Cloudflare account in a pop-up window.

Give the project a name and select the production branch to complete deployment.

Now your blog should be hosted by Cloudflare for free and publicly accessible on the internet. You can also hook up a custom URL if you own a domain.
