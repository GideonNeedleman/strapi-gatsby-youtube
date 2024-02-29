// src/pages/index.js
import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const IndexPage = ({ data }) => {
  return (
    <Layout pageTitle="Home Page">
      <ul class="postlist">
        {data.allStrapiPost.nodes.map((node) => (
          <li key={node.id}>
            <Link class="postlink" to={`/${node.slug}`}>
              <h3>{node.title}</h3>
            </Link>
            <div class="image-wrap">
              <img
                class="cover"
                src={`${node.cover_img.url}`}
                alt={`Cover for ${node.title}`}
              />
              <img
                class="avatar"
                src={`${node.author.avatar_img.url}`}
                alt={`Avatar for${node.author.name}`}
              />
            </div>
            <p class="date">{node.date}</p>
            <p class="name">Written by {node.author.name}</p>
            <p class="postcategory">
              <Link to={`/${node.category.slug}`}>
                Category: {node.category.name}
              </Link>
            </p>
            <p class="description">{node.description}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allStrapiPost(sort: { date: DESC }) {
      nodes {
        author {
          avatar_img {
            url
          }
          name
        }
        cover_img {
          url
        }
        date(formatString: "MMMM D, YYYY")
        description
        id
        slug
        title
        category {
          name
          slug
        }
      }
    }
  }
`;

export const Head = () => <title>Home Page - Strapi Gatsby Blog</title>;

export default IndexPage;
