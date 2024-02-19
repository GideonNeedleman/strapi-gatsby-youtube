import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const Category = ({ data }) => {
  return (
    <Layout pageTitle={data.strapiCategory.name}>
      <ul class="postlist">
        {data.strapiCategory.posts.map((post) => (
          <li key={post.id}>
            <Link class="postlink" to={`/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
            <div class="image-wrap">
              <img
                class="cover"
                src={post.cover}
                alt={`Cover for ${post.title}`}
              />
              <img
                class="avatar"
                src={post.author.avatar}
                alt={`Avatar for${post.author.name}`}
              />
            </div>
            <p class="date">{post.date}</p>
            <p class="name">Written by {post.author.name}</p>
            <p class="description">{post.description}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    strapiCategory(id: { eq: $id }) {
      posts {
        author {
          avatar
          name
        }
        cover
        date(formatString: "MMMM D, YYYY")
        description
        slug
        title
        id
      }
      name
      id
      slug
    }
  }
`;

export const Head = ({ data }) => (
  <title>{data.strapiCategory.name} - Strapi Gatsby Blog Site</title>
);

export default Category;
