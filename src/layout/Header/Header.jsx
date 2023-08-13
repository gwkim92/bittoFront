import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "../../Sections/NavItem";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);
  const handleMenu = () => {
    setMenu(!menu);
  };
  // Wallet 버튼 클릭 시 처리하는 함수
  const handleWalletClick = () => {
    if (userData?.publicKey) {
      // 니모닉 코드가 존재하는 경우 지갑 페이지로 이동
      navigate("/wallet");
    } else {
      // 니모닉 코드가 없는 경우 지갑 생성 페이지로 이동
      navigate("/walletCreate");
    }
  };

  return (
    <section className="relative z-10 text-white bg-black">
      <div className="w-full">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-10">
          <div className="flex items-center text-exl h-14">
            <Link to="/">Bitto</Link>
          </div>
          <div className="text-2xl sm:hidden">
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div>

          <div>
            <button onClick={handleWalletClick}>Wallet</button>
          </div>
          <div className="hidden sm:block">
            <NavItem />
          </div>
        </div>

        {/* mobile v*/}
        <div className="block sm:hidden">{menu && <NavItem mobile />}</div>
      </div>
    </section>
  );
};

export default Header;
