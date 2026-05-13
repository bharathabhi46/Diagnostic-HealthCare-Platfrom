import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Alert from "../components/Alert";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { formatCurrency, getErrorMessage } from "../utils/api";

function Home() {
  const [tests, setTests] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const workflow = [
    {
      title: "Select diagnostics",
      description: "Browse available tests and add the required items to cart.",
    },
    {
      title: "Book and assign",
      description: "Orders move through booking, collector assignment, and sample updates.",
    },
    {
      title: "Review reports",
      description: "Reports are uploaded by admins and available from order tracking.",
    },
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [testsRes, articlesRes] = await Promise.all([
          API.get("/tests"),
          API.get("/articles"),
        ]);
        setTests(testsRes.data.slice(0, 3));
        setArticles(articlesRes.data.slice(0, 3));
      } catch (err) {
        setError(getErrorMessage(err, "Unable to load home data"));
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 overflow-hidden rounded-md border border-emerald-100 bg-white p-6 shadow-sm lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Diagnostic healthcare platform
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950 lg:text-5xl">
            Book tests, track samples, and access reports in one place.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            DiagnoCare connects patients, admins, and sample collectors through
            a role-aware workflow for diagnostics and reporting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/tests"
              className="inline-flex min-h-10 items-center rounded-md bg-emerald-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
            >
              Browse tests
            </Link>
            <Link
              to="/articles"
              className="inline-flex min-h-10 items-center rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Read articles
            </Link>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Care workflow
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-950">
                From booking to report
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              Live API
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {workflow.map((item, index) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-md bg-slate-950 p-4 text-white">
            <p className="text-sm font-semibold">Role-aware access</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Patients, admins, and collectors see only the actions relevant to
              their account.
            </p>
          </div>
        </div>
      </section>

      <Alert>{error}</Alert>
      {loading ? <LoadingState label="Loading featured content" /> : null}

      {!loading ? (
        <section>
          <PageHeader
            eyebrow="Diagnostics"
            title="Available tests"
            description="A quick look at active diagnostic tests from the backend."
            actions={
              <Link
                to="/tests"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View all
              </Link>
            }
          />
          {tests.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {tests.map((test) => (
                <article
                  key={test._id}
                  className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase text-emerald-700">
                    {test.category || "Diagnostic"}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">
                    {test.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {test.description || "No description provided."}
                  </p>
                  <p className="mt-4 text-lg font-bold text-slate-900">
                    {formatCurrency(test.price)}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No tests available" />
          )}
        </section>
      ) : null}

      {!loading ? (
        <section>
          <PageHeader
            eyebrow="Health articles"
            title="Latest reads"
            description="Published health articles from the content API."
          />
          {articles.length ? (
            <div className="grid gap-4 md:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article._id}
                  className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase text-emerald-700">
                    {article.category || "Health"}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-950">
                    {article.title}
                  </h2>
                  <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">
                    {article.content}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="No articles published yet" />
          )}
        </section>
      ) : null}
    </div>
  );
}

export default Home;
