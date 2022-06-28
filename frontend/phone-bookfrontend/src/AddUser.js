import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";

const AddUser = ({ onAdd }) => {
  const [First_Name, setFirstName] = useState("");
  const [Last_Name, setLastName] = useState("");
//   const [starring, setStarring] = useState("");
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    API.get("/")
      .then((res) => {
        setUsers(res.data);
        // setFirstName(res[0].First_Name)
        // setLastName(res[0].Last_Name)
        // setStarring(res[0].starring)
        // setUserId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // In future we add Phone_Number in let item
    let item = { First_Name, Last_Name };
    API.post("/", item).then(() => refreshUsers());
  };

  const onUpdate = (id) => {
    let item = { First_Name };
    API.patch(`/${id}/`, item).then((res) => refreshUsers());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshUsers());
  };

  function selectUser(id) {
    let item = users.filter((user) => user.id === id)[0];
    setFirstName(item.First_Name);
    setLastName(item.Last_Name);
    // setStarring(item.starring);
    setUserId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Create a new User</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicFirst_Name">
              <Form.Label>{userId}First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={First_Name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLast_Name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={Last_Name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicStarring">
              <Form.Label>Starring</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Starring"
                value={starring}
                onChange={(e) => setStarring(e.target.value)}
              />
            </Form.Group> */}

            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(userId)}
                className="mx-2"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">First Name</th>
                <th scope="col">Last_Name</th>
                {/* <th scope="col">Starring</th> */}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key="">
                    <th scope="row">{user.id}</th>
                    <td> {user.First_Name}</td>
                    <td>{user.Last_Name}</td>
                    {/* <td>{user.starring}</td> */}
                    <td>
                      <i
                        className="fa fa-pencil-square text-primary d-inline"
                        aria-hidden="true"
                        onClick={() => selectUser(user.id)}
                      ></i>
                      <i
                        className="fa fa-trash-o text-danger d-inline mx-3"
                        aria-hidden="true"
                        onClick={() => onDelete(user.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
