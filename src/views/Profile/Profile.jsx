import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss"

const Profile = () => {
    const Profile = localStorage.getItem("user");
    const NewProfile = JSON.parse(Profile);
    const user_id = NewProfile._id;
    const name = NewProfile.name
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    //converting base64
    const getBase64 = (img, callback) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    //image loading icon
    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    };
    //image upload process
    const handleChange = (info) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, async (url) => {
          setImageUrl(url);
          try {
            const res = await axios.post(
              `${process.env.REACT_APP_BACKEND_API}/image`,
              {
                imageUrl: url,
                user_id,
              }
            );
            console.log(res.data);
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        });
      }
    };
    //upload button animation
    const uploadButton = (
      <button
        style={{
          border: 0,
          background: "none",
        }}
        type="button"
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </button>
    );
    const [imgMain, setImgmain] = useState([]);
    const getData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/image/${user_id}`
      );
      setImgmain(res.data.image);
    };
    console.log(imgMain);
    // const [base64Image, setBase64Image] = useState("");
  
    // Function to convert the imported image to base64 URL
    // const convertImageToBase64 = () => {
    //   const img = new Image();
    //   img.onload = () => {
    //     const base64Url = getBase64Image(img);
    //     setBase64Image(base64Url);
    //   };
    //   img.src = emailSignature;
    // };
  
    // Function to convert image to base64 format
    // const getBase64Image = (img) => {
    //   // Create a canvas element
    //   const canvas = document.createElement("canvas");
    //   const ctx = canvas.getContext("2d");
    //   // Set canvas dimensions to match image
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   // Draw the image onto the canvas
    //   ctx.drawImage(img, 0, 0);
    //   // Get the base64 representation of the canvas
    //   const base64Url = canvas.toDataURL("image/png");
    //   return base64Url;
    // };
    useEffect(() => {
      // convertImageToBase64();
      getData();
    }, []);
   
  
    
    
  
    // console.log("getBase64", base64Image);
    return (
      <>
        
            <motion.div className=" main-container1 container  ">
              <div className="container ">
                <div class="user_panel_bg shadow"></div>
  
                <div class="sub-container">
                  <div class="user_panel">
                    <div class="user_profile">
                      <a>
                        {imgMain ? (
                          <img
                            className="rounded-circle img-fluid"
                            src={imgMain.imageUrl}
                            alt=""
                          />
                        ) : (
                          <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                  width: "100%",
                                }}
                              />
                            ) : (
                              uploadButton
                            )}
                          </Upload>
                        )}
                      </a>
  
                      <div class="user_name" style={{ paddingTop: "70px" }}>
                        <h2>{NewProfile.name}</h2>
                        <ul>
                          <li>{NewProfile.email}</li>
                          <li>Phone:{NewProfile.phone}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                 
                </div>
  
              </div>
            </motion.div>
          
      </>
    );
  };
  export default Profile;