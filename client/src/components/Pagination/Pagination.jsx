import React from "react";
import "./Pagination.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/pokemonSlice";

function Pagination({ maximum }) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.pokemon.currentPage);

    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const pageNumbers = Array.from({ length: maximum }, (_, index) => index + 1);

    const renderPageNumbers = pageNumbers.map((number, index) => {
        if (number < currentPage - 2 || number > currentPage + 2) {
            if (number > 1 && number < maximum && (number === currentPage - 3 || number === currentPage + 3)) {
                return <span key={index}>...</span>;
            }
            return null;
        }

        return (
            <button
                key={index}
                onClick={() => handlePageChange(number)}
                className={"pagination-item" + (number === currentPage ? "-active" : "")}
            >
                {number}
            </button>
        );
    });

    return (
        <div className="pagination-container">
            <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="first"
            >
                {"<<"}
            </button>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="prev"
            >
                {"<"}
            </button>

            {renderPageNumbers}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === maximum}
                className="next"
            >
                {">"}
            </button>
            <button
                onClick={() => handlePageChange(maximum)}
                disabled={currentPage === maximum}
                className="last"
            >
                {">>"}
            </button>
        </div>
    );
}

export default Pagination;