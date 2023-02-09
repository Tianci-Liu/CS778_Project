import './App.css';
import router from './router';

import { useRoutes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';


function App () {

  const elements = useRoutes(router)
  return (
    <div className="App">
      <Header />
      <div className='container'>
        {elements}
      </div>
      <Footer />
    </div>
  );
}

export default App;
