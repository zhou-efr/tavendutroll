import {Footer} from "./Component/Footer";
import {Header} from "./Component/Header";
import {Navbar} from "./Component/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Component/Pages/Home";
import {Office} from "./Component/Pages/Office";
import {About} from "./Component/Pages/About";
import {Partner} from "./Component/Pages/Partner";
import {Admin} from "./Component/Pages/Pole/Admin/Admin";
import {RolePlayingGame} from "./Component/Pages/Pole/RolePlayingGame";
import {QuestBoard} from "./Component/Pages/Pole/QuestBoard";
import {Wargame} from "./Component/Pages/Pole/Wargame";
import {
    ABOUT_URL,
    ADMIN_URL, EVENTS_URL, GAME_LIST_URL, GAME_URL,
    HOME_URL,
    OFFICE_URL,
    PARTNER_URL, PROFILE_URL,
    QUESTS_URL,
    RECORDS_URL,
    RPG_URL, STATUTS_URL,
    WARGAME_URL
} from "./Constant";
import {Quest} from "./Component/Pages/Pole/Quest";
import {Record} from "./Component/Pages/Record";
import {Event} from "./Component/Pages/Event";
import {GameList} from "./Component/Pages/Pole/list/GameList";
import {Game} from "./Component/Pages/Pole/list/Game";
import {Statuts} from "./Component/Pages/Statuts";
// import {useAuth0} from "@auth0/auth0-react";
import {Profile} from "./Component/Pages/Profile";

function App() {
    return (
        <div className={'absolute top-0 left-0 min-h-screen h-screen w-screen overflow-x-hidden font-sans [scroll-behavior:smooth]'}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={PROFILE_URL} element={<Profile />}/>
                    <Route path={OFFICE_URL} element={<Office />}/>
                    <Route path={ABOUT_URL} element={<About />}/>
                    <Route path={PARTNER_URL} element={<Partner />}/>
                    <Route path={ADMIN_URL} element={<Admin />}/>
                    <Route path={STATUTS_URL} element={<Statuts />}/>
                    <Route path={RPG_URL} element={<RolePlayingGame />}/>
                    <Route path={WARGAME_URL} element={<Wargame />}/>
                    <Route path={QUESTS_URL} element={<QuestBoard />}/>
                    <Route path={QUESTS_URL+'/:id'} element={<Quest />}/>
                    <Route path={RECORDS_URL+'/:id'} element={<Record />}/>
                    <Route path={EVENTS_URL+'/:id'} element={<Event />}/>
                    <Route path={GAME_LIST_URL} element={<GameList />}/>
                    <Route path={GAME_LIST_URL+'/:type'} element={<GameList />}/>
                    <Route path={GAME_URL+'/:id'} element={<Game />}/>
                    <Route path={HOME_URL} element={<Home />}/>
                </Routes>
                <Footer />
                <Navbar />
            </BrowserRouter>
        </div>
        // <>
        //     {
        //         !isLoading ? (
        //
        //         ):(
        //             <div className={"w-screen h-screen flex items-center justify-center"}>
        //                 <h1 className={"text-xl text-tdt-brown font-zelda"}>Loading, please wait</h1>
        //             </div>
        //         )
        //     }
        // </>
    );
}

export default App;
