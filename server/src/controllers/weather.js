import CustomError from "../errors/customError.js"
import Weather from "../models/weather.js"

const getAllWeather = async ( req,res ) => {
    const weathers = await Weather.find()
    if(!weathers) throw new CustomError(500, 'no weathers found!')
    res.status(200).json(weathers)
}

const storeWeather = async (req,res) => {
    const exist = await Weather.findOne({"current_weather.time" : req.body.current_weather.time})
    if(!exist){

        const info = await Weather.create( req.body )
        if(!info) throw new CustomError(404, 'Weather data is not saved.')
        res.status(201).json({data: info, message:'Weather info is Saved.'})
    }else{
        res.status(200).json({message:'Already stored!'})
    }
}


export { getAllWeather,storeWeather }