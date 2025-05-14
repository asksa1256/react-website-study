import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CoursePage from "./pages/CoursePage";
import WishListPage from "./pages/WishlistPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route index element={<CourseListPage />} />
            <Route path="react-frontend-development" element={<CoursePage />} />
          </Route>
          <Route path="wishlist" element={<WishListPage />} />
          <Route path="questions" element={<QuestionListPage />} />
          <Route path="questions/616825" element={<QuestionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
