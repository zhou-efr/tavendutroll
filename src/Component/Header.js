import logo from '../images/logo.png' ;
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className={'h-1/3 w-screen bg-cover bg-wooden-header flex flex-col justify-center items-center'}>
            <Link to={'/'}><img className={'object-cover h-48 m-1'} src={logo} alt={'Logo de la Taverne du Troll'}/></Link>
        </div>
    );
};
