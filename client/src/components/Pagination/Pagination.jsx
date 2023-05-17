import React from "react";
import style from "./Pagination.module.css";


const Pagination = ({ page, setPage, max, input, setInput }) => {
  
  const nextPage = () => {
    const newPage = page + 1;
    setInput(newPage);
    setPage(newPage);
  };

  const previousPage = () => {
    const newPage = page - 1;
    setInput(newPage);
    setPage(newPage);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      const newPage = parseInt(e.target.value);
      if (newPage >= 1 && newPage <= max && !isNaN(newPage)) {
        setPage(newPage);
        setInput(newPage);
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={style.paginated_container}>
      <button
        disabled={page === 1 || page < 1}
        className={style.back_page}
        onClick={previousPage}
      >
        <img alt="◀" />
      </button>
      <input
        onChange={onChange}
        onKeyDown={onKeyDown}
        name="pages"
        value={input}
        autoComplete="off"
        className={style.input}
      />
      <p className={style.p}>of {max}</p>
      <button
        disabled={page === max || page > max}
        className={style.forward_page}
        onClick={nextPage}
      >
        <img alt="▶" />
      </button>
    </div>
  );
};

export default Pagination;
