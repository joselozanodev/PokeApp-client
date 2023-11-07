import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/pokemonSlice";
import "./card.css";


const Card = ({ id, name, types, sprite}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnClick = () => {
      if(id){
        navigate(`/detail/${id}`);
        dispatch(setCurrentPage(1));
      }else{
        navigate(`/detail/${name}`);
        dispatch(setCurrentPage(1));
      }
  };


  const handleImageError = ({target})=>{
    target.src = 'https://m.media-amazon.com/images/I/71WkWKFRSWL.png'
  }

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

  const cardStyle = {
    background: `radial-gradient(circle at 50% 0%, ${typeColors[types[0]]} 36%, #ffffff 36%)`,
  };

  const cardTypesStyle={
    backgroundColor: `${typeColors[types[0]]}`
  }

  return (
      <div className="card" style={cardStyle}>
        {sprite.other ? (
          <img
            src={sprite.other.dream_world.front_default}
            alt={name}
            className="card-img"
            onClick={handleOnClick}
            onLoading="lazy"
          />
        ) : (
          <img
            src={sprite.front_default}
            alt={name}
            className="card-img"
            onClick={handleOnClick}
            onError={handleImageError}
            onLoading="lazy"
          />
        )}
        <h1 className="card-name">{name}</h1>
        <div className="types-container">
        {types &&
          types.map((type, index) => {
            return (
              <p key={index} className="card-types" style={cardTypesStyle}>
                {type}
              </p>
            );
          })}
        </div>
      </div>
  );
};

export default Card;
