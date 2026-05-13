import { useEffect, useState } from "react";
import API from "../api/axios";
import Alert from "../components/Alert";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { formatDate, getErrorMessage } from "../utils/api";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await API.get("/articles");
        setArticles(res.data);
      } catch (err) {
        setError(getErrorMessage(err, "Unable to load articles"));
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Education"
        title="Health articles"
        description="Published healthcare guidance and diagnostic awareness content."
      />

      <div className="mb-4">
        <Alert>{error}</Alert>
      </div>

      {loading ? <LoadingState label="Loading articles" /> : null}

      {!loading && !articles.length ? (
        <EmptyState
          title="No articles published"
          message="Admin-created articles will appear here."
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {articles.map((article) => (
          <article
            key={article._id}
            className="rounded-md border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase text-emerald-700">
              {article.category || "Health"}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              {article.title}
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              {formatDate(article.createdAt)}
            </p>
            <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700">
              {article.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Articles;
