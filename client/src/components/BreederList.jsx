import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BreederFinder from "../apis/BreederFinder";
import { BreedersContext } from '../context/BreedersContext';
import StarRating from './StarRating';
const BreederList = (props) => {
    const {breeders, setBreeders} = useContext(BreedersContext);
    

    let history = useHistory();

    useEffect(() => {
        const fetchData = async() => {
        try {
           const response = await BreederFinder.get("/");
           console.log(response.data.data);
           setBreeders(response.data.data.breeders);

        } catch (err) {}
        };

        fetchData();
    },[]);


    const handleDelete = async(e, id) => {
        e.stopPropagation();
        try {
            const response = await BreederFinder.delete(`/${id}`);
            setBreeders(breeders.filter(breeder=>{
            return breeder.id !== id
            }))
        } catch (err) {
            
        }
    };
    
    const handleUpdate =  (e, id) =>{
        e.stopPropagation();
         history.push(`/breeders/${id}/update`)
    }

    const handleBreederSelect = (id) => {
        history.push(`/breeders/${id}`)
    }

    const renderRating = (breeder) => {
        if(!breeder.count){
            return(
                <span>0 reviews</span>
            )
        }
         return <>
         <p className="flex flex-row">
         <StarRating rating={breeder.id} />
        <span >({breeder.count})</span>
        </p>
        </>
    }

    return (
        <div className="flex justify-center items-center bg-gray-100 mt-8 mx-auto w-screen">
            <table className="table-auto w-screen h-auto lg:w-5/6">
            <thead>
                <tr>
                <th scope="col">Breeder</th>    
                <th scope="col">Location</th>    
                <th scope="col">Price Range</th>    
                <th scope="col">Ratings</th>    
                <th scope="col">Edit</th>    
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
              {breeders && breeders.map((breeder) =>{
                  
                  return(
                <tr key={breeder.id} onClick={() => handleBreederSelect(breeder.id)} className="bg-gray-300 focus:bg-gray-200 hover:bg-gray-200 cursor-pointer font-bold border border-grey-600 shadow-2xl w-screen h-auto">
                    <td><h1 className="text-center text-3xl text-black">{breeder.name}</h1></td>
                    <td><h1 className="text-lg text-center text-blue-600">{breeder.location}</h1></td>
                    <td><h1 className="mr-6  text-2xl text-center text-green-600">{"$".repeat(breeder.price_range)}</h1></td>
                    <td><h1 className="text-blue-600">{renderRating(breeder)}</h1></td>
                    <td><button type="button" onClick={(e) => handleUpdate(e, breeder.id)} className="h-10 px-3 m-2 w-5/6 text-white transition duration-500 ease-in-out bg-gray-600 hover:bg-green-600 transform hover:-translate-y-1 hover:scale-110 rounded-md">Update</button></td>
                    <td><button type="button" onClick={(e) => handleDelete(e, breeder.id)} className="h-10 px-3 m-2 w-5/6 text-white transition-colors duration-150 bg-gray-400 border border-grey-900 rounded-lg focus:shadow-outline hover:bg-red-800">Delete</button></td>
                </tr>
                  )
            })}
            </tbody>
            </table>
        </div>
    )
}

export default BreederList
