import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const BlogPost = ({ data }) => {
  return (
    <Layout pageTitle={data.strapiPost.title}>
      <img
        class="postcover"
        src={data.strapiPost.cover_img.url}
        alt={`Cover for ${data.strapiPost.title}`}
      />
      <p class="postdate">{data.strapiPost.date}</p>
      <img
        class="postavatar"
        src={data.strapiPost.author.avatar_img.url}
        alt={`Avatar for${data.strapiPost.author.name}`}
      />
      <p class="postauthor">Written by {data.strapiPost.author.name}</p>
      <p class="postcategory">
        <Link to={`/${data.strapiPost.category.slug}`}>
          Category: {data.strapiPost.category.name}
        </Link>
      </p>
      <div
        class="postcontent"
        dangerouslySetInnerHTML={{
          __html: data.strapiPost.content.data.childMarkdownRemark.html,
        }}
      />
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    strapiPost(id: { eq: $id }) {
      author {
        avatar_img {
          url
        }
        name
      }
      category {
        name
        slug
      }
      content {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      cover_img {
        url
      }
      date(formatString: "MMMM D, YYYY")
      description
      slug
      title
    }
  }
`;

export const Head = ({ data }) => (
  <title>{data.strapiPost.title} - Strapi Gatsby Blog Site</title>
);

export default BlogPost;
