import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import searchSVG from '../../assets/search-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setPokemonSearch, setCurrentPage } from '../../redux/pokemonSlice'
import { useState } from 'react'
import axios from 'axios'
import './navbar.css'

const NavBar = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allPokemons = useSelector((state)=> state.pokemon.allPokemons)

    const onClickSearch = async (name) => {
        const pokeName = name.toLowerCase();
        try {
          const response = await axios(
            `https://pokeapp-server-production.up.railway.app/pokemon/search?name=${pokeName}`
          );
          navigate(`/detail/${response.data.id}`);
          dispatch(setPokemonSearch(allPokemons));
        } catch (error) {
          alert("Pokemon not found");
        }
      };

    const handleLiveSearch = ({ target }) => {
        const searchValue = target.value.trim().toLowerCase();
        setName(searchValue);

        let filteredPokemons = [];

        if (searchValue === "") {
            filteredPokemons = allPokemons;
        } else {
            filteredPokemons = allPokemons.filter((pokemon) =>
                pokemon.pokemonName.toLowerCase().startsWith(searchValue)
            );
        }

        dispatch(setPokemonSearch(filteredPokemons));
        dispatch(setCurrentPage(1));
    };

  return (
    <>
        <div className='nav-container'>
            <Link to={"/"} className='pokeapp-landing'><h1 id='nav-title'>PokeApp</h1></Link>
            <div className='links'>
                <Link to={'/home'} className='link'>Home</Link>
                <Link to={'/create'} className='link'>Create</Link>
            </div>
            <div className='searchBar'>
                <input 
                type='text' 
                placeholder='Search Pokemon'
                name={name}
                value={name}
                onChange={handleLiveSearch}
                />
                <button className='search-btn' onClick={()=>{onClickSearch(name), setName('')}}><img src={searchSVG} alt="Search Button" className='search-svg' /></button>
            </div>
        </div>

    </>
  )
}

export default NavBar
