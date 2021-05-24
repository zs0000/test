import React from 'react'
import UpdateBreeder from '../components/UpdateBreeder'

const UpdatePage = () => {
    return (
        <div className="grid grid-cols-3">
            <UpdateBreeder />
            <div className="bg-green-100 flex justify-items-center items-center text-center col-span-2">
            <h1 className="font-black text-9xl flex justify-items-center items-center">Update Breeder</h1>
            </div>
        </div>
    )
}

export default UpdatePage
