"use client";

import { Article } from "@/app/page";
import { ARTICLES_PER_PAGE } from "@/utils/constants";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import style from "../app/page.module.css";

const Articles = ({ articles }: { articles: Article[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"title" | "userName">("title");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortChange = (event: any) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const sortedArticles = articles.sort((a, b) => {
    if (a && b && a.hasOwnProperty(sortOrder) && b.hasOwnProperty(sortOrder)) {
      const aSortValue = a[sortOrder];
      const bSortValue = b[sortOrder];
      if (aSortValue && bSortValue) {
        return aSortValue.localeCompare(bSortValue);
      }
    }
    return 0;
  });

  const filteredArticles = sortedArticles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <div className="container">
      <h1 className={style.heading}>Articles</h1>
      <div className={style.inputSection}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={style.search}
        />
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className={style.sortTitle}
        >
          <option value="title">Title</option>
          <option value="userName">Author</option>
        </select>
      </div>
      <ul className={style.articlesSection}>
        {paginatedArticles.map((article) => (
          <Link key={article.id} href={{ pathname: `/articles/${article.id}` }}>
            <li className={style.article}>
              <h2>{article.title}</h2>
              <p>By: {article.user.name}</p>
              <p>{article.body}</p>
            </li>
          </Link>
        ))}
      </ul>
      <div className={style.paginationSection}>
        {Array.from(
          { length: Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE) },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Articles;
