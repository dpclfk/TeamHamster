import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { center } from "../../lib/styles";

const ManegePageCategory = (): JSX.Element => {
  const [manegecate, setManegeCate] = useState<string | undefined>("");

  const report = useCallback((): void => {
    setManegeCate("report");
  }, []);
  const category = useCallback((): void => {
    setManegeCate("category");
  }, []);
  const keyword = useCallback((): void => {
    setManegeCate("keyword");
  }, []);
  const user = useCallback((): void => {
    setManegeCate("user");
  }, []);
  const point = useCallback((): void => {
    setManegeCate("point");
  }, []);
  const delivery = useCallback((): void => {
    setManegeCate("delivery");
  }, []);
  const authority = useCallback((): void => {
    setManegeCate("authority");
  }, []);

  const cate = useLocation().pathname.slice(1);

  useEffect(() => {
    setManegeCate(cate);
  }, [cate]);

  return (
    <div className={`pt-20 pb-10 ${center}  gap-20 text-[1.2rem] text-gray-500 font-bold`}>
      <Link to={"/report"}>
        {manegecate === "report" ? (
          <div className="text-orange-500">신고관리</div>
        ) : (
          <div onClick={report}>신고관리</div>
        )}
      </Link>
      <Link to={"/category"}>
        {manegecate === "category" ? (
          <div className="text-orange-500">카테고리관리</div>
        ) : (
          <div onClick={category}>카테고리관리</div>
        )}
      </Link>
      <Link to={"/keyword"}>
        {manegecate === "keyword" ? (
          <div className="text-orange-500">금지키워드관리</div>
        ) : (
          <div onClick={keyword}>금지키워드관리</div>
        )}
      </Link>
      <Link to={"/user"}>
        {manegecate === "user" ? (
          <div className="text-orange-500">유저관리</div>
        ) : (
          <div onClick={user}>유저관리</div>
        )}
      </Link>
      <Link to={"/point"}>
        {manegecate === "point" ? (
          <div className="text-orange-500">충전비율설정</div>
        ) : (
          <div onClick={point}>충전비율설정</div>
        )}
      </Link>
      <Link to={"/delivery"}>
        {manegecate === "delivery" ? (
          <div className="text-orange-500">배송비</div>
        ) : (
          <div onClick={delivery}>배송비</div>
        )}
      </Link>
      <Link to={"/authority"}>
        {manegecate === "authority" ? (
          <div className="text-orange-500">권한부여</div>
        ) : (
          <div onClick={authority}>권한부여</div>
        )}
      </Link>
    </div>
  );
};

export default ManegePageCategory;
