import { Request, Response } from "express";
import { point } from "../../models/mongoDB";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    console.log(reqbody);
    // if (reqbody.point >= 100 || reqbody.point < 0) {
    //   throw Error("point precent");
    // }

<<<<<<< HEAD
<<<<<<< HEAD
    await point.create({ pointPercent: reqbody.point });
=======
    await point.create({ userId: reqbody.user.id, pointPercent: reqbody.point });
>>>>>>> 1ef3a6f (feat:deliverycompelete,authority)
=======
    await point.create({ userId: reqbody.user.id, pointPercent: reqbody.point });
=======
    await point.create({ pointPercent: reqbody.point });
>>>>>>> 5e55976 (feat:save)
>>>>>>> 7b2850e (feat:save)

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
