import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ThemeProvider from './ThemeContext';

const App = () => {
  return (
    <div className="w-full overflow-hidden">
      <ThemeProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
