import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method === "POST"){
        // console.log(req.body)
        
        const weather = req.body.climate;
        // console.log(weather)
    
        try{

            await axios.request({
                method:"GET",
                url:`https://unsplash.com/napi/search/photos?per_page=1&query=${weather}+sky`
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