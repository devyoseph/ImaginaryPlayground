import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MiddlePage from "./pages/MiddlePage/MiddlePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import HomePage from "./pages/HomePage/HomePage";

import KidsInfoPage from "./pages/KidsInfoPage/KidsInfoPage";
import KidsInfoCreatePage from "./pages/KidsInfoPage/KidsInfoCreatePage";
import Mypage from "./pages/UserPage/Mypage";
import QnaListPage from "./pages/QnaPage/QnaListPage";
import QnaCreatePage from "./pages/QnaPage/QnaCreatePage";
import QnaDetailPage from "./pages/QnaPage/QnaDetailPage";
import { useEffect } from "react";

import "../src/App.css";

// let persistor = persistStore(store);
function App() {
  //const dispatch = useDispatch();
  useEffect(() => {
    //console.log(currentUser);
    // //비동기로 유저 정보 불러옴 그 후 토큰저장
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sadpage" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/middlepage" element={<MiddlePage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/kidinfo" element={<KidsInfoPage />} />
          <Route path="/kidinfocreate" element={<KidsInfoCreatePage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/qnapage" element={<QnaListPage />} />
          <Route path="/qnacreatepage" element={<QnaCreatePage />} />
          <Route path="/qnadetailpage" element={<QnaDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
