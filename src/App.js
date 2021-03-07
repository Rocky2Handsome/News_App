import React, { useState, useEffect } from "react";
import "./style.css";
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton} from "react-share";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { button,lightTheme, darkTheme } from "./components/Theme";


const App = () => {
  const [news, setNews] = useState([]);
  const apiKey=([`7e55596312e7463a88fafc09064da1c7`]);
  const [searchQuery, setSearchQuery] = useState(["Trending World Wide"]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState([
    `http://newsapi.org/v2/everything?q=Trending World Wide&sortBy=publishedAt&apiKey=${apiKey}`,
  ]);
  let newapi="7e55596312e7463a88fafc09064da1c7";
 


  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}



  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        
        if(data.articles.length===0){
          alert("No news found. Please check spelling or search something else."); 
        }
        else{
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
      `http://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&apiKey=${apiKey}`
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
      `http://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&apiKey=${apiKey}&pageSize=${morenews}`
    );
    console.log("Successfully Loaded More Articles");
  };

  const changeContent = (value) => {
    setUrl(
      `http://newsapi.org/v2/everything?q=${value}&sortBy=publishedAt&apiKey=${apiKey}`
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

  const changeColor= (color1, color2) =>{
    console.log("waah");
    var allElements = document.getElementsByTagName("*");
    for (var i = 0, len = allElements.length; i < len; i++) {
      var element = allElements[i];
      element.style.background=`linear-gradient(15deg, ${color1} 50%, ${color2} 50.1%) no-repeat fixed`;
    }
  }
  





  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
      <GlobalStyles/>
      <div className="body">
      <button onClick={themeToggler}>Switch Theme</button>
        

          <div className="dropdown">
            <button>Color</button>
            <div className="dropdown-content">
              <button className="btn1" onClick={() => changeColor("#ff6e7f", "#bfe9ff")}>Hodrom</button>
              <button className="btn2" onClick={() => changeColor("lightgreen","#3b8d99")}>Greenary</button>
              <button className="btn3" onClick={() => changeColor("#654ea3", "#eaafc8")}>KeyMeh</button>
              <button className="btn3" onClick={() => changeColor("#659999", "#f4791f")}>Metapolis</button>
              <button className="btn3" onClick={() => changeColor("#2980B9", "#6DD5FA")}>Sky</button>
              <button className="btn3" onClick={() => changeColor("#000000", "#EB5757")}>Darco</button>
            </div>
          </div>
        
          
        <div>
          <div className="heading">
          Latest News<img src="https://www.animatedimages.org/data/media/152/animated-newspaper-image-0007.gif" border="0" alt="animated-newspaper-image-0007" />
          </div>
          
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
                <div className="desc">{n.description}</div>
                <br />
                {n.content}
                <a href={n.url} target="_blank" style={{backgroundColor:"transparent"}}>
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
      </>
    </ThemeProvider>
  );
};

export default App;
