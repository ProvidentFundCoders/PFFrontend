import './App.css';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import { Route, Routes } from 'react-router';
import Userdata from './pages/Userdata';
import DataInput from './pages/dataInput';

function App() {
  return (
    <main>
       <Navbar/>
       <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/userdata' element={<Userdata />}></Route>
        <Route path='/inputdata' element={<DataInput />}></Route>
       </Routes>
       <Footer />
    </main>
  );
}

export default App;
