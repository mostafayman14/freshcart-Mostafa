import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Heading from '../ui/Heading';
import Loading from '../ui/Loading';
import { CartContext } from '../../context/CartContext';



export default function Products() {
  const [getData, setgetData] = useState([]);
  const [loading, setLoading] = useState(true);


let {AddToCart} = useContext(CartContext);



  async function getProducts() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setgetData(data.data);
      setLoading(false);
      localStorage.setItem('product', getData);


    } catch (error) {
      console.log(error);

    }

  }
  useEffect(() => {
    getProducts();

  }, [])




  return <>
    <Heading titlePage='All Products' />
    {loading ?
      <Loading /> :
      <div className="w-full flex flex-wrap  gap-y-4 justify-center overflow-hidden pt-5 ">
        {
          getData.map((item) => {
            return <div key={item.id} className="w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-3" >
              <div className='product rounded-xl md:p-2 '>
                <Link to={`/productdetails/${item.id}`}>
                  <img className='w-full ' src={item.imageCover} alt={item.title} />
                  <div className='px-4 py-2'>
                    <h3 className='text-main'>{item.category.name}</h3>
                    <h3 className='font-semibold'>{item.title.split(' ', 2).join(' ')}</h3>
                    <div className='flex justify-between font-semibold text-gray-600 py-6'>
                      <p>{item.price} EGP</p>
                      <span> <i className='fa-solid fa-star rating-color'></i> {item.ratingsAverage} </span>
                    </div>
                  </div>
                </Link>
                <div className="px-5 md:p-0">
                  <button onClick={()=>AddToCart(item.id)} className='btn w-full' >Add to cart</button>
                </div>
              </div>
            </div>
          })
        }
      </div>
    }
  </>
}
