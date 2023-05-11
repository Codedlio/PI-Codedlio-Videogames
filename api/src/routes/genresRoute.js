const getGenres=require('../controllers/getGenres');


const express =require('express')
const genresRoute=express.Router()

genresRoute.
get("/", async (req, res)=>{
  try {
    res.send(await getGenres());
  } catch (error) {
    
    res.status(500).send(error.message)
  }
});


  module.exports=genresRoute;