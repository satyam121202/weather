import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method === "POST"){
        // console.log(req.body)
        
        const City = req.body.city;
        // console.log(City)
    
        try{

            await axios.request({
                method:"GET",
                url:`https://api.weatherapi.com/v1/current.json?q=${City}&lang=En-US&key=${process.env.WEATHER_SECRET_KEY}`
            }).then(({data})=>{
                return res.status(200).json(data)
            })
    
        }catch(e){
            console.log(e)
            
        }
    }
    
    return res.status(203).json("Searching City")



    return res.status(201)
  };