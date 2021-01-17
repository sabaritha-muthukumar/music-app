import React, { useEffect, useState } from "react";
import Music from "./Music";
import "./App.css";
function App() {
  const [musices, setMusices] = useState([]);
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState("kadhaippoma");

  useEffect(() => {
    getMusic();
  }, [songs]);

  const getMusic = async (next) => {
    const result = await fetch(
      next
        ? next
        : `https://deezerdevs-deezer.p.rapidapi.com/search?q=${songs}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key":
            "16ec038e81mshdbba1e2f8e743e3p1b1f13jsnf616e68af534",
        },
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
    console.log("result", result);
    setMusices(result);
  };
  const searchButton = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setSongs(search);
    // setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={searchButton}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="music">
        {musices.data
          ? musices.data.map((music) => (
              <Music
                key={music.id}
                preview={music.preview}
                title={music.title}
                image={music.album.cover}
                albumtitle={music.album.title}
              />
            ))
          : null}
      </div>
      {musices.next ? (
        <button onClick={() => getMusic(musices.next)}>next</button>
      ) : null}
      {musices.prev ? (
        <button onClick={() => getMusic(musices.prev)}>prev</button>
      ) : null}
    </div>
  );
}

export default App;
