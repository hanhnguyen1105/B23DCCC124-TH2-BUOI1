import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const ImageSearch = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${encodeURIComponent(search)}&image_type=photo`);
      const jsonData = await response.json();
      setData(jsonData.hits);
    } catch (error) {
      setError('Không thể tìm thấy hình ảnh. Vui lòng thử lại.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [search]); // fetchData phụ thuộc vào search

  useEffect(() => {
    if (search) {
      fetchData();
    }
  }, [search, fetchData]); // Thêm fetchData vào mảng phụ thuộc

  return (
    <div className="container">
      <h1>Tìm kiếm hình ảnh</h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="Tìm kiếm hình ảnh..."
          onChange={handleSearch}
        />
        <button onClick={fetchData} disabled={loading}>Tìm</button>
      </div>
      {loading && <p>Đang tải...</p>}
      {error && <p>{error}</p>}
      <div className="images">
        {data.map((item, index) => (
          <img key={index} src={item.webformatURL} alt={item.tags} />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
