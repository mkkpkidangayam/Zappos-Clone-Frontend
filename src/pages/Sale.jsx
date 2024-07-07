import React from 'react';

const saleItems = [
  {
    id: 1,
    name: 'Item 1',
    price: '$10',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Item 2',
    price: '$15',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Item 3',
    price: '$20',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Item 4',
    price: '$25',
    image: 'https://via.placeholder.com/150'
  }
];

const Sale = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Sale</h1>
        <p className="text-lg">Get the best deals on our products!</p>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {saleItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-4">{item.price}</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Buy Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Sale;
