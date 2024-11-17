import { RoutesforPage } from './Routes';
import { UserProvider } from './Components/UserContext'; 
import './App.css';

function App() {
  return (
    <UserProvider>
      <RoutesforPage/>
    </UserProvider>
  );
}

export default App;
