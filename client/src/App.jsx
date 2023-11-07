import "./App.css";
import { Route, Routes, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Landing from "./components/LandingPage/Landing";
import Home from "./components/home/Home";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./components/Detail/Detail";
import Form from "./components/form/Form";
import { useDispatch, useSelector} from "react-redux";
import { setPokemonList, setTypes } from "./redux/pokemonSlice";
import Error from "./components/NotFound/Error";
import UpdateForm from "./components/form/UpdateForm";
import Loading from "./components/Loading/Loading";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const pokemons = useSelector((state) => state.pokemon.pokedex);
  const types = useSelector((state) => state.pokemon.types);



  useEffect(() => {
    async function fetchData() {
      try {
        const responsePokemons = await axios.get("http://localhost:3001/pokemon");
        const responseTypes = await axios.get("http://localhost:3001/types");
        if(types){
          dispatch(setTypes(responseTypes.data));
        }

        if (pokemons.length === 0) {
          dispatch(setPokemonList(responsePokemons.data));

        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {location.pathname !== "/" ? <NavBar /> : null}

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/create" element={<Form />} />
            <Route path="/edit/:name" element={<UpdateForm />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
