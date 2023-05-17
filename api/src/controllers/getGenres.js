require('dotenv').config()

const axios = require('axios')
const { Genre } = require('../db')

const {API_KEY} = process.env;

const getGenres = async () => {
const URL=`https://api.rawg.io/api/genres?key=${API_KEY}`;
  const dataGenres = await Genre.findAll() 
  if(dataGenres.length){
    
    return dataGenres
  }
  
  const allGenres = await axios.get(URL)
  const {data} = allGenres
  const genres = data.results.map(genre => ({
    id: genre.id,
    name : genre.name
  }))
  // if(!genres){
  //   throw {message:"Not genre found"}
  // }
  
  return await Genre.bulkCreate(genres)
};

module.exports = getGenres;

