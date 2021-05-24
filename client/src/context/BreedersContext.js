import React, {useState, createContext} from "react";

export const BreedersContext = createContext();

export const BreedersContextProvider = props => {

    const [breeders, setBreeders] = useState([]);
    const [selectedBreeder , setSelectedBreeder] = useState(null);

    const addBreeders = (breeder) => {
        setBreeders([...breeders, breeder]);
    };
    return(
        <BreedersContext.Provider value={{breeders, setBreeders, addBreeders, selectedBreeder, setSelectedBreeder}}>
            {props.children}
        </BreedersContext.Provider>
    );

}