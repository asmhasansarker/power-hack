import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { BillingContext } from "../../App";

const UserForm = ({ handleClose }) => {
  const [billInfo, setBillInfo] = useContext(BillingContext);
  // const [validate, setValidate] = useState(false);

  const handleChange = (e) => {
    setBillInfo({
      ...billInfo,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(billInfo);

    
      fetch(`https://power-hack-mern.herokuapp.com/api/add-billing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billInfo),
      }).then((res) => {
        console.log(res);
      });

      setBillInfo({
        ...billInfo,
        name: "",
        email: "",
        phone: "",
        amount: "",
      });
      handleClose();
    
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          value={billInfo.name}
          type="text"
          name="name"
          placeholder="Enter your name...."
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={billInfo.email}
          type="email"
          name="email"
          placeholder="abc@example.com"
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          value={billInfo.phone}
          name="phone"
          type="text"
          placeholder="Enter your phone number"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAmount">
        <Form.Label>Paid Amount</Form.Label>
        <Form.Control
          value={billInfo.amount}
          name="amount"
          type="text"
          placeholder="Enter amount"
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
