import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SlideShow from "./SlideShow";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Mặc định chuyển hướng đến slide đầu tiên */}
        <Route path="/" element={<Navigate to="/0?click=0" replace />} />
        {/* Route để hiển thị các slide */}
        <Route path="/:slideIndex" element={<SlideShow />} />
        {/* Route fallback nếu người dùng nhập URL không hợp lệ */}
        <Route path="*" element={<h1>404 - Slide not found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
