import { Request, Response } from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import { User } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    dotenv.config();

    const reqbody = req.body;

    const key: Buffer = crypto.scryptSync("hgaomasttmexrj", `${process.env.KEY || ""}`, 32);
    const iv: string = process.env.IV || "<Buffer fe db 11 e2 ed 50 16 b0 4f ee 0d 43 96 0b 1a 13>";
    const cipher: crypto.CipherGCM = crypto.createCipheriv("aes-256-gcm", key, iv);

    let encryptionemail = cipher.update(`${reqbody.email}`, "utf-8", "hex");

    const encryptionpw = crypto
      .createHash("sha512")
      .update(`${reqbody.pw + process.env.SALT}`)
      .digest("hex");

    const usercheck: User | null = await User.findOne({
      where: {
        email: encryptionemail,
        password: encryptionpw,
        Oauth: "햄스터",
        admin: false,
        delivery: false,
      },
    });

    if (usercheck) {
      req.session.store = usercheck.id;
    } else {
      throw Error("not match user");
    }

    res.json({ result: "ok" });
  } catch (err: any) {
    console.error(err);
    if (err.message == "not match user") {
      res.status(400).json({ result: "not match user" });
    } else {
      res.status(500).json({ result: "fail" });
    }
  }
};
