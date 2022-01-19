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

function App() {
  return (
      <div className={'absolute top-0 left-0 min-h-screen h-screen w-screen overflow-x-hidden'}>
          <BrowserRouter>
              <Header />
              <Routes>
                  <Route path={"/office"} element={<Office />}/>
                  <Route path={"/about"} element={<About />}/>
                  <Route path={"/partner"} element={<Partner />}/>
                  <Route path={"/admin"} element={<Admin />}/>
                  <Route path={"/pole/rpg"} element={<RolePlayingGame />}/>
                  <Route path={"/pole/wargame"} element={<Wargame />}/>
                  <Route path={"/pole/rpg/quests"} element={<QuestBoard />}/>
                  <Route path={"/"} element={<Home />}/>
              </Routes>
              <Footer />
              <Navbar />
          </BrowserRouter>
      </div>
  );
}

export default App;
