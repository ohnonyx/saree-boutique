import Header from './Components/Header';
import Footer from './Components/Footer';
import Filter from './Components/Filter';

function SearchPage() {
  return (
    <div className="SearchPage">
      <Header className="header"/>
      <Filter className="body"/>
      <Footer className="footer"/>
    </div>
  );
}

export default SearchPage;
