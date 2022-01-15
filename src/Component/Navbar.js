import logo from "../images/logo.png";
import {Link} from "react-router-dom";

export const Navbar = (props) => {
  return (
      <div className={"fixed bottom-0 overflow-hidden w-full h-16 bg-tdt-brown flex flex-row justify-start items-center"}>
          <Link to={'/'}><img className={'object-contain h-full m-1 h-16'} src={logo} alt={'Logo de la Taverne du Troll'}/></Link>
          <div className={"flex flex-row mx-3 w-1/3 items-center text-white"}>
              <Link to={'/'}><p className={"mr-3"}>Home</p></Link>
              <Link to={'/office'}><p className={"mr-3"}>Bureau</p></Link>
              <Link to={'/partner'}><p className={"mr-3"}>Partenaires</p></Link>
              <Link to={'/about'}><p className={"mr-3"}>About us</p></Link>
              <a href={'https://faireundon.wwf.fr/don'}>Donnez à la wwf</a>
          </div>
      </div>
  );
}