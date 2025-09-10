import { Request, Response } from "express";
import { bankeyword } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    if (reqbody.keyword.length < 2) {
      throw Error("short");
    }
    console.log(reqbody.keyword);
    // await bankeyword.create({ word: reqbody.keyword });
    // console.log("밴키워드 추가");

    try {
      const newBanKeyword = await bankeyword.create({ word: reqbody.keyword });
      console.log("키워드 추가 성공:", newBanKeyword);
    } catch (error: any) {
      console.error("키워드 추가 실패:", error.message);
    }

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "short") {
      res.status(400).json({ result: "short keyword" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
