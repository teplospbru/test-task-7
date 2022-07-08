import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer/reducer";
import './App.css';

// Screens
import FavouriteCats from './screens/FavouriteCats';
import AllCats from './screens/AllCats';

// Components
import ParticularCat from "./components/ParticularCat";

function App() {
  const [{ cats, favouriteCats, error, modal, particularCat, page, favouritePage, particularCatArr, source }, dispatch] = useReducer( reducer, initialState );
console.log(particularCatArr)
  return (
    <Router>
      <div className="App">
        {/* { Меню хедера } */}
        <header>
          <nav className='container'>
            <ul>
              <Link to='/'><li>Все котики</li></Link>
              <Link to='/favourites'><li>Любимые котики</li></Link>
            </ul>
          </nav>
        </header>

        <Routes>
          {/* { Любимые котики } */}
          <Route path='/favourites' element={ <FavouriteCats 
              dispatch={ dispatch } 
              favouriteCats={ favouriteCats } 
              page={ favouritePage }
              error={ error }
              /> } />
          {/* { Все котики } */}
          <Route path='/' element={ <AllCats 
              cats={ cats }  
              dispatch={ dispatch } 
              favouriteCats={ favouriteCats } 
              page={ page }
              error={ error }
            /> } />
        </Routes>
        {/* { Модальное окно } */}
        { modal && ( <ParticularCat 
          dispatch={ dispatch } 
          modal={ modal } 
          particularCat={ particularCat } 
          favouriteCats={ favouriteCats }
          source={ source }
        /> ) }
      </div>
    </Router>
  );
}

export default App;