import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {    
    const [user, setUser] = useState("Jesse Hall");
    const [loader, setLoader] = useState(false);

    return (
        <ProductContext.Provider value={{user, setUser, loader, setLoader }}>
            {children}
        </ProductContext.Provider>
    )
};

export const useProductContext = () => {
    return useContext(ProductContext);
}



