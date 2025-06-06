import { Link, Route, Routes, useParams } from "react-router-dom";
import ManegeReport from "../../page/manege/report";
import ManegeCategory from "../../page/manege/category";
import ManegeBenKeyword from "../../page/manege/benkeyword";
import ManegeUser from "../../page/manege/user";
import ManegePoint from "../../page/manege/point";
import ManegeDeliveryTip from "../../page/manege/deliverytip";
import ManegePageCategory from "../../Component/Category/ManegePageCategory";

import { box, center } from "../styles";

import Authority from "../../page/manege/authority";

import AdminLoginPage from "../../page/manege/adminlogin";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import ModalBox from "../../Component/Modal/Modalbox/ModalBox";
import { useRecoilValue } from "recoil";
import { Modalstate } from "../../Context/Modal/Modal";

interface IUser {
  id: number;
  nick: string;
  point: number;
  admin: boolean;
  delivery: boolean;
}

const ManegeLayout = (): JSX.Element => {
  const Modal = useRecoilValue(Modalstate);
  const setUserLogin = useState<boolean>(false)[1];
  // const navigate = useNavigate();
  useQueryClient();

  const onclick = () => {
    window.location.replace("http://market.dpclfk.com/");
  };

  const onlogout = () => {
    logout.mutate();
    window.location.reload();
  };

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { data, mutate } = useMutation({
    mutationKey: "userlogin",
    mutationFn: async () => {
      const { data } = await axios.post(
        `${serverUrl}/layout`,
        {},
        { withCredentials: true }
      );
      return data;
    },
  });

  const logout = useMutation({
    mutationKey: "userlogout",
    mutationFn: async () => {
      await axios.post(`${serverUrl}/logout`, {}, { withCredentials: true });
    },
  });

  const log: IUser = useMemo(() => data?.login, [data]);

  const { id } = useParams();
  useEffect(() => {
    mutate();
  }, [id, mutate]);

  return (
    <div>
      <div>
        <div className="p-1 h-[6rem] bg-orange-600">
          <div className={`${box} h-[100%] flex justify-between items-center `}>
            <div className={`${center}`}>
              <img
                src="/marketapi/imgs/hamster.png"
                alt="imgNotFound"
                className="h-[4rem]"
              ></img>
              {log?.admin ? (
                <Link to={"/report"}>
                  <div>
                    <div className="text-[2rem] text-white font-bold">
                      햄스터마켓
                    </div>
                    <div className="text-[1rem] text-white font-bold">
                      관리자 페이지
                    </div>
                  </div>
                </Link>
              ) : (
                <div>
                  <div className="text-[2rem] text-white font-bold">
                    햄스터마켓
                  </div>
                  <div className="text-[1rem] text-white font-bold">
                    관리자 페이지
                  </div>
                </div>
              )}
            </div>
            <div className={`${center} gap-3`}>
              <div className="h-[3rem] w-[3rem]">
                <img
                  className="h-[100%]"
                  alt="imgNotFound"
                  src="/marketapi/imgs/good.png"
                ></img>
              </div>
              <div
                className={`text-white ${log?.nick ? "w-[7rem]" : "w-[2rem]"} `}
              >
                {log?.admin && `${log?.nick}`}
              </div>
              {log?.admin ? (
                <div className="flex gap-2">
                  <div onClick={onclick}>
                    <div className="p-1 border bg-orange-200 rounded">
                      메인페이지
                    </div>
                  </div>
                  <div onClick={onlogout}>
                    <div className="p-1 border bg-blue-200 rounded">
                      로그아웃
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-white">관리자로그인이 필요합니다</div>
              )}
            </div>
          </div>
        </div>

        <div>
          {log?.admin ? (
            <div>
              <ManegePageCategory />
              <Routes>
                <Route
                  path="/login"
                  element={<AdminLoginPage setUserLogin={setUserLogin} />}
                />
                <Route path="/report" element={<ManegeReport />} />
                <Route path="/category" element={<ManegeCategory />} />
                <Route path="/keyword" element={<ManegeBenKeyword />} />
                <Route path="/user" element={<ManegeUser />} />
                <Route path="/point" element={<ManegePoint />} />
                <Route path="/delivery" element={<ManegeDeliveryTip />} />
                <Route path="/authority" element={<Authority />} />
              </Routes>
            </div>
          ) : (
            <AdminLoginPage setUserLogin={setUserLogin} />
          )}
        </div>

        <div className="border border-t border-b">
          <div className={`${box} ${center} py-[1rem]text-gray-400 `}>
            <div className="text-center">
              팀이름 <br /> Team Hamster
            </div>
            <div className="mx-[1.5rem] h-[1rem] border-[1px] border-gray-200 "></div>
            <div className="text-center">
              프로젝트 이름 <br /> Hamster Market
            </div>
            <div className="mx-[1.5rem] h-[1rem] border-[1px] border-gray-200 "></div>
            <div className="text-center">
              <div>깃주소</div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  window.open("https://github.com/dpclfk/TeamHamster");
                }}
              >
                https://github.com/dpclfk/TeamHamster
              </div>
            </div>
          </div>
        </div>
      </div>
      {Modal && (
        <div className="fixed top-[30%] start-[35%]  z-200">
          <ModalBox />
        </div>
      )}
    </div>
  );
};

export default ManegeLayout;
