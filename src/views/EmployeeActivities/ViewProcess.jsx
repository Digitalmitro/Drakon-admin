import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
const ViewDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
 
  const Getdata = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/callback-user/${id}`);
    const ress = await axios.get(`${process.env.REACT_APP_BACKEND_API}/transfer-user/${id}`);
    const resss = await axios.get(`${process.env.REACT_APP_BACKEND_API}/sale-user/${id}`);
    const ressss = await axios.get(`${process.env.REACT_APP_BACKEND_API}/attendance/${id}`);
    
    setData(res.data.callback);
    setData1(ress.data.transfer);
    setData2(resss.data.sale);
    setData3(ressss.data.attendance);
  };
  //filter attendance
  const filteredAttendance = data3.filter(
    (item) => item.currentDate && item.punchin && item.punchOut && item.time && item.ip
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
  }, []);
  
  return (
    <>
      
          <motion.div className=" main-container1 container mb-5 ">
            <ToastContainer />
            <div className="container margin-container  mb-5">
            <div className="d-flex" style={{justifyContent:'space-between'}}>
            <motion.h2  className="  fw-bold">
                Employee Activities
              </motion.h2>
             
            </div>
              
              <motion.div className="container mt-5" >
               <div className="row d-flex" style={{gap:'20px',justifyContent:'center',alignItems:'center',height:'150px'}}>
               <motion.div onClick={()=>navigate(`/callback-list/${id}`)} className="shadow-sm col fw-bold text-center" style={{height:'150px',backgroundColor:"#afb1b0"}} whileHover={{scale:1.05}}>
               <p></p>
                callBacks
              </motion.div>
              <motion.div onClick={()=>navigate(`/transfer-list/${id}`)} className="shadow-sm col fw-bold  text-center" style={{height:'150px',backgroundColor:"#afb1b0"}} whileHover={{scale:1.05}}>
              <p></p>
                Transfers
              </motion.div>
              <motion.div onClick={()=>navigate(`/sale-list/${id}`)} className="shadow-sm col fw-bold  text-center" style={{height:'150px',backgroundColor:"#afb1b0"}} whileHover={{scale:1.05}}>
              <p></p>
                Sales
              </motion.div>
              <motion.div onClick={()=>navigate(`/attendace-list/${id}`)} className="shadow-sm col fw-bold text-center" style={{height:'150px',backgroundColor:"#afb1b0"}} whileHover={{scale:1.05}}>
               <p></p>
               
               Attendace
              </motion.div>
               </div>
              </motion.div>
             
            
            </div>
          </motion.div>
       
    </>
  );
};
export default ViewDetails;
