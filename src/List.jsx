import React from "react";
import { Table } from "react-bootstrap";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function List({ data, handleEdit, handleDelete }) {
    return (
        <div className="list-group">
            <div className="table-responsive">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Kendaraan</th>
                            <th>Merk</th>
                            <th>Telp</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(contacts => (
                            <tr key={contacts.id}>
                                <td>{contacts.name}</td>
                                <td>{contacts.kendaraan}</td>
                                <td>{contacts.Merk}</td>
                                <td>{contacts.telp}</td>
                                <td>
                                    <button className="btn btn-light" onClick={() => handleEdit(contacts.id)}><FontAwesomeIcon icon={faEdit} color="green" /></button>
                                    <button className="btn btn-light" onClick={() => handleDelete(contacts.id)}><FontAwesomeIcon icon={faTrash} color="red" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}