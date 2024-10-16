import React, { useState, useEffect } from 'react';
import './App.css'; // Import file CSS

const getRandomColor = () => {
  const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const App = () => {
  const [currentColor, setCurrentColor] = useState('red');
  const [colorHistory, setColorHistory] = useState(['red']);
  const [autoChange, setAutoChange] = useState(false);

  // Hàm này được gọi để thay đổi màu hiện tại và thêm vào lịch sử
  const changeColor = () => {
    const newColor = getRandomColor();
    setCurrentColor(newColor);
    setColorHistory(prevHistory => [...prevHistory, newColor]); // Cập nhật lịch sử màu
  };

  // useEffect để tự động thay đổi màu khi bật autoChange
  useEffect(() => {
    let interval;
    if (autoChange) {
      interval = setInterval(() => {
        changeColor(); // Thay đổi màu liên tục mỗi 1 giây
      }, 1000);
    }
    return () => clearInterval(interval); // Clear interval khi autoChange bị tắt
  }, [autoChange]);

  // Hàm bật/tắt autoChange
  const toggleAutoChange = () => {
    setAutoChange(!autoChange);
  };

  // Hàm để undo, loại bỏ màu cuối cùng khỏi lịch sử
  const undoChange = () => {
    if (colorHistory.length > 1) {
      const newHistory = colorHistory.slice(0, colorHistory.length - 1);
      setColorHistory(newHistory);
      setCurrentColor(newHistory[newHistory.length - 1]);
    }
  };

  return (
    <div className="container">
      <h1>Random Color</h1>
      <div className="button-group">
        <button onClick={changeColor}>Change Background Color</button>
        <button onClick={undoChange} disabled={colorHistory.length === 1}>
          Undo
        </button>
        <button onClick={toggleAutoChange}>
          {autoChange ? 'Stop Auto Change' : 'Start Auto Change'}
        </button>
      </div>

      <div className="color-display">
        <h2>Current Color:</h2>
        <div className="current-color" style={{ backgroundColor: currentColor }}></div>
      </div>

      <div className="color-history">
        <h2>Color History:</h2>
        <ul>
          {colorHistory.map((color, index) => (
            <li key={index} className={`color-item ${color}`}>
              <span className="dot" style={{ color }}>•</span> {color}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;