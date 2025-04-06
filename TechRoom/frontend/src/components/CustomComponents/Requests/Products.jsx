import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Prodcuts.css'

function Product() {
  const [product,setproduct]=React.useState([]);

  useEffect(()=>{
    getProducts();
  },[])

  const getProducts=async()=>{
    let result=await fetch("http://localhost:5001/product");
    result=await result.json();
    setproduct(result);
  }

  const deleteproduct =async (id)=>{
    console.log(id)
    let result=await fetch(`http://localhost:5001/product/${id}`,{
      method:"Delete"
    });
    result=await result.json();
    if(result){
      getProducts();
    }
  }
  console.warn(product);
  return (
    <div className='ProductList'>
 
      <h3 className=' text-3xl'>List</h3>
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Type</li>
        <li>Requiredmoney</li>
        <li>Mode</li>
        <li>Rate</li>
        <li>MobileNo</li>
      </ul>
      {
        product.map((item,index)=>
          <ul key={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>{item.type}</li>
        <li>{item.requiredmoney}</li>
        <li>{item.mode}</li>
        <li>{item.rate}</li>
        <li>{item.mobile}</li>
       
        
      </ul>
        )
      }
    </div>

  )
}

export default Product