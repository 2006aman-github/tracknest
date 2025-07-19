import Router from './routes/routes';
import Form from '@/pages/forms/login.jsx';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login');
  //   }
  // }, [isAuth, navigate]);

    return <>
      {/* {isAuth ? <Router /> : <Form />} */}
      <Router/>
    </>
  
}

export default App;
