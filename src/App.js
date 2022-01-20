import {Footer} from "./Component/Footer";
import {Header} from "./Component/Header";
import {Navbar} from "./Component/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Component/Pages/Home";
import {Office} from "./Component/Pages/Office";
import {About} from "./Component/Pages/About";
import {Partner} from "./Component/Pages/Partner";
import {Admin} from "./Component/Pages/Admin";
import {RolePlayingGame} from "./Component/Pages/Pole/RolePlayingGame";
import {QuestBoard} from "./Component/Pages/Pole/QuestBoard";
import {Wargame} from "./Component/Pages/Pole/Wargame";
import {ABOUT_URL, ADMIN_URL, HOME_URL, OFFICE_URL, PARTNER_URL, QUESTS_URL, RPG_URL, WARGAME_URL} from "./Constant";

function App() {
  return (
      <div className={'absolute top-0 left-0 min-h-screen h-screen w-screen overflow-x-hidden font-sans'}>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path={OFFICE_URL} element={<Office />}/>
                  <Route path={ABOUT_URL} element={<About />}/>
                  <Route path={PARTNER_URL} element={<Partner />}/>
                  <Route path={ADMIN_URL} element={<Admin />}/>
                  <Route path={RPG_URL} element={<RolePlayingGame />}/>
                  <Route path={WARGAME_URL} element={<Wargame />}/>
                  <Route path={QUESTS_URL} element={<QuestBoard />}/>
                  <Route path={HOME_URL} element={<Home />}/>
              </Routes>
              <Footer />
              <Navbar />
          </BrowserRouter>
      </div>
  );
}

export default App;
