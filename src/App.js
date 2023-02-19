import React, { useState } from 'react';
import { uid } from 'uid';
import './App.css';
import List from "./List";
import ReactPaginate from 'react-paginate';
import { Row, Col, Container, Alert } from 'react-bootstrap';


function App() {

  const regex = /^[a-zA-Z0-9_ ]*$/;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const [contacts, setContacts] = useState([

  ]);

  const [isupdate, setisUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "",
    kendaraan: "",
    Merk: "",
    telp: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 4;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(contacts.length / PER_PAGE);

  const handleClick = () => {
    setAlertVariant("success");
    setAlertMessage("This is a success message!");
    setShowAlert(true);
  };

  const handleClose = () => setShowAlert(false);

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;

    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.name === "" || formData.kendaraan === "" || formData.Merk === "" || formData.telp === "") {
      setAlertVariant("danger");

      setAlertMessage("Harap isi semua field");

      setShowAlert(true);
      return;
    }

    if (!regex.test(formData.name)) {
      setAlertVariant("danger");
      setAlertMessage("Inputan tidak valid");
      setShowAlert(true);
      return;
    }

    if (!/^[a-zA-Z\s]*$/.test(formData.kendaraan || formData.Merk)) {
      setAlertVariant("danger");
      setAlertMessage("Hanya boleh mengandung huruf");
      setShowAlert(true);
      return;
    }

    if (/^\d+$/.test(formData.telp) === false) {
      setAlertVariant("danger");
      setAlertMessage("Nomor telepon hanya boleh berisi angka");
      setShowAlert(true);
      return;
    }
    let data = [...contacts];

    if (isupdate.status) {
      data.forEach((contacts) => {
        if (contacts.id === isupdate.id) {
          contacts.name = formData.name;
          contacts.kendaraan = formData.kendaraan;
          contacts.Merk = formData.Merk;
          contacts.telp = formData.telp;
        }
      });
    } else {
      data.push({
        id: uid(),
        name: formData.name,
        kendaraan: formData.kendaraan,
        Merk: formData.Merk,
        telp: formData.telp
      });
    }

    setAlertVariant("success");
    setAlertMessage("Data berhasil ditambahkan");
    setShowAlert(true);

    //menambahkan
    setisUpdate({ id: null, status: false });
    setContacts(data);
    setFormData({
      name: "",
      kendaraan: "",
      Merk: "",
      telp: ""
    });
  }
  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contacts) => contacts.id === id);
    setFormData({
      name: foundData.name,
      kendaraan: foundData.kendaraan,
      Merk: foundData.Merk,
      telp: foundData.telp
    });
    setisUpdate({ id: id, status: true });
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filteredData = data.filter((contacts) => contacts.id !== id);
    setContacts(filteredData);
    setAlertVariant("success");
    setAlertMessage("Data berhasil dihapus");
    setShowAlert(true);
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <div className="App">
      <h1 className="font-weight-bold">CRUD Zaputlah</h1>
      <Container className='app-header'>
        <Row>
          <Col sm={6}>
            <form onSubmit={handleSubmit} className="">
              <form className="form-group">
                <label htmlFor="">Name</label>
                <input type="text" onChange={handleChange} className="form-control" value={formData.name} name="name" />
              </form>
              <form className="form-group">
                <label htmlFor="">kendaraan</label>
                <input type="text" onChange={handleChange} className="form-control" value={formData.kendaraan} name="kendaraan" />
              </form>
              <form className="form-group">
                <label htmlFor="">Merk</label>
                <input type="text" onChange={handleChange} className="form-control" value={formData.Merk} name="Merk" />
              </form>
              <div className="form-group">
                <label htmlFor="">No. Telp</label>
                <input type="text" onChange={handleChange} className="form-control" value={formData.telp} name="telp" />
              </div>
              <div>
                <button onClick={handleClick} type="submit" className="btn btn-info w-100 mt-3 mb-3">
                  Save
                </button>
              </div>
            </form>
          </Col>
          <Col sm={6}>
            <div className="mt-3">
              {showAlert && (
                <Alert variant={alertVariant} onClose={handleClose} dismissible>
                  {alertMessage}
                </Alert>
              )}
            </div>
            <List handleDelete={handleDelete} handleEdit={handleEdit} data={contacts.slice(offset, offset + PER_PAGE)} />
            <div className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
