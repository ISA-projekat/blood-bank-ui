import "../AdminUsersView/AdminUsersView.scss";
import { useState, useEffect } from "react";
import { adminSearch } from "../../services/admin/AdminService";
import { getAllUsers } from "../../services/user/UserService";

const AdminUsersView = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState();
  const [surname, setSurname] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getAllUsers().then((response) => {
      setUsers(response.data);
    });
  };

  function nameChanged(event) {
    setName(event.target.value);
  }

  function surnameChanged(event) {
    setSurname(event.target.value);
  }

  function tableChanged(event) {
    setUsers(event.target.value);
  }

  async function submit() {
    const dto = { firstName: name, lastName: surname };
    const response = await adminSearch(dto);
    setUsers(response.data);
  }

  return (
    <div className="out">
      <div className="outter">
        <input value={name} onChange={nameChanged} className="inputSt" />
        <input value={surname} onChange={surnameChanged} className="inputSt" />
        <button className="buttonSt" onClick={submit}>
          Search
        </button>
        <div className="uTable">
          <table onChange={tableChanged}>
            <th>Name</th>
            <th>Surname</th>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersView;
