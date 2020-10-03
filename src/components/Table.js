import React from "react";

export default function Table(props) {
    return (
        <tr className="text-center h5 text-secondary">
            <td>
                <img src={props.photo} alt="employee" />
            </td>
            <td className="align-middle">{props.name}</td>
            <td className="align-middle">{props.email}</td>
            <td className="align-middle">{props.phone}</td>
            <td className="align-middle">{props.location}</td>
            <td className="align-middle">{props.dob}</td>
        </tr>
    );
}