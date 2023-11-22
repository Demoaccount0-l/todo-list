import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';


import './App.css';

function App() {

  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }


    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);

    setAllTodos(updateTodoArr);
    //naming covention for localStrage key
    localStorage.setItem('todo-List', JSON.stringify(updateTodoArr));
    setNewTitle('');
    setNewDescription('');
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todo-List'));

    let savedCompletedToDos = JSON.parse (
      localStorage.getItem ('completedTodos')
    );

    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if(savedCompletedToDos){
      setCompletedTodos(savedCompletedToDos);
    }

  }, [])

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todo-List', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);

  }

  const handleComplete = (index) =>{
    const now = new Date();
    var dd = now.getDate();
    var mm = now.getMonth();
    var year = now.getFullYear();
    var min = now.getMinutes();
    var hr = now.getHours();
    var sec = now.getSeconds();

    var finalDate = dd + '-' + mm + '-' + year + ' at ' + hr + ':' + min + ':' + sec;

    let filteredTodo = {
      ...allTodos[index],
      completedOn : finalDate
    }

    let UpdatedCompletedList = [...completedTodos, filteredTodo];
    setCompletedTodos(UpdatedCompletedList);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (UpdatedCompletedList)
    );
    handleDeleteTodo(index);
  }


  const handleCompletedTodoDelete = (index) => {
    let reducedCompletdeTodo = [...completedTodos];
    reducedCompletdeTodo.splice(index,1);
    setCompletedTodos(reducedCompletdeTodo);
    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletdeTodo));
    
    
  }

  


  return (
    <div className='App'>
      <h2>My Todo List</h2>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} id="title" placeholder="What's the task title?" />
          </div>
          <div className='todo-input-item'>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} id='description' placeholder="What's the task description?" />
          </div>
          <div className="todo-input-item">
            <button type="button" className='primary-btn' onClick={handleAddTodo}>
              Add Todo
            </button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete"
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                  />
                  <BsCheckLg
                    title="Completed"
                    className=" check-icon"
                    onClick={() => handleComplete(index)}
                  />
                  
                </div>
              </div>
            );
          })}

          {isCompletedScreen === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>{item.completedOn}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                  />
                </div>
              </div>
            );
          })}


        </div>
      </div>
    </div>
  );
}

export default App;