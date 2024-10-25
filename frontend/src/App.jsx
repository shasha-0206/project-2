import './index.css';
import Body from './components/Body';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import Navbar from './components/Navbar';
import CompleteData from './components/CompleteData';

function App() {
  return (
    <Router> {/* Wrap the application with BrowserRouter */}
      <Routes>
        <Route path="/" element={<Navbar />}> {/* Parent route with Navbar */}
          {/* Child routes that will render inside the Outlet */}
          <Route path="All-Files" element={<CompleteData />} />
          <Route path="/" element={<Body />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
