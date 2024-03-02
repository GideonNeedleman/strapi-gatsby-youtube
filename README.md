# Building & Deploying a Static Blog with Gatsby and Strapi for Free

Strapi is a headless Content Management System (CMS) that will function as the backend to our blog. You can login to Strapi through an Admin panel and add all of your blog post, author and category content. Strapi then makes this content data available through an API that you can grab with the frontend of your choice.

Gatsby is a frontend React framework that we will use to query the Strapi content with GraphQL. Gatsby is a static site generator and will use this content to build out a series of webpages including all of the blog posts.

We will investigate free options to deploy both Strapi and Gatsby with online services so that users can add content and view the final blog.

## Install Cloudinary Plugin

Currently author avatar and post cover images are hosted on another website and we add links to those images in our content. This means we are using someone else's images and not our own. Strapi has a plugin that lets us use Cloudinary to upload and host our own media and files.

### Install Plugin

Follow the [instructions here](https://market.strapi.io/providers/@strapi-provider-upload-cloudinary) to install the Cloudinary plugin.

From the `backend` folder run:

```text
npm install @strapi/provider-upload-cloudinary
```

Now in the `./config/plugins.js` folder configure the plugin by pasting in the following code:

```js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
```

And update the `./config/middlewares.js` file by replacing the `strapi::security` entry with the following object:

```js
{
  name: 'strapi::security',
  config: {
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'connect-src': ["'self'", 'https:'],
        'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
        'media-src': [
          "'self'",
          'data:',
          'blob:',
          'market-assets.strapi.io',
          'res.cloudinary.com',
        ],
        upgradeInsecureRequests: null,
      },
    },
  },
},
```

Finally you will need to create a `.env` file in the `backend` folder to hold the `CLOUDINARY_NAME`, `CLOUDINARY_KEY` and `CLOUDINARY_SECRET` variables referenced in `plugins.js`

These values are found in you Cloudinary account.

### Login to Cloudinary account

Go to [Cloudinary](https://cloudinary.com/), create an account and login.

Navigate to the `Dashboard` to find all your API information. Copy and paste these values into your Strapi `.env` file to finish connecting Strapi with your Cloudinary account.

### Edit Content Types & Add Media

You can now use the `media` data type inside Strapi to upload images automatically to Cloudinary.

Replace the text fields currently used to hold the URLs for author avatar and post cover with media data type (single media). You can upload new images for the avatars & covers by either dragging & dropping image files onto the media data field, or you can add the images from a URL.

### Update Gatsby Code

Now we need to update the graphql queries in our Gatsby code to grab the newly uploaded image urls. By experimenting around with the GraphiQL playground, you can see that you can query for the new image urls using a format like:

```js
allStrapiPost {
  nodes {
    author {
      avatar_img {
        url
      }
    }
  }
}
```

Where `avatar_img` is the name of the new avatar image data type. Cover images would follow the same pattern.

So you need to update your graphql query strings with the new syntax and then update any places in your code where your `<img>` tags referenced the old url query. For example:

```html
<img src="{`${node.avatar}`}" />
```

Should become

```html
<img src="{`${node.avatar_img.url}`}" />
```

When the code for all your pages and components are updated correctly, then your Gatsby blog should now display the images that are hosted on Cloudinary. You can verify by right-clicking on a blog image, opening it in a new tab, and inspecting the source URL. It should be coming from a Cloudinary domain.
