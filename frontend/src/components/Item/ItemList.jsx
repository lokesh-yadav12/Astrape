import React from 'react';


export default function ItemList({ items = [], onAdd }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <div key={item._id} className="card p-4 product-card flex flex-col">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-3" />
          <div className="flex-grow">
           <div className='flex justify-between px-4'>
             <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="mt-2 font-bold">₹ {item.price}</p>
           </div>
            <p className="mt-2 px-4 small text-gray-700">{item.description?.slice(0,120)}</p>
          </div>
          <div className="mt-3">
           <button onClick={() => onAdd(item._id)} className="btn-primary bg-blue-500 py-3 w-full">
  Add to cart
</button>

   </div>
        </div>
      ))}
    </div>
  )
}
