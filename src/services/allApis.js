import commonAPI from './commonApi'
import { serverUrl } from './serverUrl'

// saving contact to server
export const saveContactAPI=async(contact)=>{
    return await commonAPI("POST",`${serverUrl}/contacts`,contact)
}

// retreiving contact details
export const getContactAPI=async()=>{
    return await commonAPI("GET",`${serverUrl}/contacts`,"")
}

// updating contact details
export const updateContactAPI=async(updatedContact)=>{
    return await commonAPI("PUT",`${serverUrl}/contacts/${updatedContact.id}`,updatedContact)
}

// deleting contact 
export const deleteContactAPI=async(id)=>{
    return await commonAPI("DELETE",`${serverUrl}/contacts/${id}`,{})
}


