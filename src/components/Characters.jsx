import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect, useReducer } from "react";
import "../styles/Characters.css";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleClick = favorite => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  return (
    <div className="characters">
        <h3>MIS FAVORITOS</h3>
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}
      
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          {characters.map((character) => (
            <div className="our-team" key={character.id}>
              <div className="picture">
                <img className="img-fluid" src={character.image} />
              </div>
              <div className="team-content">
                <h3 className="name">{character.name}</h3>
                <h4 className="title">{character.status}</h4>
                <h4 className="title">{character.id}</h4>
                <button
                  type="button"
                  onClick={() => handleClick(character)}
                >
                  Agregar a Favoritos
                </button>
              </div>
              <ul className="social">
                <li>
                  <a
                    href="#"
                    className="fa fa-facebook"
                    aria-hidden="true"
                    target="_blank"
                  ></a>
                </li>
                <li>
                  <a href="#" className="fa fa-twitter" aria-hidden="true"></a>
                </li>
                <li>
                  <a
                    href="#"
                    className="fa fa-google-plus"
                    aria-hidden="true"
                  ></a>
                </li>
                <li>
                  <a href="#" className="fa fa-linkedin" aria-hidden="true"></a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;