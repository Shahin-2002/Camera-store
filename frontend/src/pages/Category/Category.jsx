import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './Category.css';
import { CgArrowsVAlt } from 'react-icons/cg';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Category() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/store/products/')
      .then(response => response.json())
      .then(data => {setProducts(data) 
        console.log(products)
      });
  }, []);
  
  const sampleProducts = [
    {
      id: 1,
      title: 'دوربین مداربسته AHD',
      image: '/images/camera3.jpg',
      oldPrice: 1200000,
      newPrice: 950000,
    },
    {
      id: 2,
      title: 'دوربین وای‌فای',
      image: '/images/camera2.jpg',
      oldPrice: 1400000,
      newPrice: 1150000,
    },

    // بقیه محصولات...
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [sortOption, setSortOption] = useState('lowest');

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="filters-container">
          <label htmlFor="sort-options">مرتب‌سازی بر اساس:</label>
          <select
            id="sort-options"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="lowest">ارزان‌ترین</option>
            <option value="highest">گران‌ترین</option>
            <option value="oldest">قدیمی‌ترین</option>
          </select>
        </div>
        <div className="product-list-container">
          {products.map((product, index) => (
            <ProductCard key={index + product.title} product={product} />
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
