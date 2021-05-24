import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import BreederFinder from '../apis/BreederFinder';
import AddReview from '../components/AddReview';
import Navbar from '../components/Navbar';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { BreedersContext } from '../context/BreedersContext';

const BreederDetailPage = () => {
    const {id} = useParams();
    const {selectedBreeder, setSelectedBreeder} = useContext(BreedersContext);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await BreederFinder.get(`/${id}`);
                setSelectedBreeder(response.data.data);
            } catch (err) {
                console.log(err)
            }

        }
        fetchData();
    }, [])
    return (
     
        <div>
      
            {selectedBreeder && (
               <>
               <Navbar />
               <div className="flex flex-col justify-items-center justify-center items-center shadow-md bg-blue-100">
               <div className="flex justify-items-center items-center mt-4">
               <h1 className="font-bold text-4xl">{selectedBreeder.breeders.name}</h1>
               </div>
               <div className="text-center pb-2"><p className="flex flex-row"><StarRating rating={selectedBreeder.breeders.average_rating}/></p>
               <span className="">{selectedBreeder.breeders.count ? `(${selectedBreeder.breeders.count})` : "(0)" }</span>
               </div>
               </div>
               <div>
                    <AddReview />
                   <Reviews reviews={selectedBreeder.reviews}/>
               </div>
               </> 
            ) }
        </div>
    )
}

export default BreederDetailPage;
