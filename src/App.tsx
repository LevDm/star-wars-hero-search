import React, { useState } from "react";
import "./App.css";

import { useSearchPerson } from "./api";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, fetchData } = useSearchPerson();

  const handleSearch = () => {
    fetchData(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {data ? (
        data.map((el) => (
          <div>
            <h2>{el.name}</h2>
            <p>Height: {el.height}</p>
            <p>Mass: {el.mass}</p>
            <p>Hair Color: {el.hair_color}</p>
            <p>Skin Color: {el.skin_color}</p>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default App;
