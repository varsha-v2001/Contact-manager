import React from "react";
import ContactItem from "./ContactItem";
import { Col, Row } from "react-bootstrap";

const ContactList = ({ contacts, updateContact, deleteContact }) => {
  return (
    <div className="mb-5">
    <Row>
      {contacts.length > 0 ? 
        contacts.map(contact => (
            <Col lg={3} md={4} sm={6} className="mb-3">
                <ContactItem key={contact.id} contact={contact}  updateContact={updateContact} deleteContact={deleteContact}/>
            </Col>
        )) 
         : 
        <div className="text-danger fw-bold fs-2">No contacts available...!!!</div>
      }
      </Row>
    </div>
  );
};

export default ContactList;
