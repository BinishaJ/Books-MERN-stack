import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./View";
import Edit from "./Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/edit/:isbn" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
