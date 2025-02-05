import React, { useState, useEffect } from "react"
import ContactList from "./components/ContactList"
import Modal from 'react-bootstrap/Modal';
import "./App.css"
import 'animate.css'
import { Form } from "react-bootstrap";
import { deleteContactAPI, getContactAPI, saveContactAPI, updateContactAPI } from "./services/allApis";
import intro from './assets/intro.gif'

const App = () => {
  const [contacts, setContacts] = useState([])

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      addContact({ name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      handleClose()
    }
  }

  // Fetching contacts from JSON Server
  const fetchContacts = async () => {
    try {
      const response = await getContactAPI()
      setContacts(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  // Add new contact
  const addContact = async (contact) => {
    try {
      const response = await saveContactAPI(contact)
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  // Update contact
  const updateContact = async (id, updatedContact) => {
    try {
      const response = await updateContactAPI(updatedContact)
      setContacts(
        contacts.map((contact) => (contact.id === id ? response.data : contact))
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await deleteContactAPI(id)
      setContacts(contacts.filter((contact) => contact.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [deleteContact, updateContact])

  return (
    <div className="text-start">
      {/* navbar */}
      <nav className="p-3 w-100 bg-primary text-light">
        <a style={{ textDecoration: 'none', color: 'white' }} className="fs-3" href="#">Contact Manager</a>
      </nav>


      {/* into */}
      <div style={{background:'linear-gradient(to bottom, rgba(233,171,148,1) 25%, rgb(233, 164, 148) 67%,transparent)'}} className="w-100 mb-3 d-flex justify-content-around align-items-center">
        <div className="w-25 ms-5 p-3">
          <h1 className="text-primary fw-bold animate__animated  animate__bounceInDown">Welcome to Contact Manager....</h1>
          <h5 className="text-white fw-bold animate__animated animate__bounceInLeft">Create, edit and delete contacts. Let's get in contact with everyone!!!</h5>
        </div>
        <div className="animate__animated animate__bounceIn">
          <img className="img-fluid" src={intro} alt="" />
        </div>
      </div>





      {/* content */}
      <div className="ms-3 flex flex-column">
        <h2 className="mb-5">Add contacts <span onClick={handleShow} className="btn btn-dark rounded-circle ms-2">+</span></h2>
        <ContactList contacts={contacts} updateContact={updateContact} deleteContact={deleteContact} />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{backgroundColor:'rgba(255, 255, 255, 0.4)'}}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD CONTACT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-column text-center">
            <Form className="contact-form">
              <Form.Control className="mb-3 p-2 rounded " type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Form.Control className="mb-3 p-2 rounded " type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Form.Control className="mb-3 p-2 rounded " type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <button onClick={handleSubmit} className="btn btn-success mb-3 p-2 rounded w-50" type="submit">Add Contact</button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default App;
