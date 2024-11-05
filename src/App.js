import './App.css';
import Header from '../src/Components/Header'
import Carousel from './Components/Carousel';
import Categories from './Components/Categories';
import Footer from './Components/Footer';
import SearchPage from './SearchPage';
import Login from './Login';
import CartPage from './CartPage';
import Signin from './Signin';

function App() {
  return (
    <div className="App">
      <Header/>
      <Carousel/>
      <Categories/>
      <Footer/>
      {/* <SearchPage/> */}
     
      <Header/>
      <Login/>
      <Footer/>

      <Header/>
      <CartPage/>
      <Footer/>

      <Header/>
      <Signin/>
      <Footer/>
    </div>
  );
}

export default App;
