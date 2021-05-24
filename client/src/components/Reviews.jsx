import React from 'react';
import StarRating from "../components/StarRating";

const Reviews = ({reviews}) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {reviews.map((review)=>{ 
                return (
                    <div key={review.id} className="bg-green-600 text-white mx-2 my-2 p-4 w-auto rounded-3xl">
                <div className="justify-between">
                    <span className="text-2xl font-bold">{review.name}</span>
                    <span><p className="flex flex-row pb-2"><StarRating rating={review.rating}/></p></span>
                </div>
                <div className="bg-gray-800 text-center px-6 py-2 rounded-xl">
                    <p>{review.review}</p>
                </div>
            </div>
                )
            })}
          </div>
    )
}

export default Reviews
