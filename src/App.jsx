import { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Table, Tag, Space, Modal, Input } from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function App() {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("profileLists")) || []
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [gender, setGender] = useState("");
  const [validated, setValidated] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const column = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "key",
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return record.fullName.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "key",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "key",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "key",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "key",
    },
    {
      title: "State",
      dataIndex: "states",
      key: "key",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "key",
    },
    {
      title: "Operate",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="d-flex justify-content-around align-items-center"
        >
          <AiFillEdit
            onClick={() => editItem(record)}
            className="fs-6 text-success"
          />
          <AiFillDelete
            onClick={() => deleteItem(record)}
            className="fs-6 text-danger"
          />
        </Space>
      ),
    },
  ];

  // Function to handle delete functionality of an item

  const deleteItem = (record) => {
    Modal.confirm({
      title: "Are you sure to delete this Item from the list?",
      onOk: () => {
        setList((pre) => {
          return pre.filter((item) => item.id !== record.id);
        });
      },
    });
  };

  // Fucntions to handle Editing of an item in the list
  const editItem = (record) => {
    setIsEditing(true);
    setEditingItem({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !dateOfBirth ||
      !city ||
      !states ||
      !gender
    ) {
      alert("Mandatory Fields Cannot be left Empty!");
    } else {
      const newItem = {
        id: new Date().toString(),
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        city: city,
        states: states,
        gender: gender,
      };
      setList((prev) => [...prev, newItem]);
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCity("");
      setStates("");
      setGender("");
      setDateOfBirth("");
      console.log("Profile list =", list);
      alert("Your Data is added Successfully!");
    }

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  };

  // A function to clear the items in the list
  const clearList = () => {
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem("profileLists", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="mainContainer mx-auto container">
        <h1 className="font-semibold text-3xl text-center">
          Metro MAX Group Internship Assignment
        </h1>
        {/* //Add Profile Container  */}
        <div className="AddProfileContainer bg-blue-200 p-3 rounded-lg my-5 w-full">
          <h2 className="text-xl my-3 font-bold underline">Add Profile</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup hasValidation>
                  {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                  <Form.Control
                    type="number"
                    placeholder="Enter Phone Number"
                    aria-describedby="inputGroupPrepend"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter correct Phone Number
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="3">
                <Form.Label>Date of Birth</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    required
                    aria-describedby="inputGroupPrepend"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a valid Date.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  required
                  value={states}
                  onChange={(e) => setStates(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom05">
                <Form.Label>Gender</Form.Label>
                {/* <Form.Control type="text" placeholder="" required /> */}
                <Form.Select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option name="select">SELECT</option>
                  <option name="male">MALE</option>
                  <option name="female">FEMALE</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select a valid Gender.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button className="mt-4" type="submit">
              Add Profile
            </Button>
          </Form>
        </div>

        {/* //show Profiles Data Container Table  */}
        {list.length > 0 && (
          <div className="DisplayTableContainer my-5">
            <h2 className="text-3xl font-semibold underline">Profiles</h2>
            <div className="ms-auto my-3">
              <label className="fs-5">Total List Items </label>
              <strong className="fs-5">({list.length})</strong>
            </div>
            {/* TO search a particular item with full name  */}
            <Input
              type="text"
              placeholder="Enter full name to search an item"
              className="inputSearch my-4 p-2 border border-black"
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => setSearchedText(e.target.value)}
            />
            <Table
              dataSource={list}
              columns={column}
              onChange={onChange}
              pagination={{ pageSize: 5 }}
            />
            <Button onClick={() => clearList()} variant="danger">
              Clear List
            </Button>
            <Modal
              title="Edit Item in the List"
              open={isEditing}
              okText="Save"
              onCancel={() => resetEditing()}
              onOk={() => {
                setList((pre) => {
                  return pre.map((item) => {
                    if (item.id === editingItem.id) {
                      return editingItem;
                    } else {
                      return item;
                    }
                  });
                });
                resetEditing();
              }}
            >
              <Input
                value={editingItem?.fullName}
                onChange={(e) =>
                  setEditingItem((pre) => {
                    return { ...pre, fullName: e.target.value };
                  })
                }
              />
              <Input
                value={editingItem?.email}
                onChange={(e) =>
                  setEditingItem((pre) => {
                    return { ...pre, email: e.target.value };
                  })
                }
              />
              <Input
                value={editingItem?.phoneNumber}
                onChange={(e) =>
                  setEditingItem((pre) => {
                    return { ...pre, phoneNumber: e.target.value };
                  })
                }
              />
              <Input
                value={editingItem?.city}
                onChange={(e) =>
                  setEditingItem((pre) => {
                    return { ...pre, city: e.target.value };
                  })
                }
              />
              <Input
                value={editingItem?.states}
                onChange={(e) =>
                  setEditingItem((pre) => {
                    return { ...pre, states: e.target.value };
                  })
                }
              />
              <Input
                value={editingItem?.gender}
                onChange={(e) =>
                  setEditingItem((pre) => {
                    return { ...pre, gender: e.target.value };
                  })
                }
              />
              <Input
                value={editingItem?.dateOfBirth}
                onChange={(e) =>
                  setEditingItem((pre) => {
                    return { ...pre, dateOfBirth: e.target.value };
                  })
                }
              />
            </Modal>
          </div>
        )}
      </div>

      <footer className="bg-blue-400 text-white text-center p-3">
        Project Build and Designed By Piyush Kesarwani. All rights reserved
        2023.
      </footer>
    </>
  );
}

export default App;
