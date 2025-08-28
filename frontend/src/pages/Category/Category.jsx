import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import ProductCard from '../../Components/ProductCard/ProductCard';
import './Category.css';

export default function Category() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
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

      const res = await fetch(
        `http://localhost:8000/api/store/products/?${params.toString()}`
      );
      if (!res.ok) throw new Error('خطا در دریافت اطلاعات');
      const data = await res.json();

      setProducts(data.results || []);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      setError(err.message || 'مشکلی در دریافت اطلاعات پیش آمد.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, minPrice, maxPrice, sortOption]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePriceChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visiblePages = pages.filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
    );

    const paginationItems = [];
    let lastPage = 0;

    visiblePages.forEach((page) => {
      if (page - lastPage > 1) {
        paginationItems.push(
          <span key={`dots-${page}`} className="dots">
            ...
          </span>
        );
      }
      paginationItems.push(
        <button
          key={page}
          className={`page-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      );
      lastPage = page;
    });

    return (
      <div className="pagination">
        <button
          className="prev-next-button"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          قبلی
        </button>

        {paginationItems}

        <button
          className="prev-next-button"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          بعدی
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {/* فیلترها */}
        <div className="filters-container">
          <label>حداقل قیمت:</label>
          <input
            type="number"
            value={minPrice}
            onChange={handlePriceChange(setMinPrice)}
          />

          <label>حداکثر قیمت:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handlePriceChange(setMaxPrice)}
          />

          <label>مرتب‌سازی:</label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">-- انتخاب --</option>
            <option value="lowest">ارزان‌ترین</option>
            <option value="highest">گران‌ترین</option>
            <option value="oldest">قدیمی‌ترین</option>
          </select>
        </div>

        {/* لیست محصولات */}
        <div className="product-list-container">
          {isLoading ? (
            <p className="loading-message">در حال دریافت محصولات...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : products.length === 0 ? (
            <p className="no-products">محصولی یافت نشد.</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {renderPagination()}
      </div>
      <Footer />
    </>
  );
}
