import { useSelector } from "react-redux";
import Card from "./card";

function Cards({endIndex, startIndex}) {
    const pokemons = useSelector((state) => state.pokemon.pokedex);
  return (
    <div className="card-container-father">
    {pokemons
      .slice(startIndex, endIndex)
      .map(
        (
          {
            pokemonId,
            pokemonName,
            pokemonTypes,
            pokemonAbilities,
            pokemonStats,
            pokemonSprite,
            pokemonWeight,
            pokemonHeight,
            pokemonMoves,
            pokemonCreated,
          },
          index
        ) => {
          return (
            <Card
              key={index}
              id={pokemonId}
              name={pokemonName}
              types={pokemonTypes}
              abilities={pokemonAbilities}
              stats={pokemonStats}
              sprite={pokemonSprite}
              weight={pokemonWeight}
              height={pokemonHeight}
              moves={pokemonMoves}
              created={pokemonCreated}
            />
          );
        }
      )}
  </div>
  )
}

export default Cards