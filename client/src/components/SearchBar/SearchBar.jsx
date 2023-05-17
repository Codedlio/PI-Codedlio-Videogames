import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";
import style from './SearchBar.module.css'



const SearchBar = () => {
    const dispatch = useDispatch();
    
    const [ game, setGame ] = useState("")

    const handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault();
        dispatch(getVideogames(game));
        setGame("")
        
        
    }


    

    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    className={style.search} 
                    type="text"
                    placeholder="Search a game . . ."
                    value={game}
                    onChange={e => {
                        
                        return setGame(e.target.value)}}
                />
                <input 
                    type="submit"
                    value="🔍︎"
                    className={style.button}
                />
            </form>
        </div>
    )
};


export default SearchBar;