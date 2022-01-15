import logo from '../images/logo.png' ;

export const Header = (props) => {
    return (
        <div className={'h-1/4 w-screen bg-cover bg-wooden-header flex flex-col justify-center items-center'}>
            <img className={'object-cover h-full m-1'} src={logo} alt={'Logo de la Taverne du Troll'}/>
        </div>
    );
};
