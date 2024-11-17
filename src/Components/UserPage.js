import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import Header from './Header';
import Footer from './Footer';
import './UserPage.css';
import saree1 from './saree.png'; 
import user from './User.jpg';
import axios from 'axios'; // Import Axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle redirection
import Modal from './Modal'; // Import the modal component

const UserPage = () => {
  const { userData } = useContext(UserContext); // Access userData from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(null); // For showing logout message
  const [newAddress, setNewAddress] = useState(''); // State to store new address
  const [showAddressInput, setShowAddressInput] = useState(false); // Toggle input visibility
  const [updateMessage, setUpdateMessage] = useState(''); // To display update message
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // To handle redirection to home page

  useEffect(() => {
    if (userData) {
      setLoading(false); // Set loading to false once data is available
    }
  }, [userData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");
    if (isConfirmed) {
      // Clear the user data from the context (or wherever you're managing session)
      setLogoutMessage("Logged out successfully.");
      navigate('/login');
      window.location.reload();
    } else {
      setLogoutMessage("Logout canceled.");
    }
  };

  const handleChangeAddress = () => {
    setShowAddressInput(true); // Show the address input field
  };

  const handleSubmitAddressChange = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/user/update-address', {
        userId: userData._id,  // Ensure userData._id is present and correct
        newAddress: newAddress  // Ensure newAddress is not empty
      });
  
      if (response.data.success) {
        setUpdateMessage('Address updated successfully! Login again to see the change.');
        setShowModal(true); // Show the modal when address update is successful
        setShowAddressInput(false); // Hide the input field after submission
        
      } else {
        setUpdateMessage('Failed to update address. Please try again.');
        setShowModal(true); // Show modal in case of failure
      }
    } catch (error) {
      console.error('Error updating address:', error);  // Log the actual error in console
      setUpdateMessage('An error occurred. Please try again.');
      setShowModal(true); // Show modal in case of error
    }
    
  };

  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (isConfirmed) {
      axios.delete(`http://localhost:5000/api/user/delete-account/${userData._id}`)
        .then((response) => {
          console.log(response.data);
          alert('Your account has been deleted successfully.');
          navigate('/'); // Redirect to home after account deletion
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting account:', error);
          alert('An error occurred while deleting your account. Please try again.');
        });
    } else {
      alert('Account deletion canceled.');
    }
  };

  return (
    <div className='Users'>
      <Header />
      <div className='UserPage'>
        <div className='user-card'>
          <img className="Userpicturedummy" src={user} alt="User" />
          <h1 className='Headings'>Hello {userData.name}, Welcome!</h1>
          <p className='user-detail'>User details</p>
          <table className='UserTable'>
            <tbody>
              <tr>
                <td className='column1User' width='50%'>
                  <tr><td>Username:</td><td>{userData.name}</td></tr>
                  <tr><td>Email:</td><td>{userData.email}</td></tr>
                  <tr><td>Phone:</td><td>{userData.number}</td></tr>
                </td>
                <td className='column2User' width='50%'>
                  <tr><td>Current Address:</td><td>{userData.address}</td></tr>
                  <tr>
                    <td>
                      <button className='Userbuttonsaddress' onClick={handleChangeAddress}>Change Address</button>
                    </td>
                  </tr>
                  {showAddressInput && (
                    <tr>
                      <td>
                        <input
                          type="text"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="Enter new address"
                        />
                      </td>
                      <td>
                        <button className='handleaddress' onClick={handleSubmitAddressChange}>Submit</button>
                      </td>
                    </tr>
                  )}
                  <tr><td>Password:</td><td>********</td></tr>
                  <button className='UserbuttonsLogout' onClick={handleLogout}>Logout</button>
                  <button className='UserDelete' onClick={handleDeleteAccount}>Delete Account</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal for Address Update Result */}
        {showModal && (
          <Modal 
            message={updateMessage} 
            onClose={() => setShowModal(false)}
            
          />
        )}

        {logoutMessage && <div className="logout-message">{logoutMessage}</div>} {/* Display logout message */}
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;