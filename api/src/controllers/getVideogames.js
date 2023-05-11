
const axios=require('axios')
require('dotenv').config();
const { Videogame, Genre } = require('../db');

const {API_KEY}=process.env

const getAllVideogames= async()=>{
    const dataCustom = await Videogame.findAll({
        include: Genre
      });
    let allVG=[]
    let page=0;
    let URL=`https://api.rawg.io/api/games?key=${API_KEY}`;
//     const response = await fetch(URL);
//      const { results, next } = await response.json();
// .then((response) => response.json())
//       .then((data) => {
    while (page<5) {
        const pageData= await axios.get(URL);
        const {data}=pageData
        const pageGames=data.results.map((game)=>{
            return {
                id:game.id,
                name:game.name,
                description:game.description,
                platforms:game.platforms?.map((plat)=> plat.platform.name),
                image:game.background_image, 
                released:game.released,
                rating:game.rating,
                genres:game.genres?.map((genre) => genre.name),
               
            }
        })
        allVG=allVG.concat(pageGames)
        URL=data.next;
        
        page++
        // if (page < 5) {
        //     return getGames(data.next);

    }
    if(!dataCustom)throw{error:"Not games found "}
    return allVG.concat(dataCustom)

}
// const apiToDataBase=async()=>{
//     try {
//       const allGames= await getGames();
//       await Videogame.bulkCreate(allGames) 
//       return allGames;
//     } catch (error) {
//         return {error:error.message}
//     }
   
// } 

    
module.exports=getAllVideogames;

