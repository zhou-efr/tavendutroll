import rpgGames from "../../../images/wargame.png";
import split from "../../../images/split.png";
import {Link} from "react-router-dom";
import {GAME_LIST_URL, QUESTS_URL} from "../../../Constant";
import {Header} from "../../Header";

export const Wargame = () => {
    // TODO: wargame description
    return (
        <>
            <Header />
            <div className={'flex flex-col items-center justify-center w-full'}>
                <div className={'flex flex-col items-center justify-center w-3/4'}>
                    <h1 className={'text-8xl mt-8 text-center font-zelda'}>Wargame</h1>
                    <div className={'flex flex-col items-center justify-center'}>
                        <p className={'text-justify lg:text-center my-3'}>
                            Le pôle jeux de rôles est aussi vieux que l’association, son importance n’est donc pas à négliger.
                        </p>
                        <img className={'w-screen-90 m-2 lg:w-1/2'} src={rpgGames} alt={'pandas'}/>
                        <p className={'text-justify lg:text-center my-3'}>
                            Le confinement empêche la mise en place de sessions physiques, mais de multiples outils existent qui permettent de tenir ces dernières à distance. Plusieurs de ces outils étant payants, il n’est malheureusement pas possible d’en utiliser les pleines capacités sans se soumettre à un abonnement.
                        </p>
                        <p className={'text-justify lg:text-center my-3'}>
                            Lors de la réouverture des portes de l’association en septembre, et lors de l’inscription de nouveaux membres, un intérêt plus important que les années précédentes pour le jeu de rôle a été noté. Nous faisions en sorte d’être ouvert tous les jours, et le plus longtemps possible à chaque fois, et pas une fois la Taverne du Troll ne fût vide. Ces personnes n’étaient pas que les membres de l’année précédente, bien au contraire. Nous avons pu recruter énormément de nouveaux venus, comme les L1.
                        </p>
                    </div>
                    <div className={'h-48 w-1/2 relative m-10 hidden lg:block overflow-hidden'}>
                        <img className={"absolute top-0 left-0 z-0"} alt={"windows xp bg"} src={split}/>
                        <div className={"flex flex-row h-full justify-center relative items-center z-50"}>
                            <Link to={QUESTS_URL}>
                                <div className={"flex flex-col hover:text-gray-300 w-48 border-r-white border-r text-white"}>
                                    <h3 className={"text-xl font-bold"}>Trouver une partie</h3>
                                    <p>Coming soon</p>
                                </div>
                            </Link>
                            <Link to={GAME_LIST_URL+'/Wargame'}>
                                <div className={"flex flex-col hover:text-gray-300 pl-6 w-48 text-white"}>
                                    <h3 className={"text-xl font-bold"}>Liste des jeux</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={'w-screen-90 md:w-1/3 m-10 lg:hidden bg-light-brown'}>
                        <div className={"flex flex-col h-full justify-center relative items-center z-50 p-4"}>
                            <Link to={QUESTS_URL}>
                                <div className={"flex flex-col text-center hover:text-gray-300 w-48 text-white mb-2"}>
                                    <h3 className={"text-xl font-bold"}>Trouver une partie</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </Link>
                            <Link to={GAME_LIST_URL+'/RolePlayGame'}>
                                <div className={"flex flex-col text-center hover:text-gray-300 w-48 text-white border-t pt-2"}>
                                    <h3 className={"text-xl font-bold"}>Liste des jeux</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}