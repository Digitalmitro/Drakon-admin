import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const Profile = localStorage.getItem("user");
  const NewProfile = JSON.parse(Profile);
  const user_id = NewProfile._id;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Date"); // Default sorting by Date
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  console.log("USER_ID", user_id);
  
  // const Getdata = async () => {
  //   const res = await axios.get(
  //     `${process.env.REACT_APP_BACKEND_API}/notification`
  //   );
  //   setData(res.data);
  //   setFilteredData(res.data); // Initialize filtered data with all data
  // };

  // useEffect(() => {
  //   Getdata();
  // }, []);

  useEffect(() => {
    // Filter data based on search term whenever it changes
    const filtered = data.filter(item =>
      item.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <>
      <motion.div className=" main-container1 margin-container">
        <div className="container margin-container">
          <div
            className="d-flex"
            style={{ justifyContent: "space-between" }}
          >
            <motion.h1 className="fw-bold ms-3">
              Notification Activities
            </motion.h1>
            <input
              style={{border:'none', borderRadius:'10px'}}
              type="text"
              placeholder="Search username"
              className="w-25"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.div className="" animate={{y:30}}>
            {filteredData.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "50%",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  fontWeight: "bold",
                  boxShadow: "12px 12px 15px -11px rgba(71,68,71,1)"
                }}
                className="mb-2 "
              >
                {item.message}
                <hr />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Notification;
