import React from "react";
import "./home.css";
import { useSelector } from "react-redux";
import FilterOrder from "../filters-orders/FilterOrder";
import Pagination from "../Pagination/Pagination";
import Cards from "../cards/cards";

const Home = () => {
  const pokemons = useSelector((state) => state.pokemon.pokedex);
  const currentPage = useSelector((state) => state.pokemon.currentPage);
  const pokemonsPerPage = useSelector((state) => state.pokemon.pokemonsPerPage);

  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;
  const maximum = Math.ceil(pokemons.length / pokemonsPerPage);

  return (
    <>
      <FilterOrder />
      <Pagination maximum={maximum}/>
      <Cards startIndex={startIndex} endIndex={endIndex}/>
    </>
  );
};

export default Home;
