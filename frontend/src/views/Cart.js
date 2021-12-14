import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');
    const history = useHistory();
    const handleClick = () => {
        fetch('http://localhost:8000/get-user', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if(data.authenticated){
                    return fetch(`http://localhost:8000/order-history`, {
                        credentials: 'include',
                        method: 'POST',
                        headers: new Headers({'content-type' : 'application/json'}),
                        body: JSON.stringify({userEmail: data.user.email})
                    })
                } else {
                    throw Error('Not authenticated')
                }
            })
            .then(response => response.json())
            .then(responseBody => {
                console.log(responseBody)
                alert('Order Confirmed')
                history.push('/')
            })
            .catch(err => {
                setError(err.message)
            })
    }
    useEffect(() => {
        fetch('http://localhost:8000/get-user', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if(data.authenticated){
                    return fetch(`http://localhost:8000/cart/${data.user.email}`, {
                        credentials: 'include',
                    })
                } else {
                    throw Error('Not authenticated')
                }
            })
            .then(response => {
                return response.json()
            })
            .then(responseBody => {
                setCart(responseBody.cart)
            })
            
            .catch(err => {
                setError(err.message);
            })
    },[])
    return ( 
        <div className="cart">
            <h1>CART</h1>
            {error && <div className="error">{error}</div>}
            {!cart && <div>No </div>}
            {cart && (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div>
                            {cart.map((element, index) => {
                                return (
                                    <div key={index} className="product">
                                        <span>
                                            <div className="product-name">{element.partName}</div>
                                            <div className="product-email">{element.vendorEmail}</div>
                                        </span>
                                        <div className="product-desc">{element.partDescription}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='order-confirmation'>
                            <p>Total number of items:</p>
                            <p className='item-number'>{cart.length}</p>
                            <div className="btn" onClick={handleClick}>Checkout</div>
                        </div>
                    </div>
                )}
        </div>
    );
}
 
export default Cart;