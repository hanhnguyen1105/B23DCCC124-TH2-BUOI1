import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
    const [newItem, setNewItem] = useState(""); // Quản lý input state
    const [items, setItems] = useState([]); // Quản lý danh sách các mục
    const [completedItems, setCompletedItems] = useState([]); // Quản lý danh sách các mục đã hoàn thành
    const [editingIndex, setEditingIndex] = useState(null); // Quản lý chỉ số mục đang chỉnh sửa
    const [editingValue, setEditingValue] = useState(""); // Giá trị chỉnh sửa của mục

    useEffect(() => {
        const savedItems = localStorage.getItem('items');
        const savedCompletedItems = localStorage.getItem('completedItems');
        if (savedItems) {
            setItems(JSON.parse(savedItems)); // Convert string to array
        }
        if (savedCompletedItems) {
            setCompletedItems(JSON.parse(savedCompletedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('completedItems', JSON.stringify(completedItems));
    }, [items, completedItems]);

    const handleAddItem = () => {
        if (newItem !== "") {
            setItems([...items, newItem]); // Thêm mục mới vào danh sách
            setNewItem(""); // Xóa trắng ô input
        }
    };

    const handleItemClick = (index) => {
        if (completedItems.includes(index)) {
            setCompletedItems(completedItems.filter((itemIndex) => itemIndex !== index)); // Bỏ hoàn thành
        } else {
            setCompletedItems([...completedItems, index]); // Đánh dấu là đã hoàn thành
        }
    };

    const handleDelete = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        setCompletedItems(completedItems.filter((itemIndex) => itemIndex !== index)); // Xóa khỏi danh sách hoàn thành
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingValue(items[index]);
    };

    const handleSaveEdit = (index) => {
        const newItems = [...items];
        newItems[index] = editingValue;
        setItems(newItems);
        setEditingIndex(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Todo List</h1>
                <div className="App-input">
                    <input
                        type="text"
                        className="inputItem"
                        placeholder="Nội dung công việc"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)} // Cập nhật giá trị input
                    />
                    <button className="addBtn" onClick={handleAddItem}>Thêm</button>
                </div>
                <ul className="itemList">
                    {items.map((item, index) => (
                        <li key={index} className="item">
                            <input
                                type="checkbox"
                                checked={completedItems.includes(index)}
                                onChange={() => handleItemClick(index)}
                            />
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                />
                            ) : (
                                <span
                                    style={{
                                        textDecoration: completedItems.includes(index) ? 'line-through' : 'none',
                                        color: completedItems.includes(index) ? 'green' : 'black'
                                    }}
                                >
                                    {item}
                                </span>
                            )}
                            {editingIndex === index ? (
                                <>
                                    <button onClick={() => handleSaveEdit(index)}>Lưu lại</button>
                                    <button onClick={() => setEditingIndex(null)}>Hủy</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEdit(index)}>Chỉnh sửa</button>
                                    <button onClick={() => handleDelete(index)}>Xóa</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
export default App;
