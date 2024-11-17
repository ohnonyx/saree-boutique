import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';
import saree1 from './saree.png';
import user from './User.jpg';

const UserPage = () => {
  const { userData, setUserId, setUserData } = useContext(UserContext); // Access context
  const [logoutMessage, setLogoutMessage] = useState(null); // For showing logout message
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      // Redirect to sign-in if userData is null
      navigate('/signin');
    }
  }, [userData, navigate]);

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    if (isConfirmed) {
      // Clear user data and redirect
      setUserId(null);
      setUserData(null);
      setLogoutMessage('You have been logged out successfully.');
      setTimeout(() => {
        navigate('/signin'); // Redirect to the sign-in page
      }, 1500);
    }
  };

  if (!userData) {
    return <p>Redirecting to sign-in...</p>; // Handle the null case gracefully
  }

  return (
    <div className="Users">
      <Header />
      <div className="UserPage">
        <div className="user-card">
          <img className="Userpicturedummy" src={user} alt="User" />
          <h1 className="Headings">Hello {userData.name}, Welcome!</h1>
          <p className="user-detail">User details</p>
          <table className="UserTable">
            <tbody>
              <tr>
                <td className="column1User" width="50%">
                  <tr>
                    <td>Username:</td>
                    <td>{userData.name}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{userData.number}</td>
                  </tr>
                </td>
                <td className="column2User" width="50%">
                  <tr>
                    <td>Current Address:</td>
                    <td>{userData.address}</td>
                  </tr>
                  <tr>
                    <td>Password:</td>
                    <td>**</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button className="Userbuttonspassword" onClick={handleLogout}>
                        Logout
                      </button>
                    </td>
                  </tr>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {logoutMessage && <div className="logout-message">{logoutMessage}</div>} {/* Display logout message */}
        <div className="PastHistory">
          <h3 className="Headings2">Past Orders</h3>
          {userData.pastOrders.map((order) => (
            <div key={order.orderId} className="order-card">
              <h4>Order ID: {order.orderId}</h4>
              <p>Date of Purchase: {order.date}</p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.imageUrl || saree1} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <p>{item.name}</p>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: ₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <p>
                  <strong>Total: ₹{calculateOrderTotal(order.items)}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
