import './App.css';
import Header from '../src/Components/Header'
import Carousel from './Components/Carousel';
import Categories from './Components/Categories';
import Footer from './Components/Footer';
import SearchPage from './SearchPage';
import AboutUsnew from './Components/AboutUsnew';
import Itempage from './Components/Items/Itempage';
import CartPage from './Components/CartPage';
import User from './Components/UserPage'

function App() {
  return (
    <div className="App">
      <Header/>
      <Carousel/>
      <Categories/>
      <Footer/>
      <SearchPage/>
      <CartPage/>
      <AboutUsnew/>
      <Itempage/>
      <User/>
    </div>
  );
}

export default App;
