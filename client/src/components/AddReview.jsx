import React, { useState } from 'react';
import BreederFinder from '../apis/BreederFinder';
import { useLocation, useParams, useHistory } from "react-router-dom";

const AddReview = () => {
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview =  async(e) => {
        e.preventDefault();

        try {
            const response = await BreederFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating,
            });
            history.push("/");
            history.push(location.pathname);
        } catch (err) {
            
        }

        
    }

    return (
        <div className="flex flex-col justify-items-center items-center w-screen">
            <div className="bg-gray-100 p-4 shadow-lg rounded w-5/6">
            <form>
                <div className="flex flex-col justify-items-center">
                    <div className="justify-items-center items-center">
                        <label htmlFor="name"></label>
                        <input id="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder="name" type="text" className="w-64 bg-gray-300 focus:bg-white rounded p-2 mb-2 " />
                    </div>
                    <div className="w-auto">
                        <label className="font-bold" htmlFor="rating"></label>
                        <select id="rating" value={rating} onChange={(e)=> setRating(e.target.value)} className="w-64 bg-gray-300 focus:bg-white rounded p-3">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="font-bold text-2xl">Review</label>
                    <textarea id="Review" className="bg-white border shadow-sm " value={reviewText} onChange={(e)=> setReviewText(e.target.value)}></textarea>
                </div>
                <button type="submit" onClick={handleSubmitReview} className="py-2 px-4 rounded text-white mt-4  transition duration-500 ease-in-out bg-blue-600 hover:bg-green-600 transform hover:-translate-y-1 hover:scale-110">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default AddReview
