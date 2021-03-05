import React, { useState, useEffect } from "react";
import "./style.css";
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton} from "react-share";
let lang= "en";

const App = () => {
  const [news, setNews] = useState([]);
  var apiKey = `db01e884d61f4f908c66f1200c039fc4`;
  const [searchQuery, setSearchQuery] = useState(["Trending World Wide"]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState([
    `http://newsapi.org/v2/everything?q=Trending World Wide&language=${lang}&sortBy=publishedAt&apiKey=${apiKey}`,
  ]);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        if(data.articles.length===0){
          alert("No news found. Please check spelling or search something else."); 
        }
        else{
        console.log(data);
        setNews(data.articles); 
        setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchQuery.trim()){
      alert("Please Enter Somthing to search");
    }
    
    else{
   setUrl(
      `http://newsapi.org/v2/everything?q=${searchQuery}&language=en&sortBy=publishedAt&apiKey=${apiKey}`
    );}
  };

  const showLoading = () => (loading ? <h2> Loading.... </h2> : "");

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <button>Search</button>
      <input type="text" value={searchQuery} onChange={handleChange} />
      

      <div className="topnav" id="myTopnav">
        <a className="btn" onClick={() => changeContent("Trending World News")}>Home</a>
        <a className="btn" onClick={() => changeContent("Sports")}>Sports</a>
        <a className="btn" onClick={() => changeContent("World")}>World</a>
        <a className="btn" onClick={() => changeContent("Tech")}>Tech</a>
        
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

  // const activeClass = ()=> {
  //   var header = document.getElementById("myTopnav");
  //   var btns = header.getElementsByClassName("btn");
  //   for (var i = 0; i < btns.length; i++) {
  //     console.log(btns);
  //     btns[i].addEventListener("click", function() {
  //     var current = document.getElementsByClassName("active");
  //     current[0].className = current[0].className.replace(" active", "");
  //     this.className += " active";
  //     });
  //   }
  // };

  const changeLang = (bhasha) => {
    setUrl(
      `http://newsapi.org/v2/everything?q=${searchQuery}&language=${bhasha}&sortBy=publishedAt&apiKey=${apiKey}`
    );
    console.log(bhasha,url);
  }





  return (
    <div className="body">
        <div className="dropdown">
          <button className="dropbtn">Country</button>
            <div className="dropdown-content">
              <a >India</a>
              <a href="#">USA</a>
              <a href="#">China</a>
            </div>
        </div>
      <div className="dropdown">
        <button className="dropbtn">Language</button>
          <div className="dropdown-content">
            <a onClick={() => changeLang("en")}>English</a>
            <a onClick={() => changeLang("hi")}>Hindi</a>
            <a onClick={() => changeLang("fr")}>France</a>
          </div>
      </div>
      <div className="heading">
        Latest News
        <div className="social">
        <FacebookShareButton url={url} className="share">
         <i className="fa fa-facebook"></i>
        </FacebookShareButton><br />
        <TwitterShareButton url={url} className="share">
        <i className="fa fa-twitter"></i>
        </TwitterShareButton><br />
        <WhatsappShareButton url={url} className="share">
        <i className="fa fa-whatsapp"></i>
        </WhatsappShareButton><br />
        </div>
        <div className="search">{searchForm()}</div>
      </div>

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
              <div className="desc">{n.description.toString()}</div>
              <br />
              {n.content.toString()}
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
