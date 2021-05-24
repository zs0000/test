import React, {useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router'
import BreederFinder from '../apis/BreederFinder';


const UpdateBreeder = (props) => {

    let history = useHistory();
    const {id} = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

   useEffect(()=>{
       const fetchData = async () =>{
           const response =  await BreederFinder.get(`/${id}`)
           setName(response.data.data.breeders.name)
           setLocation(response.data.data.breeders.location)
           setPriceRange(response.data.data.breeders.price_range)
       };

       fetchData();
   },[]);

   const handleSubmit = async(e) => {
       e.preventDefault()
       const UpdateBreeder = await BreederFinder.put(`/${id}`, {
           name,
           location,
           price_range: priceRange
       })
       history.push("/")
    }

    return (
        <div className="">
        <div className="flex justify-center h-screen w-auto justify-items-center">
            <form className="p-4 rounded shadow-md border w-screen bg-gray-300 ">
                <div className=" justify-items-center items-center">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-bold text-lg">Name</label>
                    <input className="p-1 bg-gray-100 border rounded-md border-gray-400 focus:bg-white focus:border-blue-600" value={name} onChange={(e)=> setName(e.target.value)}id="name" type="text"></input>
                </div>
                <div className="flex flex-col">
                    <label className="font-bold text-lg" htmlFor="location">Location</label>
                    <input className="p-1 bg-gray-100 border rounded-md border-gray-400 focus:bg-white focus:border-blue-600" value={location} onChange={(e)=> setLocation(e.target.value)} id="location" type="text"></input>
                </div>
                <div>
                    <label className="flex flex-col font-bold text-lg" htmlFor="price_range">Price Rating</label>
                    <input className="p-1 bg-gray-100 border rounded-md border-gray-400 focus:bg-white focus:border-blue-600" value={priceRange} onChange={(e)=> setPriceRange(e.target.value)} type="number" id="price_range"></input>
                </div>
                <div className="flex flex-col justify-center">
                <button type="submit" onClick={handleSubmit} className="bg-green-100 font-bold border border-gray-400 rounded-md py-1 mt-4">Submit</button>
                </div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default UpdateBreeder
