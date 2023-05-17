import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getGenres } from "../../redux/actions";
import axios from "axios";
import style from "./GameForm.module.css";
import screen from "../../media/image6.jpg";

import backApp from "../../media/image9.png";

const GameForm = () => {
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.genres);

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    released: "",
    image: "",
    rating: "",
    genres: [],
    platforms: [],
  });
 
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validateInputs(inputs));
  }, [inputs]);

  

  let allPlatforms = [
    "Xbox",
    "Xbox 360",
    "Xbox Series S/X",
    "Xbox One",
    "PlayStation 2",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
    "Nintendo 3DS",
    "Wii U",
    "Nintendo Switch",
    "Linux",
    "PC",
    "macOS",
    "iOS",
    "PS Vita",
    "Android",
    "Web",
    "Dreamcast",
  ];

  const validateInputs = (input) => {
    let error = {};
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;

    if (!input.name) {
      error.name = "Name is required.";
    }
    if (input.name.length > 255) {
      error.name =
        "The Name must have a maximum of 255 characters.";
    }
    if (!input.description) {
      error.description = "Description is required.";
    }
    if (!input.image) {
      error.image = 'The image is required, should be a "http link".';
    }
    if (!regex.test(input.image)) {
      error.image =
        "The URL that you are typing is invalid, it must be an image URL.";
    }
    if (!input.rating) {
      error.rating = "You should rate your videogame";
    }
    if (Number(input.rating) < 0 || Number(input.rating) > 5) {
      error.rating = "The rating must be a value between 0.0 and 5.0.";
    }
    if (input.genres.length === 0) {
      error.genres = "Your videogame must have at least one genre.";
    }
    if (!input.platforms.length) {
      error.platforms = "You should select at least one platform.";
    }

    return error;
  };

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(validateInputs(inputs));
  };

  const handleChecksGenres = (e) => {
    
    if (e.target.checked) {
      console.log(e.target.value);
      setInputs({
        ...inputs,
        genres: [...inputs.genres, parseInt(e.target.value)],
      });
      setErrors(validateInputs(inputs));
    } else {
      setInputs({
        ...inputs,
        genres: inputs.genres.filter((g) => g !==e.target.value),
      });
      setErrors(validateInputs(inputs));
    }
  };

  const handleChecksPlatforms = (e) => {
    if (e.target.checked) {
      console.log(e.target.value);
      setInputs({
        ...inputs,
        platforms: [...inputs.platforms, e.target.value],
      });
      setErrors(validateInputs(inputs));
    } else {
      setInputs({
        ...inputs,
        platforms: inputs.platforms.filter((pt) => pt !== e.target.value),
      });
      setErrors(validateInputs(inputs));
    }
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.released) {
      inputs.released = Date.now();
    }
    if (!Object.keys(errors).length) {
       
   
      axios.post("http://localhost:3001/videogames", inputs);
     console.log(inputs);

    setInputs({
      name: "",
      description: "",
      released: "",
      image: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    window.sessionStorage.clear();
    alert("Game created successfully");
    window.location.reload();
    }else{
      // Detiene el envío del formulario
      e.preventDefault();
      alert("Please fix the errors before submitting the form.");
      return;
    }
    
  };

  return (
    <div className={style.mayor}>
      <img src={screen} alt="fondo" className={style.fondo} />
      
      <div className={style.container_creategame}>
        <div className={style.container_form}>
          <div className={style.container_title}>
            <p className={style.first_title}>Create </p>
            <p className={style.second_title}>Game</p>
          </div>
         
          <form onSubmit={handleSubmit} className={style.form_create}>
            <div className={style.label_container}>
              <label className={style.names}>Game Name </label>
              <input
                className={style.inputs_names}
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleInputs}
              />
              {errors.name ? (
                <div className={style.errors}>{errors.name}</div>
              ) : null}
            </div>

            <div className={style.label_container}>
              <label className={style.names}>Description </label>
              <textarea
                className={style.inputs_description}
                type="text"
                name="description"
                value={inputs.description}
                onChange={handleInputs}
              ></textarea>
              {errors.description ? (
                <div className={style.errors}>{errors.description}</div>
              ) : null}
            </div>

            <div className={style.container_date_n_rating}>
              <div className={style.label_container}>
                <label className={style.names}>Released Date </label>
                <input
                  className={style.inputs_date_n_rate}
                  type="date"
                  name="released"
                  value={inputs.released}
                  onChange={handleInputs}
                />
              </div>

              <div className={style.label_container}>
                <label className={style.names}>Rating </label>
                <input
                  className={style.inputs_date_n_rate}
                  type="text"
                  
                  name="rating"
                  value={inputs.rating}
                  onChange={handleInputs}
                />
                {errors.rating ? (
                  <div className={style.errors}>{errors.rating}</div>
                ) : null}
              </div>
            </div>

            <div className={style.container_genres_platforms}>
              <div className={style.label_container_two}>
                <label className={style.names}>Genres </label>
                <div className={style.container_arrays}>
                  {allGenres.map((g, index) => {
                    return (
                      <div key={index} className={style.unit_m}>
                        <input
                          key={g.id}
                          type="checkbox"
                          id={`checkbox-${index}`}
                          value={g.id}
                          name="genres"
                          onClick={(e) => handleChecksGenres(e)}
                        />
                        <label htmlFor={`checkbox-${index}`} className={style.label_unit}>{g.name}</label>
                      </div>
                    );
                  })}
                </div>
                {errors.genres ? (
                  <div className={style.errors}>{errors.genres}</div>
                ) : null}
              </div>

              <div className={style.label_container}>
                <label className={style.names}>Platforms </label>
                <div className={style.container_arrays}>
                  {allPlatforms.map((pt, index) => {
                    return (
                      <div key={index} className={style.unit_m}>
                        <input
                          key={index}
                          type="checkbox"
                          value={pt}
                          id={`checkboxPl-${index}`}
                          name="platforms"
                          onClick={(e) => handleChecksPlatforms(e)}
                        />
                        <label htmlFor={`checkboxPl-${index}`}className={style.label_unit}>{pt}</label>
                      </div>
                    );
                  })}
                </div>
                {errors.platforms ? (
                  <div className={style.errors}>{errors.platforms}</div>
                ) : null}
              </div>
            </div>

            <div className={style.label_container}>
              <label className={style.names}>Image </label>
              <input
                className={style.inputs_names}
                type="text"
                name="image"
                value={inputs.image}
                onChange={handleInputs}
              />
              {errors.image ? (
                <div className={style.errors}>{errors.image}</div>
              ) : null}
            </div>
                
            <button type="submit" className={style.button}>
              Create Videogame
            </button>
            <div className={style.back_tohome}>
        <NavLink to="/home" className={style.link}>
          <img src={backApp} alt="logoApp" className={style.logo} />
        </NavLink>
      </div>
          </form>
          
        </div>

        <div className={style.container_assassin}>
          
        </div>
      </div>
    </div>
  );
};

export default GameForm;
