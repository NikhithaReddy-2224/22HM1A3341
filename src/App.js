import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);

  // function to create short url
  const handleShorten = () => {
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL (http/https)");
      return;
    }

    const code = Math.random().toString(36).substring(2, 8); // random 6-char code
    const shortUrl = `http://short.ly/${code}`;

    const newEntry = {
      original: url,
      short: shortUrl,
      clicks: 0,
    };

    setShortUrls([newEntry, ...shortUrls]);
    setUrl(""); // clear input
  };

  // function to simulate opening
  const handleOpen = (index) => {
    const newList = [...shortUrls];
    newList[index].clicks += 1;
    setShortUrls(newList);

    window.open(newList[index].original, "_blank");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🔗 URL Shortener</h1>
      <input
        type="text"
        value={url}
        placeholder="Enter URL (https://example.com)"
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleShorten} style={{ padding: "8px 16px" }}>
        Shorten
      </button>

      <h2 style={{ marginTop: "20px" }}>Shortened URLs</h2>
      {shortUrls.length === 0 && <p>No links yet.</p>}

      <ul>
        {shortUrls.map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <b>{item.short}</b> → {item.original} <br />
            Clicks: {item.clicks}{" "}
            <button onClick={() => handleOpen(index)} style={{ marginLeft: "10px" }}>
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
