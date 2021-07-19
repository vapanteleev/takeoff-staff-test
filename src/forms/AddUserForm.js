import React, { useState } from 'react'

const AddUserForm = props => {
  const initialFormState = { id: null, name: '', surname:'',username: '' }
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.currentTarget
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!user.name || !user.username || !user.surname) return

    props.addUser(user)
    
    setUser(initialFormState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <label>Surname</label>
      <input
        type="text"
        name="surname"
        value={user.surname}
        onChange={handleInputChange}
      />
      <label>Telephone number</label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
      />
      <button>Add new contact</button>
    </form>
  )
}
export default AddUserForm 