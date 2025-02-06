import React, { useContext } from 'react'
import style from './SearchProducts.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

export default function SearchProducts(getData , searctitle ) {
  let {AddToCart} = useContext(CartContext)

  return (getData
    .filter((prod) => prod.category.name.includes(searctitle))
    .map((item) => (
      <div key={item.id} className="w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-3">
        <div className="product rounded-xl p-2">
          <Link to={`/productdetails/${item.id}`}>
            <img className="w-full" src={item.imageCover} alt={item.title} />
            <div className="px-4 py-2">
              <h3 className="text-main">{item.category.name}</h3>
              <h3 className="font-semibold">{item.title.split(' ', 2).join(' ')}</h3>
              <div className="flex justify-between font-semibold text-gray-600 py-6">
                <p>{item.price} EGP</p>
                <span>
                  <i className="fa-solid fa-star rating-color"></i> {item.ratingsAverage}
                </span>
              </div>
            </div>
          </Link>
          <button onClick={()=>{AddToCart(item.id)}} className="btn w-full">Add to cart</button>
        </div>
      </div>
    )))

  // console.log(getData);
  // console.log(categoryTitle);
  

  }



