const educationService = require("../../services/advProfileServices/educationService")

const createEducation = async ( req, res) =>{
    try{
        const result = await educationService(req.body);
        res.status(201).json(result)

    }catch(err){
        return res.status(400).json({message: err.message})

    }

}
module.exports = {createEducation}