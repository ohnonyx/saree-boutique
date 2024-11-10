import React, { useState } from 'react';
import Header from './Header';
import './UserPage.css';
import Footer from './Footer';
import saree1 from './saree.png';  // Image source for the product
import user from './User.jpg';
<link href='https://fonts.googleapis.com/css?family=Didact Gothic'></link>;
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&display=swap"></link>

const UserPage = () => {
    // Define static past orders for the user
    const [pastOrders] = useState([
        {
            orderId: 1,
            date: "2024-10-10",
            items: [
                { name: 'Traditional Silk Saree', price: 4500, quantity: 2, imageUrl: saree1 },
                { name: 'Cotton Saree', price: 3000, quantity: 1, imageUrl: saree1 }
            ]
        },
        {
            orderId: 2,
            date: "2024-09-25",
            items: [
                { name: 'Chiffon Saree', price: 3500, quantity: 1, imageUrl: saree1 }
            ]
        }
    ]);

    // Calculate total price for each past order
    const calculateOrderTotal = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className='Users'>
            <Header />
            <div className='UserPage'>
                {/* Wrap the whole 'Important' section in a user-card div */}
                <div className='user-card'>
                    <img className="Userpicturedummy" src={user}/>
                    <br></br>
                    <h1 className='Headings'>Hello Naomi P, Welcome ! </h1>
                    <p className='user-detail'>User details</p>
                    {/* User Details Table */}
                    <table className='UserTable'>
                        <tbody>
                            <tr>
                                <td className='column1User' width='50%'>
                                    <tr><td>Username:</td><td>Naomi.P</td></tr>
                                    <tr><td>Email:</td><td>NaomiP@mail.com</td></tr>
                                    <tr><td>Phone:</td><td>1234567890</td></tr>
                                </td>
                                <td className='column2User' width='50%'>
                                    <tr><td>Current Address:</td><td>123, 1st main, 4th block, Jng, Bangal, africa</td></tr>
                                    <button className='Userbuttonsaddress'>Change Address</button>
                                    <br/>
                                    <tr><td>Password:</td><td>******</td><button className='Userbuttonspassword'>Change Password</button></tr>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                {/* Past Orders Section */}
                <div className='PastHistory'>
                    <h3 className='Headings2'>Past Orders</h3>
                    {/* Display Each Past Order */}
                    {pastOrders.map((order) => (
                        <div key={order.orderId} className="order-card">
                            <h4>Order ID: {order.orderId}</h4>
                            <p>Date of Purchase: {order.date}</p>

                            {/* Display Items in Each Order */}
                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img src={item.imageUrl} alt={item.name} className="order-item-image" />
                                        <div className="order-item-details">
                                            <p>{item.name}</p>
                                            <p>Price: ₹{item.price}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Total: ₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Display Order Total */}
                            <div className="order-total">
                                <p><strong>Total: ₹{calculateOrderTotal(order.items)}</strong></p>
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
