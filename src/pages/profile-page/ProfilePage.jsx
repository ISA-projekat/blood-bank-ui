import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/Layout/MainLayout/PageLayout";
import { getById } from "../../services/user/UserService";

export default function ProfilePage() {
    const { id } = useParams();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [occupation, setOccupation] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState({});
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        const response = await getById(id);

        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhoneNumber(response.data.phoneNumber);
        setOccupation(response.data.occupation);
        setEmail(response.data.email);
        setUser(response.data);
    }

    const onEditPress = () => {
        setIsEditing(!isEditing);
    }

    const onSubmitEdit = (event) => {
        if (user.bloodBankId && oldPassword !== user.password && ( oldPassword || newPassword )) {
            alert("Password error");
            return;
        }
        let changedUser = {
            "id": user.id,
            "email": email,
            "password": newPassword || user.password,
            "firstName": firstName,
            "lastName": lastName,
            "jmbg": user.jmbg,
            "phoneNumber": phoneNumber,
            "occupation": occupation,
            "active": user.active,
            "penalties": user.penalties,
            "address": user.address,
            "role": user.role,
            "gender": user.gender,
            "bloodBankId": user.bloodBankId
        }

        fetch("http://localhost:8080/user", {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(changedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });

        event.preventDefault();
    }

    return(
        <PageLayout>
            <form onSubmit={(e) => onSubmitEdit(e)}>
                <label>
                    Email:
                    <input type={"text"} value={email} disabled={true} />
                </label><br />

                <label>
                    First Name:
                    <input type={"text"} value={firstName} onChange={(e) => {setFirstName(e.target.value)}} disabled={!isEditing} />
                </label><br />

                <label>
                    Last Name:
                    <input type={"text"} value={lastName} onChange={(e) => {setLastName(e.target.value)}} disabled={!isEditing} />
                </label><br />

                <label>
                    Phone Number:
                    <input type={"text"} value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} disabled={!isEditing} />
                </label><br />

                <label>
                    Occupation:
                    <input type={"text"} value={occupation} onChange={(e) => {setOccupation(e.target.value)}} disabled={!isEditing} />
                </label><br />

                {user && user.bloodBankId && (<><label>
                    Old password:
                    <input type={"password"} onChange={(e) => {setOldPassword(e.target.value)}} disabled={!isEditing} />
                </label><br /></>)}

                {user && user.bloodBankId && (<><label>
                    New password:
                    <input type={"password"} onChange={(e) => {setNewPassword(e.target.value)}} disabled={!isEditing} />
                </label><br /></>)}

                <input type={"submit"} value={"Submit"} disabled={!isEditing} />
            </form>
            <button onClick={() => {onEditPress()}}>Edit</button>

        </PageLayout>
    );
}