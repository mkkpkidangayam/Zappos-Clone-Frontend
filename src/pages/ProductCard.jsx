const ProductCard = () => {
  return (
    <article className="bg-white shadow-md rounded-lg p-6 mb-4">
      <a
        className="block text-xl font-semibold mb-4 hover:text-blue-500"
        href="/p/cole-haan-grand-atlantic-textured-sneaker-tornado-nubuck-woodbury-ivory/product/9889656/color/1053639"
      >
        Cole Haan - Grand Atlantic Textured Sneaker. Color Tornado
        Nubuck/Woodbury/Ivory. On sale for $92.69. MSRP $110.00. 5.0 out of 5
        stars
      </a>
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
            aria-pressed={false}
            aria-label="Favorite this item."
            data-test-id="heartButton"
          ></button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 focus:outline-none"
            aria-label="Selected color, Tornado Nubuck/Woodbury/Ivory, button"
            type="button"
            data-state="closed"
          >
            <img
              alt="Gray"
              className="w-8 h-8"
              src="https://swch-cl2.olympus.zappos.com/webp/fabric/27567/27580/9889656/6264192.webp"
            />
          </button>
          <button
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 focus:outline-none"
            aria-label="Color, Truffle Nubuck/Ivory, button"
            type="button"
            data-state="closed"
          >
            <img
              alt="Brown"
              className="w-8 h-8"
              src="https://swch-cl2.olympus.zappos.com/webp/fabric/27567/27580/9889656/6366655.webp"
            />
          </button>
          <button
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 focus:outline-none"
            aria-label="Color, Black/Black/Ivory, button"
            type="button"
            data-state="closed"
          >
            <img
              alt="Black"
              className="w-8 h-8"
              src="https://swch-cl2.olympus.zappos.com/webp/fabric/27567/27580/9889656/6264172.webp"
            />
          </button>
        </div>
      </div>
      <a
        className="block text-blue-500 hover:underline mb-2"
        href="/p/cole-haan-grand-atlantic-textured-sneaker-tornado-nubuck-woodbury-ivory/product/9889656/color/1053639"
      >
        <span className="font-semibold">Brand Name: </span>Cole Haan
      </a>
      <a
        className="block text-blue-500 hover:underline mb-2"
        href="/p/cole-haan-grand-atlantic-textured-sneaker-tornado-nubuck-woodbury-ivory/product/9889656/color/1053639"
      >
        <span className="font-semibold">Product Name: </span>Grand Atlantic
        Textured Sneaker
      </a>
      <p className="mb-2">
        <span className="font-semibold">Color: </span>Tornado
        Nubuck/Woodbury/Ivory
      </p>
      <p className="mb-2">
        <span className="font-semibold">Price: </span>$92.69. MSRP $110.00.
      </p>
      <p className="mb-2">
        <span className="font-semibold">Rating: </span>
        <span className="flex items-center">
          <svg
            className="w-4 h-4 fill-current text-yellow-500 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          5.0 out of 5 stars
        </span>
      </p>
    </article>
  );
};

export default ProductCard;
