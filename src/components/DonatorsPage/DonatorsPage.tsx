import { ConstructionOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as donatorsService from "../../services/DonatorsService";
import { UserDto } from "../../store/bloodbank/details/Types";
import "./DonatorsPage.css";

const DonatorsPage = () => {
  const { bloodBankId } = useParams();
  const [donators, setDonators] = useState<UserDto[]>();
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    fetchDonators();
  }, []);

  const fetchDonators = async () => {
    const res = await donatorsService.getDonators(Number(bloodBankId || "0"));
    setDonators(res.data);
    console.log(res.data);
  };

  const sortDonators = (parameter: string, type: string) => {
    let newDonators = donators;
    if (parameter === "name" && type === "asc")
      setDonators(
        newDonators?.sort((a, b) => a.firstName.localeCompare(b.firstName))
      );
    if (parameter === "name" && type === "desc")
      setDonators(
        newDonators?.sort((a, b) => -1 * a.firstName.localeCompare(b.firstName))
      );
    if (parameter === "lastName" && type === "asc")
      setDonators(
        newDonators?.sort((a, b) => a.lastName.localeCompare(b.lastName))
      );
    if (parameter === "lastName" && type === "desc")
      setDonators(
        newDonators?.sort((a, b) => -1 * a.lastName.localeCompare(b.lastName))
      );
    if (parameter === "donationDate" && type === "asc")
      setDonators(
        newDonators?.sort(
          (a, b) =>
            getDate(a.donationDate).getTime() -
            getDate(b.donationDate).getTime()
        )
      );
    if (parameter === "donationDate" && type === "desc")
      setDonators(
        newDonators?.sort(
          (a, b) =>
            getDate(b.donationDate).getTime() -
            getDate(a.donationDate).getTime()
        )
      );
    setRefreshKey(refreshKey + 1);
  };

  const getDate = (date: string) => {
    const values = date.slice(0, 5);
    const newDate = new Date(
      Number(values[0]),
      Number(values[1]) - 1,
      Number(values[2]),
      Number(values[3]),
      Number(values[4])
    );
    return newDate;
  };

  return (
    <div>
      <h2>List off all the donators for my blood bank</h2>
      Sort by name
      <button onClick={() => sortDonators("name", "asc")}>ascending</button>
      <button onClick={() => sortDonators("name", "desc")}>descending</button>
      <br />
      Sort by last name
      <button onClick={() => sortDonators("lastName", "asc")}>ascending</button>
      <button onClick={() => sortDonators("lastName", "desc")}>
        descending
      </button>
      <br />
      Sort by donation date
      <button onClick={() => sortDonators("donationDate", "asc")}>
        ascending
      </button>
      <button onClick={() => sortDonators("donationDate", "desc")}>
        descending
      </button>
      <br />
      <ul key={refreshKey}>
        {donators?.map((d) => {
          return (
            <li key={d.id}>
              <>
                {d.firstName} {d.lastName}{" "}
                {getDate(d.donationDate).toDateString()}
              </>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DonatorsPage;
