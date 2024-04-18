import React, { useContext, useState, useEffect } from "react";
import myContext from "../context/myContextxt";

const Sidebar = () => {
  const { product } = useContext(myContext);
  const [filterOptions, setFilterOptions] = useState({
    sizes: [],
    genders: [],
    subCategories: [],
    mainCategories: [],
    colors: [],
    brands: [],
    priceRange: {
      min: 0,
      max: 0,
    },
    minPrice: 0,
    maxPrice: 0,
  });

  useEffect(() => {
    if (product && product.length > 0) {
      const sizesSet = new Set();
      const gendersSet = new Set();
      const subCategoriesSet = new Set();
      const mainCategoriesSet = new Set();
      const colorsSet = new Set();
      const brandsSet = new Set();
      let minPrice = Infinity;
      let maxPrice = -Infinity;

      product.forEach((item) => {
        sizesSet.add(item.size);
        gendersSet.add(item.gender);
        subCategoriesSet.add(item.subCategory);
        mainCategoriesSet.add(item.mainCategory);
        colorsSet.add(item.color);
        brandsSet.add(item.brand);
        if (item.price < minPrice) minPrice = item.price;
        if (item.price > maxPrice) maxPrice = item.price;
      });

      setFilterOptions({
        sizes: Array.from(sizesSet),
        genders: Array.from(gendersSet),
        subCategories: Array.from(subCategoriesSet),
        mainCategories: Array.from(mainCategoriesSet),
        colors: Array.from(colorsSet),
        brands: Array.from(brandsSet),
        priceRange: { min: minPrice, max: maxPrice },
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    }
  }, [product]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: parseInt(value),
    }));
  };

  return (
    <div className="w-64 md:block bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Filter By</h2>

      {/* Sizes */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sizes</h3>
        <ul>
          {filterOptions.sizes.map((size) => (
            <li key={size}>
              <input type="checkbox" id={size} name={size} />
              <label htmlFor={size}>{size}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Genders */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Genders</h3>
        <ul>
          {filterOptions.genders.map((gender) => (
            <li key={gender}>
              <input type="checkbox" id={gender} name={gender} />
              <label htmlFor={gender}>{gender}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Sub Categories */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sub Categories</h3>
        <ul>
          {filterOptions.subCategories.map((subCategory) => (
            <li key={subCategory}>
              <input type="checkbox" id={subCategory} name={subCategory} />
              <label htmlFor={subCategory}>{subCategory}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Categories */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Main Categories</h3>
        <ul>
          {filterOptions.mainCategories.map((mainCategory) => (
            <li key={mainCategory}>
              <input type="checkbox" id={mainCategory} name={mainCategory} />
              <label htmlFor={mainCategory}>{mainCategory}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Colors</h3>
        <ul>
          {filterOptions.colors.map((color) => (
            <li key={color}>
              <input type="checkbox" id={color} name={color} />
              <label htmlFor={color}>{color}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Brands</h3>
        <ul>
          {filterOptions.brands.map((brand) => (
            <li key={brand}>
              <input type="checkbox" id={brand} name={brand} />
              <label htmlFor={brand}>{brand}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center mb-2">
          <input
            type="number"
            name="minPrice"
            value={filterOptions.minPrice}
            onChange={handlePriceChange}
            className="mr-2 px-2 w-24 py-1 border rounded"
            placeholder="Min"
          />
          -
          <input
            type="number"
            name="maxPrice"
            value={filterOptions.maxPrice}
            onChange={handlePriceChange}
            className="ml-2 px-2 w-24 py-1 border rounded"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          name="priceRange"
          min={filterOptions.priceRange.min}
          max={filterOptions.priceRange.max}
          value={filterOptions.minPrice}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
