import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts, selectFilteredProducts } from "../../Redux/features/Slices/Products";

const AllProducts = () => {
const products = useSelector(selectAllProducts)
const filteredProducts = useSelector(selectFilteredProducts)

  return(
    <div>
      {
        products.map( product => {
          return(
          <h1>{product.name}</h1>
          

          )
        })
      }

    </div>
    ) 
    
};

export default AllProducts;
