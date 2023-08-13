import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UploadPage from "./components/UploadPage/UploadPage";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authUser } from "./store/thunkFunctions";
import ProtectedPage from "./components/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import WalletCreate from "./components/WalletCreate/WalletCreate";
import WalletManager from "./components/WalletCreate/WalletManager";

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Header />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("isAuth Data", isAuth);
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index el element={<LandingPage />} />
        {/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Route>

        {/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/walletCreate" element={<WalletCreate />} />
          <Route path="/walletManageMent" element={<WalletManager />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
