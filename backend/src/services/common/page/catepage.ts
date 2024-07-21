import { Request, Response } from "express";
import { Category, Product } from "../../../models";

export default async (req: Request, res: Response) => {
  try {
    const reqbody = req.body;
    let productlist: Product[] = await Product.findAll({
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
      include: [
        { model: Category, as: "Category", attributes: ["name"], where: { id: req.params.id } },
      ],
    });
    for (let i = 0; i < productlist.length; i++) {
      const splimg = productlist[i].img.split(",");
      productlist[i].dataValues.image = splimg;
    }
    res.json({ product: productlist });
  } catch (err) {
    console.error(err);
    res.json({ result: "fail" });
  }
};