import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
const TransferList = () => {
  const { id } = useParams();
  console.log(id);

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Date"); 
  const [searchResults, setSearchResults] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const Getdata = async () => {
    // const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/callback-user/${id}`);
    const ress = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/transfer-user/${id}`
    );
    // const resss = await axios.get(`${process.env.REACT_APP_BACKEND_API}/sale-user/${id}`);
    // const ressss = await axios.get(`${process.env.REACT_APP_BACKEND_API}/attendance/${id}`);
    // setData(res.data.callback);
    setData1(ress.data.transfer);
    filterAndSortResults(searchTerm, sortBy, ress.data.transfer);
    // setData2(resss.data.sale);
    // setData3(ressss.data.attendance);
  };
  //filter attendance
  const filteredAttendance = data3.filter(
    (item) =>
      item.currentDate && item.punchin && item.punchOut && item.time && item.ip
  );
  console.log(data3);
  const handleDel = async (id) => {
    try {
      await axios.delete(`/advisor/${id}`);
      Getdata();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Getdata();
  }, [searchTerm, sortBy]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filterAndSortResults = (searchTerm, sortBy, data) => {
    let filteredResults = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (sortBy === "Date") {
      filteredResults.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "Name") {
      filteredResults.sort((a, b) => a.name.localeCompare(b.name));
    }

    setSearchResults(filteredResults);
  };
  const downloadExcel = () => {
    console.log("hello")
    if (data1.length === 0) {
      console.error("No data to download");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert workbook to array buffer
    const arrayBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert array buffer to Blob
    const excelBlob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a download link
    const url = URL.createObjectURL(excelBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Transfer.xlsx");
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <>
    
          <motion.div className=" main-container1 container mb-5 ">
            <ToastContainer />
            <div className="container margin-container  mb-5">
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <motion.h1
                 
                  className=" fw-bold ms-3"
                >
                  Transfer Activities
                </motion.h1>
                <motion.h1
                 
                  className=" fw-bold ms-3"
                >
                  <button className="btn btn-success" onClick={downloadExcel}>
                    <i class="fa-solid fa-download"></i> Transfer Data
                  </button>
                </motion.h1>
              </div>
              <motion.div className="mt-3 mb-2" >
                <div className="d-flex">
                  <div>
                  <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                  <select
                  className="ms-2"
                      name="sortBy"
                      id="sortBy"
                      style={{ height: "28px" }}
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="Date">Date</option>
                      <option value="Name">Name</option>
                    </select>
                  </div>
                </div>
              </motion.div>
              {/* <motion.div
                className="table-responsive shadow-lg container"
                animate={{ y: 70 }}
              >
               
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Domain Name</th>
                      <th scope="col">Transfers-To</th>

                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((res, index) => {
                      return (
                        <tr key={res._id}>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.phone}</td>
                          <td>{res.domainName}</td>
                          <td>{res.transferTo}</td>

                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                navigate(`/callback-details/${res._id}`)
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div> */}
              <motion.div
                className="table-responsive  container"
            
              >
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Domain Name</th>
                      <th scope="col">Transfers-To</th>

                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((res, index) => {
                      return (
                        <tr key={res._id}>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.phone}</td>
                          <td>{res.domainName}</td>
                          <td>{res.transferTo}</td>

                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                navigate(`/transfer-details/${res._id}`)
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>
              {/* <motion.div
                className="table-responsive shadow-lg container"
                animate={{ y: 70 }}
              >
                <h4>Sale</h4>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Domain Name</th>
                      <th scope="col">Transfers-To</th>

                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data2.map((res, index) => {
                      return (
                        <tr key={res._id}>
                          <td>{res.name}</td>
                          <td>{res.email}</td>
                          <td>{res.phone}</td>
                          <td>{res.domainName}</td>
                          <td>{res.transferTo}</td>

                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                navigate(`/sale-details/${res._id}`)
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div> */}
              {/* <motion.div
                className="table-responsive shadow-lg container"
                animate={{ y: 70 }}
              >
                <h4>Attendance</h4>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">PunchIn</th>
                      <th scope="col">PunchOut</th>
                      <th scope="col">production</th>
                      <th scope="col">IP Address</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendance.map((res, index) => {
                      return (
                        <tr key={res._id}>
                          <td>{res.currentDate}</td>
                          <td>{res.punchin}</td>
                          <td>{res.punchOut}</td>
                          <td>{res.time}</td>
                          <td>{res.ip}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => navigate(``)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div> */}

  
            </div>
          </motion.div>
     
    </>
  );
};
export default TransferList;
