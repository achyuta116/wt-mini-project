import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Incorrect URL entered</p>
            <NavLink to="/">Click to go back to home page</NavLink>
        </div>
    );
}
 
export default NotFound;