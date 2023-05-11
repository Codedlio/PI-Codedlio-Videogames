import React from "react";
import style from './Loading.module.css'
import loading from '../../media/fire.gif';

const ErrorComponent = () => {
    return(
        <div className="style.loading">
            <img src={loading} alt="Loading" className={style.loading_image}/>
        </div>
    )
};

export default ErrorComponent;