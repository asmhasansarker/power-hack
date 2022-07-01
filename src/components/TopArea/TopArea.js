import React, { useContext } from "react";
import { AllBillContext } from "../../App";
import electricLogo from '../assets/electricLogo.jpg'

const TopArea = () => {
  const [bills] = useContext(AllBillContext);
  let total = 0;
  bills.map((bill) => total += bill.amount)
  return (
    <div className="container-fluid bg-light">
      <div className="container ">
        <div className="row py-3 h5">
          <div className="col-6">
          <img src={electricLogo} className="img-fluid" alt="..." style={{width:"50px"}}/>
          </div>
          <div className="col-6 text-end">Paid Total: {total}</div>
        </div>
      </div>
    </div>
  );
};

export default TopArea;
