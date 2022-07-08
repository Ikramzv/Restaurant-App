import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { categories } from "../utils/data";
import { Loader } from "./index";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase/firebase";
import { saveItem } from "../utils/firebaseFunctions";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState(Number);
  const [price, setPrice] = useState(Number);
  const [category, setCategory] = useState("Select Category");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    console.log(storageRef);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsLoading(true);
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progress : " + uploadProgress.toFixed(0));
        if (snapshot.state === "running") {
          console.log("Progress : " + uploadProgress.toFixed());
        }
      },
      (err) => {
        setIsLoading(false);
        setFields(true);
        setMsg("Error while uploading , Try Again ");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      },
      async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setIsLoading(false);
        setImageAsset(imageUrl);
        setFields(true);
        setMsg("Image uploaded succesfully");
        setAlertStatus("succes");
        setTimeout(() => {
          setFields(false);
          setMsg("");
        }, 4000);
      }
    );
  };

  const deleteImage = (e) => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setIsLoading(false);
        setImageAsset("");
        setPrice(0);
        setCalories(0);
        setCategory("");
        setFields(true);
        setMsg("Image deleted succesfully");
        setAlertStatus("succes");
        setTimeout(() => {
          setFields(false);
          setMsg("");
          setAlertStatus("");
        }, 4000);
      })
      .catch((err) => {
        setIsLoading(false);
        setFields(true);
        setMsg("Error while deleting , please try again ..");
        setImageAsset("");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setMsg("");
          setAlertStatus("");
        }, 3500);
      });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !imageAsset || !category || !calories || !price) {
        setIsLoading(false);
        setFields(true);
        setMsg(
          "Required fields can't be empty , please fulfill the fields completely"
        );
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          imageURL: imageAsset,
          category,
          calories,
          qty: 0,
          price,
        };
        // Save Item
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data have been saved succesfully");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
          setMsg("");
          setAlertStatus("");
        }, 4000);

        // Reset fields
        clearData();
      }
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      setFields(true);
      setMsg("Error while saving details , Try Again ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setImageAsset("");
    setCategory("Select Category");
    setPrice(0);
    setCalories(0);
    setTitle("");
  };

  return (
    <div className="w-full h-auto min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 gap-4  flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`text-lg font-semibold text-red-600 w-[70%] rounded-lg 
            absolute top-1/2 left-1/2 z-10 -translate-x-[50%] -translate-y-[50%] select-none pointer-events-none text-center ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            } `}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type={"text"}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title"
            className="w-full h-full text-lg bg-transparent font-semibold py-1 px-2 outline-none rounded-lg 
            focus:border-2 focus:border-green-700 transition-all duration-300 ease-in-out placeholder:text-gray text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            className="cursor-pointer outline-none w-full  duration-200 text-base border-b-2 border-gray-200 p-2 rounded-md gap-4
            hover:bg-green-200 active:bg-green-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={"other"} className="bg-white cursor-pointer">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="cursor-pointer text-base border-0 outline-none capitalize  checked:bg-green-200 checked:font-semibold 
                  checked:text-green-800 bg-white text-textColor"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div
          className="group flex justify-center items-center flex-col rounded-lg 
        border-2 border-dotted border-gray-300 w-full h-225 md:h-420"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 text-base font-medium hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type={"file"}
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl 
                      cursor-pointer outline-none hover:shadow-md hover:bg-red-700  duration-300 transition-all ease-in-out flex items-center justify-center"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-bold active:text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type={"number"}
              required
              placeholder="Calories"
              max={4999}
              value={calories}
              onKeyUp={(e) =>
                parseFloat(e.currentTarget.value) > 5000 // Set maximum calories
                  ? setCalories(4999)
                  : setCalories(calories)
              }
              onChange={(e) => setCalories(e.currentTarget.value)}
              className="w-full h-full text-lg bg-transparent outline-none rounded-lg py-1 px-2 placeholder:text-gray-400
              focus:border-2 focus:border-green-700 transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type={"number"}
              name={"price"}
              max={999}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyUp={(e) =>
                parseFloat(e.currentTarget.value) > 1000 // Set maximum price
                  ? setPrice(999)
                  : setPrice(price)
              }
              required
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none rounded-lg py-1 px-2 placeholder:text-gray-400
              focus:border-2 focus:border-green-700 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type={"button"}
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg 
            font-semibold text-white hover:bg-emerald-700 hover:shadow-xl active:scale-90 duration-300 tracking-wider text-xl"
            onClick={saveDetails}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
