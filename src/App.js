import './App.css';
import Header from '../src/Components/Header'
import Carousel from './Components/Carousel';
import Categories from './Components/Categories';
import Footer from './Components/Footer';
import SearchPage from './SearchPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Carousel/>
      <Categories/>
      <Footer/>
      <SearchPage/>
    </div>
  );
}

export default App;
