import logo from "../images/logo.png";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {ABOUT_URL, HOME_URL, OFFICE_URL, PARTNER_URL} from "../Constant";

export const Navbar = (props) => {
    useEffect(() => {
        document.title = "taverne du troll";
    }, [])
    // TODO: make navbar responsive
    return (
        <div className={"fixed z-20 bottom-0 overflow-hidden w-full h-16 bg-tdt-brown flex flex-row justify-start items-center"}>
          <Link to={HOME_URL}><img className={'object-contain m-1 h-16'} src={logo} alt={'Logo de la Taverne du Troll'}/></Link>
          <div className={"flex flex-row mx-3 w-1/3 items-center text-white"}>
              <Link to={HOME_URL}><p className={"mr-3"}>Home</p></Link>
              <Link to={OFFICE_URL}><p className={"mr-3"}>Bureau</p></Link>
              <Link to={PARTNER_URL}><p className={"mr-3"}>Partenaires</p></Link>
              <Link to={ABOUT_URL}><p className={"mr-3"}>About us</p></Link>
              <a href={'https://faireundon.wwf.fr/don'}>Donnez à la wwf</a>
          </div>
        </div>
    );
}