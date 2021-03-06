import logo from "../images/logo.png";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {
    ADMIN_URL,
    GAME_LIST_URL,
    HOME_URL,
    OFFICE_URL,
    PARTNER_URL,
    PROFILE_URL,
    STATUTS_URL
} from "../Constant";
import {useAuth0} from "@auth0/auth0-react";

export const Navbar = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    useEffect(() => {
        document.title = "taverne du troll";
    }, [])
    return (
        <div className={"md:fixed z-20 bottom-0 overflow-hidden w-full h-screen md:h-16 bg-tdt-brown flex flex-col md:flex-row justify-center md:justify-start items-center"}>
            <Link to={HOME_URL}><img className={'object-contain m-1 h-48 md:h-16'} src={logo} alt={'Logo de la Taverne du Troll'}/></Link>
            <div className={"md:hidden text-xl flex flex-col items-center text-white gap-2"}>
                <Link to={HOME_URL}><p className={"mr-3"}>Home</p></Link>
                <Link to={OFFICE_URL}><p className={"mr-3"}>Bureau</p></Link>
                <Link to={STATUTS_URL}><p className={"mr-3"}>Satuts</p></Link>
                <Link to={GAME_LIST_URL}><p className={"mr-3"}>Liste des jeux</p></Link>
                <Link to={PARTNER_URL}><p className={"mr-3"}>Partenaires</p></Link>
                { isAuthenticated && <Link to={ADMIN_URL}><p className={"mr-3"}>Admin</p></Link> }
                { isAuthenticated && <Link to={PROFILE_URL}><p className={"mr-3"}>Profile</p></Link> }
                {/*<Link to={ABOUT_URL}><p className={"mr-3"}>About us</p></Link>*/}
                {
                    isAuthenticated ? (
                        <button className={"mr-3 text-tdt-brown bg-white rounded-lg p-2"} onClick={() => logout({returnTo:"http://localhost:3000"})}>logout</button>
                    ):(
                        <button className={"mr-3 text-tdt-brown bg-white rounded-lg p-2"} onClick={() => loginWithRedirect()}>login</button>
                    )
                }
                <a href={'https://faireundon.wwf.fr/don'}>Donnez ?? la wwf</a>
            </div>
            <div className={"hidden md:flex flex-row mx-3 items-center w-full justify-end text-white pr-6"}>
                <Link to={HOME_URL}><p className={"mr-3"}>Home</p></Link>
                <Link to={OFFICE_URL}><p className={"mr-3"}>Bureau</p></Link>
                <Link to={STATUTS_URL}><p className={"mr-3"}>Satuts</p></Link>
                <Link to={GAME_LIST_URL}><p className={"mr-3"}>Liste des jeux</p></Link>
                <Link to={PARTNER_URL}><p className={"mr-3"}>Partenaires</p></Link>
                { isAuthenticated && <Link to={ADMIN_URL}><p className={"mr-3"}>Admin</p></Link> }
                { isAuthenticated && <Link to={PROFILE_URL}><p className={"mr-3"}>Profile</p></Link> }
                {/*<Link to={ABOUT_URL}><p className={"mr-3"}>About us</p></Link>*/}
                {
                    isAuthenticated ? (
                        <button className={"mr-3 px-2 text-tdt-brown bg-white rounded-lg p-1"} onClick={() => logout({returnTo:"http://localhost:3000"})}>logout</button>
                    ):(
                        <button className={"mr-3 px-2 text-tdt-brown bg-white rounded-lg p-1"} onClick={() => loginWithRedirect()}>login</button>
                    )
                }
                <a href={'https://faireundon.wwf.fr/don'}>Donnez ?? la wwf</a>
            </div>
        </div>
    );
}