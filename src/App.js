import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Create from "./components/Create";
import Display from "./components/Display";
import Edit from "./components/Edit";
import Error from "./components/Error";

function App() {
  const url = "https://blog-app-with-mern.herokuapp.com/";
  return (
    <Router>
        <div className = "App">
          <div id = "main-content">
            <Header />
            <Routes>
              <Route exact path = "/" element = {<Home url = {url}/>}/>
              <Route path = "/create" element = {<Create url = {url}/>}/>
              <Route path = "/edit/:id" element = {<Edit url = {url}/>} />
              <Route path = "/:id" element = {<Display url = {url}/>} />
              <Route path = "*" element = {<Error />}/>
            </Routes>
          </div>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
