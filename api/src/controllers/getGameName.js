const axios=require('axios')
require('dotenv').config();
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize');
const {API_KEY}=process.env

const getGameName= async(name)=>{
    

        //https://api.rawg.io/api/games?key=f&search=halo
        let URL=`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
        const pageDataName= await axios.get(URL); 
        const {data}=pageDataName  
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
            const dataCustom = await Videogame.findAll({
              where: {
                name: {
                  [Op.iLike]: `%${name}`,
                },
              },
              include: Genre
            });
        
        if(!pageGames.length && !dataCustom.length){
            throw{error:"Not game found"}
        }    
    return [...pageGames,...dataCustom].slice(0,15)
 }
   

module.exports=getGameName;