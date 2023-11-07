import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokedex: [],
  allPokemons: [],
  types: [],
  order: "a-z",
  filter: "all",
  currentPage: 1,
  pokemonsPerPage: 12,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      state.pokedex = action.payload;
      state.allPokemons = action.payload;
    },
    setPokemonSearch : (state, action) => {
      state.pokedex = action.payload;
    }
    ,
    addPokemon: (state, action) => {
      state.pokedex.push(action.payload);
      state.allPokemons.push(action.payload);
    },
    updatePokemon: (state, action) => {
      state.pokedex = state.pokedex.map((pokemon) => {
        if (pokemon.pokemonName === action.payload.pokemonName) {
          return action.payload;
        } else {
          return pokemon;
        }
      });
      state.allPokemons = state.allPokemons.map((pokemon) => {
        if (pokemon.pokemonName === action.payload.pokemonName) {
          return action.payload;
        } else {
          return pokemon;
        }
      });
    },
    removePokemon: (state, action) => {
      state.pokedex = state.pokedex.filter(
        (pokemon) => pokemon.pokemonName !== action.payload
      );
      state.allPokemons = state.allPokemons.filter(
        (pokemon) => pokemon.pokemonName !== action.payload
      );
    },
    setTypes: (state, action) => {
      state.types = action.payload;
    }
    ,
    setOrder: (state, action) => {
      state.order = action.payload;

      if (state.order === "a-z") {
        state.pokedex.sort((a, b) =>
          a.pokemonName.localeCompare(b.pokemonName)
        );
        state.allPokemons.sort((a, b) =>
          a.pokemonName.localeCompare(b.pokemonName)
        );
      } else if(state.order === "z-a") {
        state.pokedex.sort((a, b) =>
          b.pokemonName.localeCompare(a.pokemonName)
        );
        state.allPokemons.sort((a, b) =>
          b.pokemonName.localeCompare(a.pokemonName)
        );
      }else if(state.order === "attack-asc"){
        state.pokedex.sort((a, b) => b.pokemonStats[1] - a.pokemonStats[1]);
        state.allPokemons.sort((a, b) => b.pokemonStats[1] - a.pokemonStats[1]);
      }else if(state.order === "attack-desc"){
        state.pokedex.sort((a, b) => a.pokemonStats[1] - b.pokemonStats[1]);
        state.allPokemons.sort((a, b) => a.pokemonStats[1] - b.pokemonStats[1]);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;

      if (state.filter === "all") {
        state.pokedex = state.allPokemons;
      } else if (state.filter === "api") {
        state.pokedex = state.allPokemons.filter(
          (pokemon) => typeof pokemon.pokemonId === "number"
        );
      } else if (state.filter === "db") {
        state.pokedex = state.allPokemons.filter(
          (pokemon) => pokemon.pokemonId
                       ?typeof pokemon.pokemonId === "string"
                       :pokemon.pokemonCreated === true
        );
      }else if(state.filter.includes("type")){
        state.pokedex = state.allPokemons.filter(
          (pokemon) => pokemon.pokemonTypes.includes(state.filter.slice(5).trim())
        );
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPokemonsPerPage: (state, action) => {
      state.pokemonsPerPage = action.payload;
    },    
  },
});

export const {
  setPokemonList,
  addPokemon,
  removePokemon,
  setOrder,
  setFilter,
  setCurrentPage,
  setPokemonsPerPage,
  setPokemonSearch,
  setTypes,
  updatePokemon
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
