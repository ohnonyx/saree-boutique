import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import CartPage from './CartPage';
import Aboutusnew from './Components/AboutUsnew';

export const RoutesforPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="*" element={<div>Page Not Found</div>} /> Not found route */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/aboutus" element={<Aboutusnew/>}/>
      </Routes>
    </Router>
  );
};
