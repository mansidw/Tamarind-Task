import './App.css';
import React,{Fragment} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Gallery from './pages/Gallery';

function App() {
  return (
    <Router>
      <Fragment>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Landing/>}></Route>
            <Route exact path="/gallery" element={<Gallery/>}></Route>
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
