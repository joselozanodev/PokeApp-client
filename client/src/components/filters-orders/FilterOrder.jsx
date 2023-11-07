import { useDispatch, useSelector} from "react-redux";
import { setOrder, setFilter, setCurrentPage } from "../../redux/pokemonSlice";
import "./FilterOrder.css";

function FilterOrder() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.pokemon.types);


    const handleOrder = ({ target }) => {
    const order = target.getAttribute("value");
    dispatch(setOrder(order));
    dispatch(setCurrentPage(1));
    const activeElement = document.querySelector("#order li.active");
    if (activeElement) {
      activeElement.classList.remove("active");
    }
    target.classList.add("active");
  };

  const handleFilter = ({ target }) => {
    const filter = target.getAttribute("value");
    dispatch(setFilter(filter));
    dispatch(setCurrentPage(1));
    const activeElement = document.querySelector("#filter li.active");
    if (activeElement) {
      activeElement.classList.remove("active");
    }
    target.classList.add("active");
  };

  return (
    <>
    <div className="filter-container">
      <ul id="filter" onClick={handleFilter}>
        <li value="all">All</li>
        <li value="db">Created Pokemons</li>
        <li value="api">Existing Pokemons</li>
        {
          types.map((type, index) => {
            return (
              <li key={index} value={`type: ${type}`}>{type}</li>
            )
          })
        }
      </ul>
    </div>
      <div id="order">
        <p className="order-placeholder">Order by <img src="https://www.svgrepo.com/download/27797/right-arrow.svg" className="dropdown-arrow"/></p>
        <div className="order-list">
        <ul  onClick={handleOrder} id="ul-order">
          <li value="a-z">A - Z</li>
          <li value="z-a">Z - A</li>
          <li value="attack-asc">Higher Attack</li>
          <li value="attack-desc">Lower Attack</li>
        </ul>
        </div>
      </div>
    </>
  )
}

export default FilterOrder