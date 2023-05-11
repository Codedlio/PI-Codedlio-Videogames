const getVideogames=require('../controllers/getVideogames');
const getGamesById=require('../controllers/getGameId');
const getGameName=require('../controllers/getGameName');
const postCustomGame=require("../controllers/postCustomGame")
const express =require('express')
const vgRoute=express.Router()

//---------------------------------------------------//
vgRoute
.get("/", async(req,res)=>{
  const {name}=req.query
  
  if(name){
    try {
      const data= await getGameName(name);
      res.status(201).json(data)
    } catch (error) {
      res.status(400).send(error)
    }
    }
    else{
      try {
        const data = await getVideogames();
        res.status(200).json(data);
      } catch (error) {
        console.log(error)
        res.status(400).send(error)
      }
    }
  
})
//---------------------------------------------------//
.get("/:id", async (req,res)=>{
  try {
    const dataForId= await getGamesById(req.params.id);
    res.status(200).json(dataForId)
  } catch (error) {
    
    res.status(400).send(error.message)
  }
})

//---------------------------------------------------//
.post('/',async (req, res) => {
  const dataCustom = req.body;
  
try {
  const data= await postCustomGame(dataCustom)
  res.status(201).json(data)
} catch (error) {
  res.status(400).send(error)
}
  
});


module.exports=vgRoute;