import { Link, Route, Routes } from "react-router-dom";
import Search from "../../page/search/search";
import Main from "../../page/main/main";
import Category from "../../page/catgegory/category";

import Regist from "../../page/account/regist/regist";
import Point from "../../page/point/point";
import Product from "../../page/product/product";
import Sell from "../../page/sell/sell";
import MyStore from "../../page/mystore/mystore";

import { List } from "../list";
import NotLogin from "../../Component/LoginInfo/NotLogin";
import Maneger from "../../Component/LoginInfo/Maneger";
import Login from "../../Component/LoginInfo/Login";

import { useBreakPoint } from "../../CustomHook/BreakPoint";
import { CgFormatJustify } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { BiPurchaseTag } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoAccessibility } from "react-icons/io5";
import LoginPage from "../../page/account/login/login";
import { useState } from "react";
import MobileModal from "../../Component/Mobile/Modal/MobileModal";

interface IProps {
  userlogin: boolean;
  main: List[];
  catepage: List[];
  searchpage: List[];
}

const Layout = ({
  userlogin,
  main,
  catepage,
  searchpage,
}: IProps): JSX.Element => {
  const [modal, setModal] = useState(false);
  const [ModalContent, setModalContent] = useState("");
  const MenuOn = () => {
    setModal(true);
    setModalContent("menu");
  };
  const SearchOn = () => {
    setModal(true);
    setModalContent("search");
  };
  const ModalOff = () => {
    setModal(false);
  };
  console.log(modal);
  const { isdesktop, ismobile } = useBreakPoint();
  const authority = false;

  return (
    <div>
      <div>
        <div className="p-1 h-[6rem] bg-orange-200">
          <div className="Box h-[100%] flex justify-between items-center ">
            <Link to={"/"}>
              <div className="center">
                {ismobile && (
                  <div className="flex flex-col items-center" onClick={MenuOn}>
                    <div>
                      <CgFormatJustify size={40} />
                    </div>
                    <div className="text-[0.8rem]">메뉴</div>
                  </div>
                )}
                <img src="/imgs/hamster.png" className="h-[4rem]"></img>
                <div
                  className={`${
                    isdesktop && "text-[2rem] text-white font-bold"
                  } ${ismobile && "text-[1rem] text-white font-bold"}`}
                >
                  햄스터마켓
                </div>
              </div>
            </Link>
            {!userlogin ? (
              <NotLogin />
            ) : !authority ? (
              <Login ModalOn={SearchOn} />
            ) : (
              <Maneger />
            )}
          </div>
        </div>
        {!modal ? (
          <Routes>
            <Route path="/" element={<Main list={main} />}></Route>
            <Route
              path="/category/:id"
              element={<Category list={catepage} />}
            ></Route>
            <Route
              path={`/search/:id`}
              element={<Search list={searchpage} />}
            ></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/sell" element={<Sell />}></Route>
            <Route path="/mystore" element={<MyStore />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/regist" element={<Regist />}></Route>
            <Route path="/point" element={<Point />}></Route>
          </Routes>
        ) : (
          <div>
            {ismobile && (
              <MobileModal ModalOff={ModalOff} ModalContent={ModalContent} />
            )}
          </div>
        )}
        {isdesktop && (
          <div>
            <div className="border border-t border-b">
              <div className="py-[1rem] Box center text-gray-400 ">
                <div>팀이름</div>
                <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>
                <div>프로젝트 이름</div>
                <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>

                <div>팀원명단</div>
                <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>

                <div>담당영역</div>
                <div className="mx-[1.5rem] h-[1rem] border border-[1px] border-gray-200 "></div>

                <div>깃주소</div>
              </div>
            </div>
          </div>
        )}
        {ismobile && (
          <div className="h-[6em] flex justify-evenly items-center sticky bottom-0 bg-gray-300 border border-t">
            <Link to={"/"}>
              <div className="flex flex-col items-center ">
                <IoHome size={30} />
                <div>홈</div>
              </div>
            </Link>
            <Link to={"/mystore"}>
              <div className="flex flex-col items-center ">
                <BiPurchaseTag size={30} />
                <div>구매상품</div>
              </div>
            </Link>
            <Link to={"/sell"}>
              <div className="flex flex-col items-center ">
                <CgAdd size={30} />
                <div>등록</div>
              </div>
            </Link>
            <Link to={"/mystore"}>
              <div className="flex flex-col items-center ">
                <MdOutlineShoppingBag size={30} />
                <div>판매상품</div>
              </div>
            </Link>
            <Link to={"/mystore"}>
              <div className="flex flex-col items-center ">
                <IoAccessibility size={30} />
                <div>내상점</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
