import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { AllBillContext,  SearchContext } from "../../App";
import UpdateFormData from "../UpdateForm/UpdateFormData";
// import UserForm from "../userForm/userForm";
// import BillDetailsRow from "./BillDetailsRow";
// import users from "../fakeData/data";

const BillDetailsTable = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [searchTerm] = useContext(SearchContext);
  const [bills, setBills] = useContext(AllBillContext);
  // const [pagination, setPagination] = useContext(PaginationContext);

  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    fetch("https://power-hack-mern.herokuapp.com/api/billing-list")
      .then((res) => res.json())
      .then((data) => {
        setBills(data.bills);
      });

    console.log(bills);
  }, [bills]);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://power-hack-mern.herokuapp.com/api/delete-billing/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleEdit = (id) => {
    console.log(id);
    fetch(`https://power-hack-mern.herokuapp.com/api/billing-list/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setUpdateData(data));

    console.log(updateData);
    handleShow();
  };

  return (
    <>
      <table className="container table table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">Billing ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Paid Amound</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {bills
            .filter((bill) => {
              if (searchTerm === "") {
                return bill;
              } else if (
                bill.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return bill;
              } else if (
                bill.email.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return bill;
              } else if (
                bill.phone.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return bill;
              }
              return false;
            })
            .map((bill) => {
              return (
                <tr key={bill.id}>
                  <td>{bill.id}</td>
                  <td>{bill.name}</td>
                  <td>{bill.email}</td>
                  <td>{bill.phone}</td>
                  <td>{bill.amount}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-info btn-sm me-2"
                      onClick={() => handleEdit(bill._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(bill.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Bill </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateFormData
              handleClose={handleClose}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
          </Modal.Body>
        </Modal>
        {/* 
        {pagination.totalPage > 1 && (
          <nav aria-label="...">
            <ul class="pagination">
              <li class="page-item disabled">
                <a
                  class="page-link"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item active" aria-current="page">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        )} */}
      </table>
    </>
  );
};

export default BillDetailsTable;
