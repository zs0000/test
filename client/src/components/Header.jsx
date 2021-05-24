import React from 'react'

const Header = () => {
    return (
        <div>
            <div className="container flex flex-col pt-4 px-5 mx-auto lg:items-center">
              <div className="flex flex-col w-full mb-6 text-left lg:text-center">
                <h2 className= "text-xs font-semibold tracking-widest text-black uppercase title-font">Breeder Ratings</h2>
                <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-black sm:text-5xl title-font"> Review breeders <br className="md:hidden" /> whom may be close to you, and their prices</h1>
                <p className="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3">The quality of care animals are receiving should absolutely matter. Here we have created a tool to help the reptile community hold bad actors accountable through a catalog of reviews from Verified Customers</p>
              </div>
            </div>
        </div>
    )
}

export default Header
