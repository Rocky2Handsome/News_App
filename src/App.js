import React, { useState, useEffect } from "react";
import "./style.css";

const App = () => {
  const [news, setNews] = useState([]);
  var apiKey = `db01e884d61f4f908c66f1200c039fc4                                                                                                `;
  const [searchQuery, setSearchQuery] = useState(["Trending"]);
  const [loading, setLoading] = useState(false);
  //const [url, setUrl] = useState([`http://api.mediastack.com/v1/news?access_key=c35fdbfb0c5a2e16c400bbd2dbd3bca5&keywords=spiderman&sort=published_desc&limit=50&languages=en`])
  const [url, setUrl] = useState([
    `http://newsapi.org/v2/everything?q=Trending&language=en&sortBy=publishedAt&apiKey=${apiKey}`,
  ]);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNews(data.articles);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    //console.clear();
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //setUrl(`api.mediastack.com/v1/news?access_key=${apiKey}&keywords=${searchQuery}&sort=published_desc&limit=50`)
    setUrl(
      `http://newsapi.org/v2/everything?q=${searchQuery}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    );
  };

  const showLoading = () => (loading ? <h2> Loading.... </h2> : "");

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <button>Search</button>
      <input type="text" value={searchQuery} onChange={handleChange} />

      <div className="topnav" id="myTopnav">
        <a className="active">Home</a>
        <a onClick={() => changeContent("Sports")}>Sports</a>
        <a onClick={() => changeContent("World")}>World</a>
        <a onClick={() => changeContent("Tech")}>Tech</a>
        <a className="icon" onClick={myFunction}>
          <i className="fa fa-bars"></i>
        </a>
      </div>
    </form>
  );

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  let morenews = 40;
  const handleSubmit2 = (e) => {  
    morenews += 20;
    e.preventDefault();
    setUrl(
      `http://newsapi.org/v2/everything?q=${searchQuery}&language=en&sortBy=publishedAt&apiKey=${apiKey}&pageSize=${morenews}`
    );
    console.log("More Articles Loaded");
  };

  const changeContent = (value) => {
    setUrl(
      `http://newsapi.org/v2/everything?q=${value}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    );
    setSearchQuery(value);
  };

  return (
    <div className="body">
      <h2 className="heading">
        Latest News
        <div className="search">{searchForm()}</div>
      </h2>
      <div className="loading">{showLoading()}</div>
      <div className={`content ${loading ? "hide" : ""}`}>
        {news.map((n, i) => {
          let date = new Date(n.publishedAt).toLocaleDateString("en-IN");
          return (
            <div className="data"  key={i}>
              <div className="title">{n.title}</div> <br />
              By: {n.author} <br />
              On: {date} <br />
              <img src={n.urlToImage} />
              <br />
              <div className="desc">{n.description}</div>
              <br />
              {n.content}
              <a href={n.url} target="_blank">
                Read More
              </a>
              <br />
              <hr></hr>
          </div>
          );
        })}
      </div>
      
      <div className={`load ${loading ? "hide" : ""}`} >
        <form onSubmit={handleSubmit2}>
          <input className="loadMore"
            type="submit"
            value="Load More Articles"/>
        </form>
        <br />
      </div>

      <div className={`${loading ? "hide" : ""}`} >
        <p className="footer">Designed and created by <a href="https://allaboutshivapandey.web.app/" target="_blank">Shiva Pandey</a></p>
        </div>
    </div>
  );
};

export default App;
