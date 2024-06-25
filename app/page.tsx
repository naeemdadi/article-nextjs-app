import "./page.module.css";
import { GET_ARTICLES } from "@/graphql/queries";
import Articles from "@/components/Articles";
import client from "@/lib/apolloClient";

export interface Article {
  id: string;
  title: string;
  body: string;
  userName?: string;
  user: {
    id: string;
    name: string;
  };
}

async function getData() {
  // SSG
  return client.query({
    query: GET_ARTICLES
  });
}

const HomePage = async () => {
  try {
    const response = await getData();

    let articles: Article[] = response.data.posts.data;
  
    // Adding user name for sorting
    articles = articles.map(article => ({...article, userName: article.user.name }))

    return (
      <Articles articles={articles}  />
    );

  } catch (err: any) {
    return <div>Error: {err.message || "Server error"}</div>;
  }
};

export default HomePage;
