import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from "./Asset/Homepage";
import NavbarComponents from "./Components/NavbarComponents";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Surahpage from "./Asset/Surahpage";
import Juzpage from "./Asset/Juzpage";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <NavbarComponents/>
              <Routes>
                  <Route path="/" element={<Homepage/>}/>
                  <Route path="/surah" element={<Surahpage/>}/>
                  <Route path="/juz/:id" element={<Juzpage/>}/>

              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
