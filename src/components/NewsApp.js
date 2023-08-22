import React, { useEffect, useState, useRef } from "react";
import News from "./News";
import "./NewsApp.css" 

function NewsApp() {
  const apiKey = "b1e54f23565347b386d50a0d5e35ed92";

  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState("tesla");


    const apiUrl = 
    `https://newsapi.org/v2/everything?q=${query}&from=2023-06-22&sortBy=publishedAt&apiKey=b1e54f23565347b386d50a0d5e35ed92
`


  const queryInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    
      const response = await fetch(apiUrl);
      const jsonData = await response.json();


      setNewsList(jsonData.articles);
    
      
  }

  function handleSubmit(e) {
    e.preventDefault();
    const queryValue = queryInputRef.current.value;
    setQuery(queryValue);
  }

  return (
    <div className="news-app" >



      <h1 style={{fontFamily:'georgia', fontSize:'4rem', textAlign: 'left', marginBottom: '20px'}} >Daily News Express</h1>
      <form onSubmit={handleSubmit}></form>
        <input className="query-input" type="text" ref={queryInputRef} />
        <input className="btn-submit" onClick={handleSubmit} type="submit" value="Submit" />
      <form/>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 24%)",
          justifyContent: "space-between",
          rowGap: "20px",
        }}>
        {newsList && newsList.map((news) => {
          return <News key={news.url} news={news} />;
        })}
      </div>
    </div>
  );
}

export default NewsApp;
