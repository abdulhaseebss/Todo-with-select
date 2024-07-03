import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const App = () => {
  const [inputVal, setInputVal] = useState('');
  const [todoArr, setTodoArr] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);

  // Function to handle form submission for adding todos
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal === "") {
      return alert("Please enter any text");
    }
    setTodoArr([...todoArr, inputVal]);
    setInputVal("");
  };

  // Function to handle deletion of a specific todo
  const handleDelete = (i) => {
    const updatedTodos = [...todoArr.slice(0, i), ...todoArr.slice(i + 1)];
    setTodoArr(updatedTodos);
    setSelectedTodos(selectedTodos.filter(item => item !== i));
  };

  // Function to handle editing of a specific todo
  const handleEdit = (item, i) => {
    const newVal = prompt("Edit Todo", item);
    if (newVal === null) {
      return;
    }
    const updatedTodos = [...todoArr];
    updatedTodos[i] = newVal;
    setTodoArr(updatedTodos);
  };

  // Function to handle checkbox selection/deselection
  const handleCheckBox = (i) => {
    if (selectedTodos.includes(i)) {
      setSelectedTodos(selectedTodos.filter(item => item !== i));
    } else {
      setSelectedTodos([...selectedTodos, i]);
    }
  };

  // Function to handle deletion of selected todos
  const handleDeleteSelected = () => {
    const updatedTodos = todoArr.filter((_, i) => !selectedTodos.includes(i));
    setTodoArr(updatedTodos);
    setSelectedTodos([]);
  };

  // Function to handle deletion of all todos
  const handleDeleteAll = () => {
    setTodoArr([]);
    setSelectedTodos([]);
  };

  return (
    <>
      <div className='p-4 flex items-center justify-between bg-gray-400'>
        <h1 className='text-2xl font-semibold'>Todo App</h1>
        <h1 className='text-xs font-semibold'>By AH</h1>
      </div>

      <form onSubmit={handleSubmit} className='flex justify-center gap-3 mt-5'>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className='bg-blue-300 px-3 p-2 rounded-md outline-none text-black font-semibold'
          type="text"
          placeholder='Enter Text Please'
        />
        <button
          type='submit'
          className='bg-green-500 text-white rounded-lg transition-all active:bg-green-700 hover:bg-green-600 hover:border-none hover:text-white border-black px-5 font-semibold'
        >
          Add
        </button>
      </form>

      <div className='mt-3 ml-2'>
        <button
          onClick={handleDeleteSelected}
          className={`bg-red-500 text-white rounded-lg transition-all active:bg-red-700 hover:bg-red-600 hover:border-none border-black px-3 font-semibold text-sm p-2 ${selectedTodos.length > 0 ? '' : 'cursor-not-allowed opacity-50'}`}
          disabled={selectedTodos.length === 0}
        >
          <input type="checkbox" checked={selectedTodos.length > 0} readOnly /> Delete Selected Todos
        </button>
        <button
          onClick={handleDeleteAll}
          className='bg-red-500 text-white rounded-lg transition-all active:bg-red-700 hover:bg-red-600 hover:border-none border-black px-3 font-semibold text-sm p-2 ml-3'
        >
          Delete All
        </button>
      </div>

      <div>
        {todoArr.length > 0 ? (
          todoArr.map((item, i) => (
            <div key={i} className='p-3'>
              <div className='flex items-center gap-3 mb-2'>
                <label className='font-semibold list-none ml-2 p-1'>
                  <input
                    type="checkbox"
                    checked={selectedTodos.includes(i)}
                    onChange={() => handleCheckBox(i)}
                    className='mr-2'
                  />
                  {item}
                </label>
                <button
                  onClick={() => handleDelete(i)}
                  className='bg-red-500 text-white rounded-lg transition-all active:bg-red-700 hover:bg-red-600 hover:border-none border-black px-3 font-semibold text-sm p-2'
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => handleEdit(item, i)}
                  className='bg-blue-500 text-white rounded-lg transition-all active:bg-blue-700 hover:bg-blue-600 hover:border-none border-black px-3 p-2 text-sm font-semibold'
                >
                  <FiEdit />
                </button>
              </div>
              <hr className='border-gray-400'/>
            </div>
          ))
        ) : (
          <h1>No Todo</h1>
        )}
      </div>
    </>
  );
};

export default App;
