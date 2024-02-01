import React, { useState, useRef } from "react";
import "./App.css";

import { useSearchPerson } from "./api";

const convert = (value: string, field: string) => {
  if (["none", "unknown", "n/a"].includes(value)) return "нет данных";
  let result;
  switch (field) {
    case "gender":
      result = value === "male" ? "муж." : "жен.";
      break;
    case "height":
      result = value + " см.";
      break;
    case "mass":
      result = value + " кг.";
      break;
    default:
      result = value;
      break;
  }

  return result;
};

type Key =
  | "gender"
  | "height"
  | "mass"
  | "hair_color"
  | "skin_color"
  | "eye_color";

const OUTPUT_FIELDS: { key: Key; field: string }[] = [
  { key: "gender", field: "Пол" },
  { key: "height", field: "Рост" },
  { key: "mass", field: "Масса" },
  { key: "hair_color", field: "Цвет волос" },
  { key: "skin_color", field: "Цвет кожи" },
  { key: "eye_color", field: "Цвет глаз" },
];

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, fetchData, isLoading } = useSearchPerson();

  const handleSearch = () => {
    if (inputRef.current) inputRef.current.blur();
    if (searchTerm.length > 0 && !isLoading) {
      fetchData(searchTerm);
    } else {
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleResetTerm = () => {
    setSearchTerm("");
    if (inputRef.current) inputRef.current.focus();
  };

  const renderData = () => {
    if (data === null) return null;

    if (data?.length === 0 && !isLoading) return <p>Ничего не найдено</p>;

    return data?.map((el) => (
      <div className={"person-card"}>
        <h2>{el.name}</h2>
        {OUTPUT_FIELDS.map((info) => (
          <p>
            {info.field}: {convert(el[info.key], info.key)}
          </p>
        ))}
        <p>{`Количество фильмов с участием героя: ${el.films.length} шт.`}</p>
      </div>
    ));
  };

  return (
    <>
      {data === null && (
        <img
          className="image-bg"
          src="https://vkplay.ru/hotbox/content_files/Stories/2023/09/20/72f3ecacea2f4634bdee297e6e406f69.jpg"
          alt=""
        ></img>
      )}
      <div className="app">
        <div
          className={`search-area ${
            data === null ? "search-area-d" : "search-area-u"
          }`}
        >
          <div className="search-row">
            <input
              ref={inputRef}
              type="text"
              placeholder="Поиск героев Star Wars, например Luke Skywalker"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {searchTerm && (
              <div className="search-buttons">
                <button onClick={handleResetTerm}>X</button>
                <button onClick={handleSearch}>Найти</button>
              </div>
            )}
            {isLoading && (
              <div className="search-state">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}
          </div>
        </div>
        <div className="search-result">{renderData()}</div>
      </div>
    </>
  );
}

export default App;
