import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import UserForm from "../userForm/userForm";
import { SearchContext } from "../../App";

const AddBillings = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [searchTerm, setSearchTerm] = useContext(SearchContext);

  // console.log(searchTerm)





  return (
    <div className="container bg-info ">
      <div className="row ">
        <div className="col-6 my-auto">
          <div className="row my-auto">
            <div className="col-2 my-auto">Billings</div>
            <div className="col-6 ">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-6 text-end">
          <Button className="btn btn-success my-2 " onClick={handleShow}>
            Add New Bill
          </Button>


          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Bill </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <UserForm handleClose={handleClose} />
              
            </Modal.Body>
          
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddBillings;


