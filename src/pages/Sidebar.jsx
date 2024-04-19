import React, { useContext, useState, useEffect } from "react";
import myContext from "../context/myContextxt";

const Sidebar = () => {
  const { product } = useContext(myContext);
  const [filterOptions, setFilterOptions] = useState({
    genders: [],
    selectedGender: "",
    mainCategories: [],
    selectedMainCategory: "",
    subCategories: [],
    selectedSubCategory: "",
    sizes: [],
    selectedSizes: [],
    colors: [],
    selectedColors: [],
    priceRange: {
      min: 0,
      max: 0,
    },
    minPrice: 0,
    maxPrice: 0,
  });

  useEffect(() => {
    if (product && product.length > 0) {
      const gendersSet = new Set();
      const mainCategoriesSet = new Set();
      const subCategoriesSet = new Set();
      const sizesSet = new Set();
      const colorsSet = new Set();
      let minPrice = Infinity;
      let maxPrice = -Infinity;

      product.forEach((item) => {
        gendersSet.add(item.gender);
        mainCategoriesSet.add(item.category.main);
        subCategoriesSet.add(item.category.sub);
        item.sizes.forEach((size) => sizesSet.add(size.size));
        colorsSet.add(item.color);
        if (item.price < minPrice) minPrice = item.price;
        if (item.price > maxPrice) maxPrice = item.price;
      });

      setFilterOptions({
        genders: Array.from(gendersSet),
        selectedGender: "",
        mainCategories: Array.from(mainCategoriesSet),
        selectedMainCategory: "",
        subCategories: Array.from(subCategoriesSet),
        selectedSubCategory: "",
        sizes: Array.from(sizesSet),
        selectedSizes: [],
        colors: Array.from(colorsSet),
        selectedColors: [],
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

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      selectedGender,
      selectedMainCategory: "",
      selectedSubCategory: "",
      selectedSizes: [],
      selectedColors: [],
    }));
  };

  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = e.target.value;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      selectedMainCategory,
      selectedSubCategory: "",
      selectedSizes: [],
      selectedColors: [],
    }));
  };

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = e.target.value;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      selectedSubCategory,
      selectedSizes: [],
      selectedColors: [],
    }));
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    const { selectedSizes } = filterOptions;
    const updatedSizes = selectedSizes.includes(value)
      ? selectedSizes.filter((size) => size !== value)
      : [...selectedSizes, value];
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      selectedSizes: updatedSizes,
    }));
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    const { selectedColors } = filterOptions;
    const updatedColors = selectedColors.includes(value)
      ? selectedColors.filter((color) => color !== value)
      : [...selectedColors, value];
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      selectedColors: updatedColors,
    }));
  };

  return (
    <div className="w-64 md:block bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Filter By</h2>

      {/* Genders */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Genders</h3>
        <select
          value={filterOptions.selectedGender}
          onChange={handleGenderChange}
          className="border rounded px-2 py-1"
        >
          <option value="">Select Gender</option>
          {filterOptions.genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      {/* Main Categories */}
      {filterOptions.selectedGender && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Main Categories</h3>
          <select
            value={filterOptions.selectedMainCategory}
            onChange={handleMainCategoryChange}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Main Category</option>
            {filterOptions.mainCategories.map((mainCategory) => (
              <option key={mainCategory} value={mainCategory}>
                {mainCategory}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sub Categories */}
      {filterOptions.selectedMainCategory && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sub Categories</h3>
          <select
            value={filterOptions.selectedSubCategory}
            onChange={handleSubCategoryChange}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Sub Category</option>
            {filterOptions.subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Sizes */}
      {filterOptions.selectedSubCategory && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sizes</h3>
          {filterOptions.sizes.map((size) => (
            <div key={size} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={size}
                name={size}
                checked={filterOptions.selectedSizes.includes(size)}
                onChange={handleSizeChange}
              />
              <label htmlFor={size} className="ml-2">
                {size}
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Colors */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Colors</h3>
        {filterOptions.colors.map((color) => (
          <div key={color} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={color}
              name={color}
              checked={filterOptions.selectedColors.includes(color)}
              onChange={handleColorChange}
            />
            <label htmlFor={color} className="ml-2">
              {color}
            </label>
          </div>
        ))}
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
