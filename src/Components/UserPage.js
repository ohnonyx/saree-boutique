import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import Header from './Header';
import Footer from './Footer';
import './UserPage.css';
import saree1 from './saree.png'; 
import user from './User.jpg';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import Modal from './Modal'; 
import Modal2 from './Modal2'; // Import Modal2 for confirmation

const UserPage = () => {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(null); 
  const [newAddress, setNewAddress] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [showConfirmModal, setShowConfirmModal] = useState(false); // For showing confirmation modal
  const [actionToConfirm, setActionToConfirm] = useState(null); // To track the action (logout or delete)
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleLogout = () => {
    setActionToConfirm('logout');
    setShowConfirmModal(true); // Show the confirmation modal for logout
  };

  const handleDeleteAccount = () => {
    setActionToConfirm('delete');
    setShowConfirmModal(true); // Show the confirmation modal for account deletion
  };

  const handleConfirmAction = () => {
    if (actionToConfirm === 'logout') {
      // Perform logout action
      setLogoutMessage("Logged out successfully.");
      navigate('/login');
      window.location.reload();
      setShowConfirmModal(false);
    } else if (actionToConfirm === 'delete') {
      // Perform delete account action
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
      setShowConfirmModal(false);
    }
  };

  const handleCancelAction = () => {
    setShowConfirmModal(false); // Close the modal without performing any action
  };

  const handleChangeAddress = () => {
    setShowAddressInput(true); 
  };

  const handleSubmitAddressChange = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/user/update-address', {
        userId: userData._id,
        newAddress: newAddress
      });
  
      if (response.data.success) {
        setUpdateMessage('Address updated successfully! Login again to see the changes!');
        setShowModal(true);
        setShowAddressInput(false);
      } else {
        setUpdateMessage('Failed to update address. Please try again.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error updating address:', error);
      setUpdateMessage('An error occurred. Please try again.');
      setShowModal(true);
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

        {showModal && (
          <Modal 
            message={updateMessage} 
            onClose={() => setShowModal(false)} 
          />
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <Modal2 
            message={actionToConfirm === 'logout' ? "Are you sure you want to log out?" : "Are you sure you want to delete your account?"}
            onConfirm={handleConfirmAction}
            onCancel={handleCancelAction}
          />
        )}

        {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;