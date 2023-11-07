import React, { useEffect } from "react";
import "./form.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, setCurrentPage} from "../../redux/pokemonSlice";
import { validateForm } from "./validateForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const [errors, setErrors] = useState({});
  const types = useSelector((state) => state.pokemon.types)
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const fieldErrors = validateForm({
      ...pokemon,
      [target.name]: target.value,
    });

    
      setPokemon({
        ...pokemon,
        [target.name]: target.value,
      });
    

    setErrors({
      ...errors,
      [target.name]: fieldErrors[target.name],
    });
  };

  const handleTypes = ({ target }) => {
    const type = target.value;
    if (target.checked) {
      if (selectedTypes.length < 2) { // Verifica si ya se han seleccionado 2 tipos
        setSelectedTypes([...selectedTypes, type]);
      }
    } else {
      setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(selectedTypes.length === 0){
      alert('You must select at least one type')
      return
    }
    try {
      const pokemon = {
        name: event.target.name.value,
        image: event.target.image.value,
        hp: event.target.hp.value,
        attack: event.target.attack.value,
        defense: event.target.defense.value,
        speed: event.target.speed.value,
        height: event.target.height.value,
        weight: event.target.weight.value,
        types: selectedTypes,
      }
      const pokemonRedux = {
        pokemonName: event.target.name.value,
        pokemonSprite: { front_default: event.target.image.value },
        pokemonStats: [
          event.target.hp.value,
          event.target.attack.value,
          event.target.defense.value,
          event.target.speed.value,
        ],
        pokemonHeight: event.target.height.value,
        pokemonWeight: event.target.weight.value,
        pokemonTypes: selectedTypes,
        pokemonCreated: true,
      };
      const response = await axios.post(
        "http://localhost:3001/pokemon",
        pokemon
      );
      if (response) {
        dispatch(addPokemon(pokemonRedux));
        alert("Pokemon created");
        navigate("/home");
        dispatch(setCurrentPage(1));
      }
    } catch (error) {
      console.log(error.response.data);
      alert("Pokemon not created");
    }
   
  };

  return (
    <>
      <div className="form-container">
        <h1>Create A Pokemon</h1>
        <form action="" onSubmit={handleSubmit} className="form">

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={pokemon.name}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon Name"
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="hp">HP:</label>
          <input
            type="text"
            name="hp"
            value={pokemon.hp}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon HP"
          />

          {errors.hp && <p className="error">{errors.hp}</p>}

          <label htmlFor="attack">Attack:</label>
          <input
            type="text"
            name="attack"
            value={pokemon.attack}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon Attack"
          />

          {errors.attack && <p className="error">{errors.attack}</p>}

          <label htmlFor="defense">Defense:</label>
          <input
            type="text"
            name="defense"
            value={pokemon.defense}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon Defense"
          />

          {errors.defense && <p className="error">{errors.defense}</p>}

          <label htmlFor="speed">Speed{"(optional)"}:</label>
          <input
            type="text"
            name="speed"
            value={pokemon.speed}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon Speed (optional)"
          />

          {errors.speed && <p className="error">{errors.speed}</p>}

          <label htmlFor="height">Height{"(optional)"}:</label>
          <input
            type="text"
            name="height"
            value={pokemon.height}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon Height (optional)"
          />

          {errors.height && <p className="error">{errors.height}</p>}

          <label htmlFor="weight">Weight{"(optional)"}:</label>
          <input
            type="text"
            name="weight"
            value={pokemon.weight}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon Weight (optional)"
          />

          {errors.weight && <p className="error">{errors.weight}</p>}

          <label htmlFor="types">Choose up to 2 types:</label>
          <div className="select-types">
          <span className="select-placeholder">Select up to 2 types</span>
          <div className="selector-types">
              {types.map((type, index)=>{
                  return(
                      <div className="type-checkbox" key={index}>
                          <input type="checkbox" name="types" value={type} onChange={handleTypes} />
                          <label htmlFor="types">{type}</label>
                      </div>
                  )
              })}
          </div>
          </div>

          {errors.types && <p className="error">{errors.types}</p>}

          <label htmlFor="image">Image:</label>
          <input
            type="text"
            name="image"
            value={pokemon.image}
            onChange={handleChange}
            className="input"
            placeholder="Pokemon Image (url)"
          />
          {errors.image && <p className="error">{errors.image}</p>}

          <button type="submit" className="submit" disabled={errors.name || errors.hp || errors.attack || errors.defense || errors.image || selectedTypes.length <= 0 || pokemon.name === undefined || !pokemon.image || pokemon.hp === undefined || pokemon.attack === undefined || pokemon.defense === undefined}>
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
