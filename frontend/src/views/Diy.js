import { NavLink } from "react-router-dom";
const Diy = () => {
    return (
        <div className="DIY">
            <h1>DIY</h1>
            <ul>
                    <li style={{backgroundImage:"url(resources/2.jpg)"}}><NavLink to="/diy-category/frame">Frames</NavLink></li>
                    <li style={{backgroundImage: "url(resources/props.jpg)",backgroundSize: "cover"}}><NavLink to="/diy-category/motor">Motors</NavLink></li>
                    <li style={{backgroundImage: "url(resources/motors.jpg)"}}><NavLink to="/diy-category/propeller">Propellers</NavLink></li>
                    <li style={{backgroundImage: "url(resources/contollerm.jpg)",backgroundSize:"contain"}}><NavLink to="/diy-category/flight-controller">Flight Controllers</NavLink></li>
                    <li style={{backgroundImage:"url(resources/dronecontroller.jpeg)"}}><NavLink to="/diy-category/radio">Radios</NavLink></li>
            </ul>
        </div>
    );
}
 
export default Diy;

