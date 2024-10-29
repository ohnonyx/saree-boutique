import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SearchPage from './SearchPage';

export const RoutesforPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="*" element={<div>Page Not Found</div>} /> Not found route */}
      </Routes>
    </Router>
  );
};
