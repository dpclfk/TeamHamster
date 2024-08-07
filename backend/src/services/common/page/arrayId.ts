import { Request, Response } from "express";
import { Category, Product } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const prolist = req.body.productlist;
    console.log(prolist);
    const productlist: Product[] = await Product.findAll({
      attributes: [
        "id",
        "title",
        "discription",
        "price",
        "createdAt",
        "itemState",
        "img",
        "categoryId",
      ],
      where: { id: [...prolist], itemState: "판매중" },
      include: [{ model: Category, as: "Category", attributes: ["name"] }],
    });
    for (let i = 0; i < productlist.length; i++) {
      if (productlist[i].img) {
        const splimg: string[] = productlist[i].img.split(",");
        productlist[i].dataValues.image = splimg;
      }
    }
    res.json({ productlist: productlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};
