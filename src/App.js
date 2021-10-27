import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  //state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("book");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=book"
  );
  const [loading, setLoading] = useState(false);

  const fetchNews = function () {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((data) => (setNews(data.hits), setLoading(false)))
      .catch((error) => console.log(error));
  };

  useEffect(
    function () {
      fetchNews();
    },
    [url]
  );

  const handleChange = function (e) {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => loading && <h2>Loading...</h2>;

  const searchForm = function () {
    return (
      <div className="search">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
          ></input>
          <button>Search</button>
        </form>
      </div>
    );
  };

  const showNews = () =>
    news.map(function (n, i) {
      return <p key={i}> {n.title}</p>;
    });

  return (
    <div className="App">
      {showLoading()};<h1>Buzz News</h1>
      {searchForm()}
      {showNews()}
    </div>
  );
}
