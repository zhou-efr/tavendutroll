import logo from "../images/logo.png";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {ABOUT_URL, ADMIN_URL, GAME_LIST_URL, HOME_URL, OFFICE_URL, PARTNER_URL, STATUTS_URL} from "../Constant";

export const Navbar = () => {
    useEffect(() => {
        document.title = "taverne du troll";
    }, [])
    return (
        <div className={"md:fixed z-20 bottom-0 overflow-hidden w-full h-96 md:h-16 bg-tdt-brown flex flex-col md:flex-row md:justify-start items-center"}>
            <Link to={HOME_URL}><img className={'object-contain m-1 h-48 md:h-16'} src={logo} alt={'Logo de la Taverne du Troll'}/></Link>
            <div className={"md:hidden text-xl flex flex-col items-center text-white"}>
                <Link to={HOME_URL}><p className={"mr-3"}>Home</p></Link>
                <Link to={OFFICE_URL}><p className={"mr-3"}>Bureau</p></Link>
                <Link to={STATUTS_URL}><p className={"mr-3"}>Satuts</p></Link>
                <Link to={ADMIN_URL}><p className={"mr-3"}>Admin</p></Link>
                <Link to={GAME_LIST_URL}><p className={"mr-3"}>Liste des jeux</p></Link>
                <Link to={PARTNER_URL}><p className={"mr-3"}>Partenaires</p></Link>
                <Link to={ABOUT_URL}><p className={"mr-3"}>About us</p></Link>
                <a href={'https://faireundon.wwf.fr/don'}>Donnez à la wwf</a>
            </div>
            <div className={"hidden md:flex flex-row mx-3 w-1/2 items-center text-white"}>
                <Link to={HOME_URL}><p className={"mr-3"}>Home</p></Link>
                <Link to={OFFICE_URL}><p className={"mr-3"}>Bureau</p></Link>
                <Link to={STATUTS_URL}><p className={"mr-3"}>Satuts</p></Link>
                <Link to={ADMIN_URL}><p className={"mr-3"}>Admin</p></Link>
                <Link to={GAME_LIST_URL}><p className={"mr-3"}>Liste des jeux</p></Link>
                <Link to={PARTNER_URL}><p className={"mr-3"}>Partenaires</p></Link>
                <Link to={ABOUT_URL}><p className={"mr-3"}>About us</p></Link>
                <a href={'https://faireundon.wwf.fr/don'}>Donnez à la wwf</a>
            </div>
        </div>
    );
}