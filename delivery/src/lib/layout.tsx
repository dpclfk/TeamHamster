import { useCallback, useState } from "react";

import { Link, Route, Routes } from "react-router-dom";
import { mobilebox } from "./styles";
import { IoIosHome } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { FaTag } from "react-icons/fa";
import Main from "../page/main";
import PickupScan from "../page/pickupscan";
import DeliveryScan from "../page/deliveryscan";
import PickupCheck from "../page/pickupcheck";
import PickUpList from "../page/pickuplist";
import DeliveryList from "../page/deliverylist";
import SelectCamp from "../page/selectcamp";
import MyPage from "../page/mypage";

const LayOut = (): JSX.Element => {
  const [workstate, SetWorkState] = useState<boolean>();
  const [liststate, SetListState] = useState(0);
  const start = useCallback(() => {
    SetWorkState(true);
  }, []);
  const end = useCallback(() => {
    SetWorkState(false);
  }, []);
  const saveList = useCallback((item: number) => {
    SetListState(item);
  }, []);

  return (
    <div className="h-[50rem] ">
      <div className="m-auto max-w-[35rem] h-[6rem] bg-blue-300">
        <div
          className={` ${mobilebox} h-[100%] flex items-center justify-between`}
        >
          <div className="flex">
            <div className="h-[3rem] w-[3rem] ">
              <img src="/imgs/hamster.png"></img>
            </div>
            <div className="text-center text-[0.8rem] text-white font-bold">
              <div>햄스터마켓</div>
              <div>배송파트너</div>
            </div>
          </div>
          <div className="text-center text-white">
            <div>배송파트너</div>
            <div>이동찬 님</div>
            {workstate && (
              <div className="border rounded bg-yellow-400">업무중</div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="m-auto w-[35rem]">
          <Routes>
            <Route path="/" element={<Main start={start} end={end} />}></Route>
            <Route path="/pickupscan" element={<PickupScan />}></Route>
            <Route
              path="/pickupcheck"
              element={
                <PickupCheck liststate={liststate} checklist={saveList} />
              }
            ></Route>
            <Route path="/selectcamp" element={<SelectCamp />}></Route>
            <Route
              path="/pickuplist"
              element={
                <PickUpList liststate={liststate} checklist={saveList} />
              }
            ></Route>
            <Route
              path="/deliverylist"
              element={
                <DeliveryList liststate={liststate} checklist={saveList} />
              }
            ></Route>
            <Route path="/deliveryscan" element={<DeliveryScan />}></Route>
            <Route
              path="/mypage"
              element={<MyPage workstate={workstate} />}
            ></Route>
          </Routes>
        </div>
      </div>
      <div className="m-auto max-w-[35rem] h-[5rem] flex items-center justify-evenly bg-gray-400 sticky bottom-0">
        <Link to={"/"}>
          <div className="flex flex-col items-center">
            <div>
              <IoIosHome size={30} />
            </div>
            <div>홈</div>
          </div>
        </Link>
        <Link to={"/deliverylist"}>
          <div className="flex flex-col items-center">
            <div>
              <MdLocalShipping size={30} />
            </div>
            <div>배송목록</div>
          </div>
        </Link>
        <Link to={"/pickuplist"}>
          <div className="flex flex-col items-center">
            <div>
              <FaTag size={30} />
            </div>
            <div>픽업목록</div>
          </div>
        </Link>
        <Link to={"/mypage"}>
          <div className="flex flex-col items-center">
            <div>
              <BsPersonFill size={30} />
            </div>
            <div>내정보</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LayOut;