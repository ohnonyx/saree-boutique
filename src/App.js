import { RoutesforPage } from './Routes';
import { UserProvider } from './Components/UserContext'; // Import UserProvider
import './App.css';
// import User from './BackEnd/models/User';

function App() {
  return (
    <UserProvider>
      <RoutesforPage/>
    </UserProvider>
  );
}

export default App;
