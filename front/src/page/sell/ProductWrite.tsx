import React, { useEffect, useMemo, useRef, useState } from "react";
import { center } from "../../lib/styles";
import axios, { AxiosResponse } from "axios";
import { IData, IAdress, IAdressData } from "../../Component/Modal/Buy/Buy";
import AdressItem from "../../Component/Modal/Buy/UserAdressItem";
import { useLocation, useNavigate } from "react-router-dom";
import { IData as IDataProduct } from "../product/product";
import { IProductPage } from "../../lib/interFace";
import { productPageDataErr } from "../../lib/errors";

interface IFormData {
  productName: string;
  description: string;
  price: string;
}
interface ICateMini {
  id: number;
  name: string;
}
interface ICate extends ICateMini {
  Children?: ICateMini[];
}
interface IFirstCateRes {
  category: ICate[];
}
interface IFiles {
  fileType: string;
  fileName: string;
  fileNameFull: string;
}
interface IRowCateFunc {
  api: string;
  id: number;
}

const ProductWrite: React.FC = () => {
  //hook
  const navigate = useNavigate();
  const loca = useLocation();

  //state
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [lastClickCateId, setLastClickCateId] = useState<number>();
  const [showCateValue, setShowCateValue] = useState<string[]>([]);
  const [selectcontent, setcontent] = useState<string>();
  const [id, setId] = useState<number>();
  const [categories, setCategories] = useState<ICate[]>([
    { name: "오류 카테고리들", id: 1 },
    { name: "스타굿즈", id: 2 },
    { name: "키덜트", id: 3 },
    { name: "예술/희귀/수집품", id: 4 },
    { name: "음반/약기", id: 5 },
    { name: "도서/티켓/문구", id: 6 },
    { name: "뷰티/미용", id: 7 },
  ]);
  const [rowOneCates, setRowOneCates] = useState<ICate[]>();
  const [rowTwoCates, setRowTwoCates] = useState<ICate[]>();
  const [formData, setFormData] = useState<IFormData>({
    productName: "",
    description: "",
    price: "",
  });
  const [idPath, setIdPath] = useState<string>("");

  //useMemo
  const isProductReWrite = useMemo<boolean>(() => {
    return loca.pathname.lastIndexOf("/") !== 0;
  }, []);
  const idStartIdx = useMemo<number>(() => {
    return loca.pathname.lastIndexOf("/");
  }, []);

  //env
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const imgBaseUrl = process.env.REACT_APP_IMG_BASE;

  //funcs
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (files) {
      const newImages = Array.from(files);
      setImages((prev) => [...prev, ...newImages]);

      const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  interface IImgUpLoaderRes {
    uploaded: boolean;
    url: string[];
  }
  const imgUploader = (files: File[]) => {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("img", files[i]);
    }

    axios
      .post(`${serverUrl}/imgSave`, formData, {
        withCredentials: true,
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((data: AxiosResponse<IImgUpLoaderRes>) => {
        console.log(data);
        writeClick(data.data.url);
      })
      .catch(() => {
        console.error("error");
      });
  };
  const firstCateGet = async () => {
    await axios
      .post(`${serverUrl}/catefirst`, {}, {})
      .then((data: AxiosResponse<IFirstCateRes>) => {
        console.log(data);
        const cates = data.data.category;
        setCategories(cates);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const selectadress = (value: string, id: number) => {
    setcontent(value);
    setId(id);
  };
  const asyncOperation = async (item: any) => {
    return new Promise<File>((resolve) =>
      setTimeout(() => resolve(getImgBlob(item)), 300)
    );
  };

  const getProductDatas = async () => {
    await axios
      .post(`${serverUrl}/product/${id}`, {}, { withCredentials: true })
      .then(async (data: AxiosResponse<IDataProduct<IProductPage>>) => {
        console.log(data);
        const values = data.data.product;
        const { image, title, discription, categoryId, Category, price } =
          values;

        setFormData({
          productName: title,
          description: discription,
          price: price + "",
        });
        setLastClickCateId(categoryId);
        setShowCateValue([Category ? Category.name : "에러"]);
        const newImages = Array.from(image);
        const newPreviewUrls = newImages.map((file) => `${imgBaseUrl}${file}`);
        setPreviewUrls(newPreviewUrls);

        //files Get

        const results: File[] = [];
        console.log(image);

        for (const imgName of image) {
          const fileNameFull = imgName;
          const fileType = imgName.slice(imgName.indexOf(".") + 1);
          const fileName = imgName.slice(0, imgName.indexOf("."));

          const obj: IFiles = {
            fileName: fileName,
            fileNameFull: fileType,
            fileType: fileNameFull,
          };

          const result: File = await asyncOperation(obj);
          results.push(result);
        }

        setImages(results);
      })
      .catch(async (err) => {
        console.log(err);
        const { image, title, discription, categoryId, Category, price } =
          productPageDataErr;

        setFormData({
          productName: title,
          description: discription,
          price: price + "",
        });
        setLastClickCateId(categoryId);
        setShowCateValue([Category ? Category.name : "에러"]);
        const newImages = Array.from(image);
        const newPreviewUrls = newImages.map((file) => `${imgBaseUrl}${file}`);
        setPreviewUrls(newPreviewUrls);

        //files Get

        const results: File[] = [];
        console.log(image);

        for (const imgName of image) {
          const fileNameFull = imgName;
          const fileType = imgName.slice(imgName.indexOf(".") + 1);
          const fileName = imgName.slice(0, imgName.indexOf("."));

          const obj: IFiles = {
            fileName: fileName,
            fileNameFull: fileType,
            fileType: fileNameFull,
          };

          const result: File = await asyncOperation(obj);
          results.push(result);
        }

        setImages(results);
      });
  };

  const rowCatesGet = async ({ api, id }: IRowCateFunc) => {
    let rowCheck = true;

    if (api !== "/catelist") {
      rowCheck = false;
    }

    await axios
      .post(`${serverUrl}${api}/${id}`, {}, {})
      .then((data: AxiosResponse<ICate>) => {
        const childrens = data.data.Children;
        if (childrens) {
          if (rowCheck) {
            setRowOneCates(childrens);
          } else {
            setRowTwoCates(childrens);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (rowCheck) {
          setRowOneCates([
            { id: 8, name: "에" },
            { id: 9, name: "러" },
          ]);
        } else {
          setRowTwoCates([
            { id: 10, name: "에러" },
            { id: 11, name: "러띠" },
            { id: 12, name: "띠잉" },
          ]);
        }
      });
  };

  const [adress, setAdress] = useState<IAdressData[]>([
    { address: "오류", addressId: 1, detailAddress: "오류" },
  ]);
  //유저 주소 정보 가져오기
  const getUserAddress = async () => {
    await axios
      .post(`${serverUrl}/address`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IData>) => {
        console.log("주소 가져오기 성공", data);
        const addressArr: IAdress[] = data.data.extraAddress;
        const result = addressArr.map((adress: IAdress) => {
          return {
            address: adress.Address.address,
            addressId: adress.id,
            detailAddress: adress.detailAddress,
          };
        });

        setAdress(result);
      })
      .catch((err) => {
        console.log("주소 에러", err);
        setAdress([
          {
            address: "에러시 나오는 에러주소",
            addressId: 1,
            detailAddress: "오류",
          },
          {
            address: "햄스터별 해바라기시 해씨동 햄찌빌라",
            addressId: 2,
            detailAddress: "오류",
          },
          {
            address: "따봉햄스터의 집주소를 봤다면 코드를 버려라",
            addressId: 3,
            detailAddress: "오류",
          },
        ]);
      });
  };

  const writeClick = async (names: string[]) => {
    await axios
      .post(
        `${serverUrl}/write${idPath}`,
        {
          title: formData.productName,
          discription: formData.description,
          categoryId: lastClickCateId,
          price: +formData.price || 0,
          extraAddressId: id,
          img: names,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
        if (isProductReWrite) {
          navigate(`/product${idPath}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (isProductReWrite) {
          navigate(`/product${idPath}`);
        } else {
          navigate("/");
        }
      });
  };

  const getImgBlob = async (files: IFiles) => {
    const { fileType, fileName, fileNameFull } = files;

    const response = await fetch(`${imgBaseUrl}${fileNameFull}`);
    if (!response.ok) {
      throw new Error("이미지가 없음");
    }
    const blob = await response.blob();

    const fileFromBlob: File = new File([blob], fileNameFull, {
      type: `image/${fileType}`,
      lastModified: +new Date(),
    });

    return fileFromBlob;
  };

  //mount

  useEffect(() => {
    firstCateGet();
    getUserAddress();

    if (isProductReWrite) {
      setIdPath(loca.pathname.slice(idStartIdx));
      getProductDatas();
    }
  }, []);

  return (
    <div className={`${center}`}>
      <div className="rounded-lg w-full">
        <label
          htmlFor="productImage"
          className="block text-sm font-medium text-gray-700"
        >
          상품이미지
        </label>
        <div className="flex flex-col items-stretch mb-4">
          <input
            id="imgupload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="imgupload"
            className={`bg-gray-300 text-gray-500 w-32 h-32 ${center} text-5xl`}
          >
            +
          </label>

          <div className="grid grid-cols-4 overflow-hidden">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                {/* <div className="w-32 h-32" /> */}
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-32 h-32 uploadImgElem"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-20 bg-red-500 text-white p-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            상품명
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
            placeholder="상품명을 입력해주세요."
          />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">카테고리</h2>
          <div className="flex space-x-4">
            <div className="w-1/3 border p-4">
              <h3 className="font-semibold">선택</h3>
              <ul className="mt-2">
                {categories &&
                  categories.map((category: ICate, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        if (category.id) {
                          rowCatesGet({ api: "/catelist", id: category.id });
                          setLastClickCateId(category.id);
                          setShowCateValue([category.name]);
                        }
                      }}
                      className="py-1 hover:bg-gray-200 cursor-pointer"
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="w-1/3 border p-4">
              <h3 className="font-semibold">중분류 선택</h3>
              <ul className="mt-2">
                {rowOneCates &&
                  rowOneCates.map((category: ICate, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        if (category.id) {
                          rowCatesGet({
                            api: "/catelistthird",
                            id: category.id,
                          });
                          setLastClickCateId(category.id);
                          if (showCateValue.length < 2) {
                            setShowCateValue((data) => [
                              ...data,
                              category.name,
                            ]);
                          } else {
                            setShowCateValue((data) => {
                              return [...data.slice(0, 1), category.name];
                            });
                          }
                        }
                      }}
                      className="py-1 hover:bg-gray-200 cursor-pointer"
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="w-1/3 border p-4">
              <h3 className="font-semibold">소분류 선택</h3>
              <ul className="mt-2">
                {rowTwoCates &&
                  rowTwoCates.map((category: ICate, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        if (category.id) {
                          setLastClickCateId(category.id);
                          if (showCateValue.length < 3) {
                            setShowCateValue((data) => [
                              ...data,
                              category.name,
                            ]);
                          } else {
                            setShowCateValue((data) => {
                              return [...data.slice(0, 2), category.name];
                            });
                          }
                        }
                      }}
                      className="py-1 hover:bg-gray-200 cursor-pointer"
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold">선택:</h3>
            <div className="flex">
              <span>{showCateValue.join(" → ")}</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            상품설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            rows={4}
            placeholder="상품에 대한 설명을 입력하세요"
            required
          />
        </div>
        {adress &&
          adress.map((item: IAdressData, idx: number) => (
            <AdressItem
              key={idx}
              detail={item.detailAddress}
              item={item.address}
              id={item.addressId}
              selectadress={selectadress}
            />
          ))}
        <div className="mb-4">
          <div className="flex"></div>
        </div>
        <div className="mb-4">
          <div className="flex">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              가격 :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-6/12 border border-gray-300 rounded-md"
              placeholder="원하는 가격을 입력하세요"
              required
            />
            <div></div>
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className="relative p-5">
          <div
            onClick={() => {
              if (
                id &&
                selectcontent &&
                lastClickCateId &&
                formData.productName !== "" &&
                images.length > 0
              ) {
                imgUploader(images);
              }
            }}
            className={`absolute right-3 bottom-3 ${center} h-[6rem] text-[1.5rem] text-white border rounded-[1rem] bg-amber-300 hover:bg-yellow-600 w-[10rem]`}
          >
            등록하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductWrite;
