import { useState } from 'react'
import './App.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function Sidebar({ activeComponent, setActiveComponent }: { 
  activeComponent: string; 
  setActiveComponent: (component: string) => void 
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <nav>
        <button 
          className={activeComponent === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveComponent('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeComponent === 'todo' ? 'active' : ''} 
          onClick={() => setActiveComponent('todo')}
        >
          Todo
        </button>
        <button 
          className={activeComponent === 'calculator' ? 'active' : ''} 
          onClick={() => setActiveComponent('calculator')}
        >
          Calculator
        </button>
        <button 
          className={activeComponent === 'education' ? 'active' : ''} 
          onClick={() => setActiveComponent('education')}
        >
          Education
        </button>
        <button 
          className={activeComponent === 'blog' ? 'active' : ''} 
          onClick={() => setActiveComponent('blog')}
        >
          Blog
        </button>
      </nav>
    </div>
  );
}

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);

  const calculate = (expression: string): string => {

    try {
      // Replace special functions
      let expr = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/\^/g, '**');
      
      return eval(expr).toString();
    } catch (error) {
      return 'Error';
    }
  };

  const handleClick = (value: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(value);
    } else if (value === '=') {
      setDisplay(calculate(display));
    } else if (value === 'C') {
      setDisplay('0');
    } else if (value === 'M+') {
      setMemory(memory + Number(calculate(display)));
    } else if (value === 'MR') {
      setDisplay(memory.toString());
    } else if (value === 'MC') {
      setMemory(0);
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="keypad">
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('*')}>×</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('=')}>=</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('sin')}>sin</button>
        <button onClick={() => handleClick('cos')}>cos</button>
        <button onClick={() => handleClick('tan')}>tan</button>
        <button onClick={() => handleClick('^')}>^</button>
        <button onClick={() => handleClick('sqrt')}>√</button>
        <button onClick={() => handleClick('C')}>C</button>
        <button onClick={() => handleClick('M+')}>M+</button>
        <button onClick={() => handleClick('MR')}>MR</button>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <p>Welcome to your personal dashboard!</p>
      </div>
    </div>
  );
}

function Education() {
  return (
    <div className="education">
      <h1>Education</h1>
      <div className="education-content">
        <p>Educational resources and materials will be displayed here.</p>
      </div>
    </div>
  );
}

function Blog() {
  return (
    <div className="blog">
      <h1>Blog</h1>
      <div className="blog-content">
        <p>Blog posts and articles will be shown here.</p>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'todo':
        return (
          <div className="todo-container">
            <h1>Todo App</h1>
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo"
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
              {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'calculator':
        return (
          <div className="calculator-container">
            <h1>Engineering Calculator</h1>
            <Calculator />
          </div>
        );
      case 'education':
        return <Education />;
      case 'blog':
        return <Blog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <main className="main-content">
        {renderComponent()}
      </main>
    </div>
  )
}

export default App
