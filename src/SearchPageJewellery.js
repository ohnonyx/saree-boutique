import Header from './Components/Header';
import Footer from './Components/Footer';
import JFilter from './Components/JewellryFilter';

function SearchPageJewellery() {
  return (
    <div className="SearchPage">
      <Header className="header"/>
      <JFilter className="body"/>
      <Footer className="footer"/>
    </div>
  );
}

export default SearchPageJewellery;