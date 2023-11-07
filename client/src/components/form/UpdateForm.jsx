import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateUpdateForm } from "./validateUpdateForm";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
import { setCurrentPage, updatePokemon } from "../../redux/pokemonSlice";

const UpdateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [errors, setErrors] = useState({});
  const types = useSelector((state) => state.pokemon.types);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemon, setPokemon] = useState({
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    image: "",
  });

  const handleTypes = ({ target }) => {
    const type = target.value;
    if (target.checked) {
      if (selectedTypes.length < 2) {
        setPokemon({
          ...pokemon,
          types: [...selectedTypes, type],
        });
        setSelectedTypes([...selectedTypes, type]);
      }
    } else {
      setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
      setPokemon({
        ...pokemon,
        types: selectedTypes.filter((selectedType) => selectedType !== type),
      });
    }
  };

  const handleChange = ({ target }) => {
    const fieldErrors = validateUpdateForm({
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

  const handleSubmit = async(event)=>{
    event.preventDefault();

    const pokemonRedux = {
      pokemonName: params.name,
      pokemonStats: [pokemon.hp, pokemon.attack, pokemon.defense, pokemon.speed, pokemon.height, pokemon.weight],
      pokemonTypes: pokemon.types,
      pokemonSprite: { front_default: pokemon.image },
      pokemonCreated: true,
    }
    try {
      const response = await axios.put(`http://localhost:3001/pokemon/${params?.name}`, pokemon)
      if(response){
        dispatch(setCurrentPage(1))
        alert('Pokemon updated successfully')
        dispatch(updatePokemon(pokemonRedux))
        navigate('/home')
      }
    } catch (error) {
      console.log(error.message)
      alert('Checkout Fields')
    }
  }




  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="hp">Hp:</label>
          <input
            type="text"
            name="hp"
            id="hp"
            value={pokemon.hp}
            placeholder="Hp"
            onChange={handleChange}
            className="input"
          />
          {errors.hp && <p className="error">{errors.hp}</p>}

          <label htmlFor="attack">Attack:</label>
          <input
            type="text"
            name="attack"
            id="attack"
            value={pokemon.attack}
            placeholder="Attack"
            onChange={handleChange}
            className="input"
          />
          {errors.attack && <p className="error">{errors.attack}</p>}

          <label htmlFor="defense" onSubmit={handleSubmit}>Defense:</label>
          <input
            type="text"
            name="defense"
            id="defense"
            value={pokemon.defense}
            placeholder="Defense"
            onChange={handleChange}
            className="input"
          />
          {errors.defense && <p className="error">{errors.defense}</p>}

          <label htmlFor="speed">Speed:</label>
          <input
            type="text"
            name="speed"
            id="speed"
            value={pokemon.speed}
            placeholder="Speed"
            onChange={handleChange}
            className="input"
          />
          {errors.speed && <p className="error">{errors.speed}</p>}

          <label htmlFor="height">Height:</label>
          <input
            type="text"
            name="height"
            id="height"
            value={pokemon.height}
            placeholder="Height"
            onChange={handleChange}
            className="input"
          />
          {errors.height && <p className="error">{errors.height}</p>}

          <label htmlFor="weight">Weight:</label>
          <input
            type="text"
            name="weight"
            id="weight"
            value={pokemon.weight}
            placeholder="Weight"
            onChange={handleChange}
            className="input"
          />
          {errors.weight && <p className="error">{errors.weight}</p>}

          <label htmlFor="types">Choose up to 2 types:</label>
          <div className="select-types">
            <span className="select-placeholder">Select up to 2 types</span>
            <div className="selector-types">
              {types.map((type, index) => {
                return (
                  <div className="type-checkbox" key={index}>
                    <input type="checkbox" name="types" value={type} onChange={handleTypes} />
                    <label htmlFor="types">{type}</label>
                  </div>
                );
              })}
            </div>
          </div>

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

          <button className="submit" type="submit">Update Pokemon</button>
        </form>
      </div>
    </>
  );
};

export default UpdateForm;
