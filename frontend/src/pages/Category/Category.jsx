import React, { useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './Category.css';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useState } from 'react';

export default function Category() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (minPrice) params.append('new_price__gt', minPrice);
      if (maxPrice) params.append('new_price__lt', maxPrice);
      if (sortOption === 'lowest') params.append('ordering', 'new_price');
      else if (sortOption === 'highest')
        params.append('ordering', '-new_price');
      else if (sortOption === 'oldest') params.append('ordering', 'created_at');
      params.append('page', currentPage);

      const response = await fetch(
        `http://localhost:8000/api/store/products/?${params.toString()}`
      );
      const data = await response.json();

      setProducts(data.results || []); // اگر از DRF استفاده می‌کنی
      setTotalPages(Math.ceil(data.count / 10)); // یا هر عددی که صفحه‌بندی‌ت داره
    } catch (err) {
      setError('مشکلی در دریافت اطلاعات پیش آمد.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    fetchProducts();
  }, [currentPage, sortOption, minPrice,maxPrice]);

  console.log(products);

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
          <label>حداقل قیمت:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1); // صفحه‌بندی رو ریست کن روی ۱
            }}
          />
          <label>حداکثر قیمت:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
          />
          <label>مرتب‌سازی:</label>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">-- انتخاب --</option>
            <option value="lowest">ارزان‌ترین</option>
            <option value="highest">گران‌ترین</option>
            <option value="oldest">قدیمی‌ترین</option>
          </select>
        </div>
        <div className="product-list-container">
          {isLoading ? (
            <p className='loading-message'>در حال دریافت محصولات...</p>
          ) : error ? (
            <p>{error}</p>
          ) : products.length === 0 ? (
            <p>محصولی یافت نشد.</p>
          ) : (
            <div className="product-list-container">
              {products.map((product, index) => (
                <ProductCard key={index + product.title} product={product} />
              ))}
            </div>
          )}
        </div>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="prev-next-button"
          >
            قبلی
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (pageNum) =>
                Math.abs(pageNum - currentPage) <= 2 || // فقط اطراف currentPage
                pageNum === 1 ||
                pageNum === totalPages // صفحه اول و آخر همیشه باشن
            )
            .map((pageNum, idx, arr) => {
              // اضافه کردن "..." به جاهایی که فاصله افتاده
              const prev = arr[idx - 1];
              if (prev && pageNum - prev > 1) {
                return (
                  <React.Fragment key={pageNum}>
                    <span className="dots">...</span>
                    <button
                      onClick={() => setCurrentPage(pageNum)}
                      className={`page-button ${
                        currentPage === pageNum ? 'active' : ''
                      }`}
                    >
                      {pageNum}
                    </button>
                  </React.Fragment>
                );
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`page-button ${
                    currentPage === pageNum ? 'active' : ''
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="prev-next-button"
          >
            بعدی
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
