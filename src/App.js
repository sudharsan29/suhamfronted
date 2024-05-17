import './App.css';
import CreateForm from './CreateForm';
import CreateForm1 from './CreateForm1';
import CreateForm3 from './CreateForm3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<CreateForm />} />
          <Route path="/createform1" element={<CreateForm1 />} />
          <Route path="/createform3" element={<CreateForm3 />} />
        </Routes>
    </div>
  );
}

export default App;
