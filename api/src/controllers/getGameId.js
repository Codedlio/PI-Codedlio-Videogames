const axios=require('axios')
const { Videogame, Genre } = require('../db');
const {API_KEY}=process.env
const { Op } = require('sequelize');

const getGamesId= async(id)=>{
    const numId = !isNaN(id)
    if(numId){ 
        let URL=`https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    
        const dataById= await axios.get(URL);
        const {data}=dataById
        const gameById= {
                id:data.id,
                name:data.name,
                description:data.description_raw,
                platforms:data.platforms?.map((plat)=> plat.platform.name),
                image:data.background_image, 
                released:data.released,
                rating:data.rating,
                genres:data.genres?.map((genre) => genre.name),
            } 
            
            
            return gameById

    }
       
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (uuidRegex.test(id)) {
        const dataCustom = await Videogame.findOne({
            where: {id},
            include: Genre
      });   
        if(!dataCustom) throw{message:"Not id found"}
        return dataCustom
      } else {
        throw{message:"Invalid id"}
      }
            
            
        }
   

module.exports=getGamesId;