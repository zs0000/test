import React from 'react';
import AddBreeder from '../components/AddBreeder';
import BreederList from '../components/BreederList';
import Header from "../components/Header";
import Navbar from '../components/Navbar';
const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <AddBreeder />
            <BreederList />
        </div>
    );
};

export default Home
