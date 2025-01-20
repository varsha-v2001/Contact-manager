import React, { useState } from "react";

const ContactItem = ({ contact, updateContact, deleteContact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleUpdate = () => {
    updateContact(contact.id, updatedContact);
    setIsEditing(false);
  };

  return (
    <div className="border border-dark text-justify p-3 rounded  bg-light">
      {isEditing ? 
        <>
          <input className="mb-2 rounded p-2" type="text" value={updatedContact.name} onChange={(e) => setUpdatedContact({ ...updatedContact, name: e.target.value })}/>
          <input className="mb-2 rounded p-2" type="email" value={updatedContact.email} onChange={(e) => setUpdatedContact({ ...updatedContact, email: e.target.value })}/>
          <input className="mb-2 rounded p-2" type="text" value={updatedContact.phone} onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })}/> <br />
          <button className="btn btn-success rounded p-3" onClick={handleUpdate}>Save</button>
        </>
       : 
        <>
          <h4>{contact.name}</h4>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
          <button className="btn btn-warning rounded p-3" onClick={() => setIsEditing(true)}>Edit</button>
        </>
      }
      <button className="btn btn-danger rounded p-3 ms-3" onClick={() => deleteContact(contact.id)}>Delete</button>
    </div>
  )
};

export default ContactItem;
