import logo from './logo.svg';
import './App.css';
import Login_Sing from './pages/Login_SignUp';
import HomePage from './pages/HomePage';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <div className="App">
       <CookiesProvider>   
        <Login_Sing/>
    {/* <HomePage/> */}
    </CookiesProvider>
 
    </div>
  );
}

export default App;
