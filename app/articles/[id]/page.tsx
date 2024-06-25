import client from "@/lib/apolloClient";
import { GET_ARTICLE_BY_ID } from "@/graphql/queries";
import { Metadata } from "next";
import { cache } from "react";
import style from "./page.module.css";

type Props = {
  params: { id: string }
}

const getArticle = cache(async (id: string) => {
  // fetch data
  const { data } = await client.query({
    query: GET_ARTICLE_BY_ID,
    variables: {id}
  });

  const article = data.post;
  return article;
});

export async function generateMetadata(
  {params}: Props
): Promise<Metadata> {
  const article = await getArticle(params.id)
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description
    }
  }
}

const ArticlePage = async ({params}: Props) => {
  const { id } = params;
  const article = await getArticle(id)

  return (
    <div className={`container ${style.articleSection}`}>
      <h1>{article.title}</h1>
      <p>By: {article.user.name}</p>
      <p>{article.body}</p>
    </div>
  );
};

export default ArticlePage;
