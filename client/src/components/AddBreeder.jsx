import React, { useState, useContext} from 'react';
import BreederFinder from "../apis/BreederFinder";
import { BreedersContext } from '../context/BreedersContext';

const AddBreeder = () => {
    const {addBreeders} = useContext(BreedersContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           const response = await BreederFinder.post("/", {
                name,
                location,
                price_range: priceRange
            });
        addBreeders(response.data.data.breeders);
        } catch (err) {
            
        };
    }
    return (
        <div className="text-center font-bold pb-8 bg-gray-800 border border-gray-800 shadow-2xl">
            <div className="text-white py-4 text-xl tracking-tight whitespace-pre-wrap">
            Don't see a breeder you love? Simply, add them below with our simple ui!
            </div>
            <form className="max-w-screen" action="">
            <div className="flex flex-col lg:flex-row md:flex-row justify-center items-center ">
            <div className="w-full lg:w-auto sm:w-auto mx-2 lg:my-0 md:my-0 my-2">
            <input type="text" className="bg-gray-200 px-4 py-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-grey-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className="w-full lg:w-auto sm:w-auto mx-2">
            <input type="text" className="px-4 py-2 bg-gray-200 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-grey-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}></input>
            </div>
            <div className="lg:py-0 md:py-0 py-2">
                <select className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800" value={priceRange} onChange={(e)=> setPriceRange(e.target.value)}>
                    <option disabled>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <button type="submit"  className="h-10 px-5 m-2 text-lg transition duration-500 ease-in-out bg-blue-500 hover:bg-green-600 transform hover:-translate-y-1 hover:scale-110 rounded-lg" onClick={handleSubmit}>Add</button>
            </div>
            </form>
        </div>
    )
}

export default AddBreeder
