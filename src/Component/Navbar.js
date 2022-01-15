import logo from "../images/logo.png";
import {Link} from "react-router-dom";

export const Navbar = (props) => {
  return (
      <div className={"fixed bottom-0 overflow-hidden w-full h-16 bg-tdt-brown flex-row justify-start items-center"}>
          <Link to={'/'}><img className={'object-contain h-full m-1'} src={logo} alt={'Logo de la Taverne du Troll'}/></Link>
          <Link to={'/'}>Home</Link>
          <Link to={'/office'}>Bureau</Link>
      </div>
  );
}