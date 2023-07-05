import React, { useState, useEffect, useRef } from "react";

const List = () => {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [removeId, setRemoveId] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((albumsData) => setAlbums(albumsData));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const id = parseInt(searchTerm);
      scrollToListItem(id);
      setRemoveId(null);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const scrollToListItem = (id) => {
    const listItem = document.getElementById(`album-${id}`);
    if (listItem) {
      listItem.scrollIntoView({ behavior: "smooth", block: "start" });
      setHighlightedId(id);

      setTimeout(() => {
        setRemoveId(id);
      }, 10000);
    }
  };

  useEffect(() => {
    const listItem = document.getElementById(`album-${highlightedId}`);
    if (listItem) {
      listItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [highlightedId]);

  return (
    <div>
      <h1>Albums List</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Enter ID"
      />

      <div style={{ height: "400px", overflowY: "scroll" }} ref={listRef}>
        {albums.map((album) => {
          if (removeId === album.id) {
            return null;
          }
          return (
            <div
              id={`album-${album.id}`}
              key={album.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                backgroundColor:
                  highlightedId === album.id ? "yellow" : "inherit",
                transition: "background-color 0.3s",
              }}
            >
              <strong>ID:</strong> {album.id}
              <br />
              <strong>User ID:</strong> {album.userId}
              <br />
              <strong>Title:</strong> {album.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
