
const { Videogame, Genre } = require('../db');

const { Op } = require('sequelize');
const getGenres=require('./getGenres')
const postCustomGame=async(dataCustom)=>{
const {name,description,platforms,image,released,rating,genres}=dataCustom

if(!name || !description || !platforms ||!genres || !released ||!rating||!image ){
    throw { message: 'Missing required information'}
  }
  const gameFound = await Videogame.findOne({
    where:{ name: { 
        [Op.iLike]: `%${name}%`
      } }
  })
  if(gameFound){
    throw {message: 'The game already exist! Choose another name.'}
  }
  const newGame = await Videogame.create({
    name,description,platforms,image,released,rating,genres
  })
  
  const allGenres = await getGenres();
  
  const filterGenres = allGenres.filter(genre => genres.includes(genre.id))

  newGame.addGenres(filterGenres);



  return {
    message: "New game added successfull!",
    game: newGame
  }

}
module.exports=postCustomGame;
   
  
    
  
  