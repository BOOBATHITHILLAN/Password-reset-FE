import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login';
import PasswordReset from './Components/PasswordReset';
import PasswordUpdate from './Components/PasswordUpdate';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const url="https://password-reset-87fo.onrender.com";

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login url={url}/>}></Route>     
        <Route path='/Signup' element={<Signup url={url}/>} ></Route>
        <Route path='/forgotpassword' element={<PasswordReset url={url}/>}></Route>
        <Route path='/passwordreset/:id' element={<PasswordUpdate url={url}/>}></Route>
      </Routes>
      
    </Router>
  );
}

export default App;
