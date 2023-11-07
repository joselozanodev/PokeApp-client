import React, { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./detail.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removePokemon, setCurrentPage } from "../../redux/pokemonSlice";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pokeDetail, setPokeDetail] = useState([]);
  const [types, setTypes] = useState([]);
  const pokedex = useSelector((state) => state.pokemon.pokedex);
  const pokemon = pokedex.find((pokemon) => pokemon.pokemonId === id);
  const pokemonByName = pokedex.find((pokemon) => pokemon.pokemonName === id);
  const pokemonTypesByName = pokemonByName?.pokemonTypes
  const pokemonName = pokeDetail.name;

  const handleDelete = async(event)=>{
    event.preventDefault();
    try {
      const { data } = await axios.delete(`http://localhost:3001/pokemon/${pokemonName}`);
      if(data === 'Pokemon Deleted Successfully'){
        dispatch(removePokemon(pokemonName))
        dispatch(setCurrentPage(1));
        navigate('/home');
        alert('Pokemon deleted successfully');
      }
    } catch (error) {
      console.log(error.response.data)
      alert('Pokemon not deleted')
    }
  }

  const handleImageError = ({ target }) => {
    target.src = "https://m.media-amazon.com/images/I/71WkWKFRSWL.png";
  };

   useEffect(() => {
    async function fetchData() {
      if(typeof id === 'string' && !id.includes('-')){
        const response = await axios.get(`http://localhost:3001/pokemon/search?name=${id}`);
        setPokeDetail(response.data);
        setTypes(pokemonTypesByName);
        return;
      }
      const response = await axios.get(`http://localhost:3001/pokemon/${id}`);
      setPokeDetail(response.data);
      setTypes(pokemon?.pokemonTypes);
    }
    fetchData();
  }, [id]); 

  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const hrBorderStyle = {
    border: `3px solid ${
      typeColors[
        pokeDetail.types
          ? pokeDetail.types[0].type.name.toLowerCase()
          : pokemonTypesByName?pokemonTypesByName[0].toLowerCase():types?.[0]
      ]
    }`,
  };
  const borderStyle = {
    border: `3px solid ${
      typeColors[
        pokeDetail.types
          ? pokeDetail.types[0].type.name.toLowerCase()
          : pokemonTypesByName?pokemonTypesByName[0].toLowerCase():types?.[0]
      ]
    }`,
  };
  const backgroundStyle = {
    backgroundColor: `${
      typeColors[
        pokeDetail.types
          ? pokeDetail.types[0].type.name.toLowerCase()
          : pokemonTypesByName?pokemonTypesByName[0].toLowerCase():types?.[0]
      ]
    }`,
  };

  return (
    <>
      <div className="background-detail">
        <div className="detail-container" style={borderStyle}>
          {pokeDetail.sprites &&
            pokeDetail.sprites.other.home.front_default && (
              <img
                src={pokeDetail.sprites.other.home.front_default}
                alt={pokeDetail.name}
                className="pokemon-image"
              />
            )}
          {pokeDetail.image && (
            <img
              src={pokeDetail.image}
              alt={pokeDetail.name}
              onError={handleImageError}
              className="pokemon-image"
            />
          )}

          <h2 className="pokemon-name">{pokeDetail.name}</h2>
          <hr style={hrBorderStyle} />
          <div className="pokemon-types">
            {pokeDetail.types &&
              pokeDetail.types.map((type, index) => {
                return (
                  <p
                    key={index}
                    className="pokemon-type"
                    style={backgroundStyle}
                  >
                    {type.type.name.toUpperCase()}
                  </p>
                );
              })}
            {types &&
              types.map((type, index) => {
                return (
                  <p
                    key={index}
                    className="pokemon-type"
                    style={backgroundStyle}
                  >
                    {type}
                  </p>
                );
              })}
          </div>

          {pokeDetail.weight && (
            <p className="pokemon-weight" style={backgroundStyle}>
            WEIGHT: {pokeDetail.weight}
          </p>)
          }
          { pokeDetail.height &&(
            <p className="pokemon-height" style={backgroundStyle}>
            HEIGHT: {pokeDetail.height}
          </p>)
          }

          {pokeDetail.stats &&
            pokeDetail.stats.map((stat, index) => {
              return (
                <p
                  key={index}
                  className={`pokemon-stat ${stat.stat.name}`}
                  style={backgroundStyle}
                >
                  {stat.stat.name.toUpperCase()}: {stat.base_stat} 
                </p>
              );
            })}
          {!pokeDetail.stats && (
            <div className="created-stats">
              <p className="pokemon-stat hp" style={backgroundStyle}>
                {pokeDetail.hp} hp
              </p>
              <p className="pokemon-stat attack" style={backgroundStyle}>
                ATTACK: {pokeDetail.attack}
              </p>
              <p className="pokemon-stat defense" style={backgroundStyle}>
                DEFENSE: {pokeDetail.defense}
              </p>
              { pokeDetail.speed &&(
              <p className="pokemon-stat speed" style={backgroundStyle}>
                SPEED: {pokeDetail.speed}
              </p>)}
            </div>
          )}

          <div className="pokemon-abilities">
            {pokeDetail.abilities &&
              pokeDetail.abilities.map((ability, index) => {
                return (
                  <p
                    key={index}
                    className="pokemon-ability"
                    style={backgroundStyle}
                  >
                    {ability.ability.name.toUpperCase()}
                  </p>
                );
              })}
          </div>
        {
          pokemon?.pokemonCreated
          ? <button className="delete-btn" onClick={handleDelete}>Delete</button>
          : pokemonByName && <button className="delete-btn" onClick={handleDelete}>Delete</button>
        }
        {
          pokemon?.pokemonCreated
          ? <Link to={`/edit/${pokemonName}`}><button className="update-btn">Edit</button></Link>
          : pokemonByName &&  <Link to={`/edit/${pokemonName}`}><button className="update-btn">Edit</button></Link>
        }
        </div>
      </div>
    </>
  );
};
export default Detail;
