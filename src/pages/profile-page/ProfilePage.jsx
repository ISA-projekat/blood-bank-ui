import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

export default function ProfilePage() {
    const { id } = useParams();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [occupation, setOccupation] = useState("");
    const [email, setEmail] = useState("");
    const [user, setUser] = useState({});
    
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8080/user/${id}`)
        .then(res => res.json())
        .then(data => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setPhoneNumber(data.phoneNumber);
            setOccupation(data.occupation);
            setEmail(data.email);
            setUser(data);
        })
    }, [id]);

    const onEditPress = () => {
        setIsEditing(!isEditing);
    }

    const onSubmitEdit = (event) => {
        let changedUser = {
            "id": user.id,
            "email": email,
            "password": user.password,
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
        <div>
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

                <input type={"submit"} value={"Submit"} disabled={!isEditing} />
            </form>
            <button onClick={() => {onEditPress()}}>Edit</button>

        </div>
    );
}