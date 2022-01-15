import {Footer} from "./Component/Footer";
import {Header} from "./Component/Header";
import {Navbar} from "./Component/Navbar";
import {BrowserRouter, Routes} from "react-router-dom";

function App() {
  return (
      <div className={'absolute top-0 left-0 min-h-screen h-screen w-screen overflow-x-hidden'}>
          <BrowserRouter>
              <Header />
              <div className={'h-3/4'}>
                  <h1 className="text-3xl font-bold">taverne du troll</h1>
              </div>
              <Footer />
              <Navbar />
          </BrowserRouter>
      </div>
  );
}

export default App;
