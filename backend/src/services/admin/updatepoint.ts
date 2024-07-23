import { Request, Response } from "express";
import { Store } from "../../models";
import { point } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    console.log(reqbody);
    // if (reqbody.point >= 100 || reqbody.point < 0) {
    //   throw Error("point precent");
    // }

<<<<<<< HEAD
    await point.create({ pointPercent: reqbody.point });
=======
    await point.create({ userId: reqbody.user.id, pointPercent: reqbody.point });
>>>>>>> 1ef3a6f (feat:deliverycompelete,authority)

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "point precent") {
      res.status(400).json({ result: "spoint precent" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
