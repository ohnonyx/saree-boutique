import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import CartPage from './CartPage';
import Aboutusnew from './Components/AboutUsnew';
import Login from './Components/Login';
import Signin from './Components/Signin';
import UserPage from './Components/UserPage';
import SearchPageJewellery from './SearchPageJewellery';
import ItemPage from './Components/Itempage';
import ItemPageSaree from './Components/Itempagesaree';


export const RoutesforPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/searchSaree" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/aboutus" element={<Aboutusnew/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/user" element={<UserPage/>}/>
        <Route path="/searchJewellery" element={<SearchPageJewellery/>} />
        <Route path="/saree/:id" element={<ItemPageSaree/>} />
        <Route path="/jewel/:id" element={<ItemPage/>} />
      </Routes>
    </Router>
  );
};


