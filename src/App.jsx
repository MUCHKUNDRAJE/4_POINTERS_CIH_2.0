import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./routes/Home";
import Select from "./routes/Select";
import { Camera } from "lucide-react";
import CameraCapture from "./routes/camera";
import Loading from "./routes/loading";
import OutputVedio from "./routes/output";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/select" element={<Select />} />
                   <Route path="/camera" element={<CameraCapture/>} />
                    <Route path="/loader" element={<Loading/>} />
                       <Route path="/output" element={<OutputVedio/>} />
      </Routes>
    </Router>
  );
}

export default App;
