import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page not found | HelloProperties";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <>
      <Header />
    <main className="hp-not-found" aria-labelledby="not-found-title">
      <div className="hp-not-found-copy">
        <p className="hp-not-found-code">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p className="hp-not-found-description">
          This link is no longer available, or the address is incorrect.
          Head home or explore our properties to find your next place.
        </p>
        <div className="hp-not-found-actions">
          <Link to="/" className="hp-not-found-home">Go home</Link>
          <Link to="/properties" className="hp-not-found-browse">
            View properties <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}
