import { NavLink } from "react-router-dom";
import Slideshow from "./imageCarousel.js";
import Para from "./article";

const Home = () => {
  return (
    <div>
      <div className="menu-bar">
        <NavLink to="/diy">DIY</NavLink>
        <NavLink to="/spare">SPARE PARTS</NavLink>
        <NavLink to="/prebuilt">PREBUILT</NavLink>
        <NavLink to="/vendor">VENDOR</NavLink>
      </div>
      <div className="slideshow">
        <Slideshow />
      </div>
      <div className="logos">
        <div>
          <img src="resources\logo1.png" alt="logo1" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ipsa itaque doloremque ut sint temporibus qui, nesciunt odit mollitia enim veli</p>
        </div>
        <div>
          <img id="dji" src="resources\logo2.png" alt="logo1" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sit vero consectetur ut sequi vitae a maxime et quod unde, suscipit debit</p>
        </div>
        <div>
          <img src="resources\logo3.png" alt="logo1" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magnam assumenda fugit obcaecati quisquam sapiente nisi? Fuga accusantium</p>
        </div>
      </div>
      <div className="para">
        <Para />
      </div>
    </div>
  );
};

export default Home;
