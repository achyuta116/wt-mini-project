import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
const Navbar = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    useEffect(() => {
        const unlisten = history.listen((location, action) => {
            setUsername('')
            fetch('http://localhost:8000/get-user', {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    if(data.authenticated){
                        setUsername(data.user.email);   
                    }
                })
                .catch(console.log)
        })
        return () => { unlisten() }
    })
    
    const handleLogout = () => {
        fetch('http://localhost:8000/logout', {
            credentials: 'include'
        })
            .then(() => {
                console.log('successfully logged out')
                history.push('/login');
            })
            .catch(console.log)
    }
    return (
        <nav>
            <h1><NavLink to="/">DRONEDEX</NavLink></h1>
            {username && <span className="username">{username.match(/(\S+)(?=@)/g,'')} | <span><NavLink to="/cart">TO CART</NavLink></span></span>}
            {!username && <NavLink to="/signup" className="btn">Signup</NavLink>}
            {!username && <NavLink to="/login" className="btn">Login</NavLink>}
            {username && <div onClick={handleLogout} className="btn">Logout</div>}
        </nav>
    );
}
 
export default Navbar;