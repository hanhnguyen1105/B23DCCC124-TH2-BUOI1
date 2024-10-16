import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoList from './TodoList'; // Đảm bảo đúng đường dẫn
import ImageSearch from './imagesearch/ImgaSearch';
import RandomColor from './RandomColor/RandomColor';

ReactDOM.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>,
  document.getElementById('root')
);
function App() {
  return (
    <div className="App">
      <ImageSearch />
    </div>
  );
}

export default App;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RandomColor />
  </React.StrictMode>
);


