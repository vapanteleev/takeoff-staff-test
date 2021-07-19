import React from 'react'
import  { useState } from 'react'
import AddUserForm from './forms/AddUserForm'
import  UserTable  from './tables/UserTable'
import { EditUserForm } from './forms/EditUserForm'
import FormSearch from './forms/FormSearch'



const Main = () => {
  const usersData = [
    { id: 1, name: 'Victor',surname:'Panteleev', username: '89996922837' },
    { id: 2, name: 'Harry', surname: 'Potter', username: '8989705654' },
    { id: 3, name: 'Piter', surname: 'Parker', username: '482829492883' },
    { id: 4, name: 'Тетя', surname: 'Зина', username: '77777777777' },
    { id: 5, name: 'Иван', surname: 'Майонезов', username: '8905063298' },
    { id: 6, name: 'Руслан', surname: 'Батонов', username: '77777777777' },
    { id: 7, name: 'Катя', surname: 'Зайцева', username: '888888888888' },
    { id: 8, name: 'Олег', surname: 'Денисов', username: '1234567890' },
    { id: 9, name: 'Denis', surname: 'Panteleev', username: '77777777777' },







    
  ]

  const searchData = '';
  const [search, setSearch] = useState(searchData)



  const [users, setUsers] = useState(usersData)
    const [usersClone, setUsersClone] = useState([...usersData])

  
    const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '',surname:'', username: '' }

  const [currentUser, setCurrentUser] = useState(initialFormState)


  
 const searchHandler = (search) => {
   console.log(search)
   setSearch(search)
    
  };
  const filteredData = () => {

    if (!search) {
      return users;
    }


    
  

    

    

   
    var result = usersClone.filter((item) => {
     
     
     return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.surname.toLowerCase().includes(search.toLowerCase())
     )
      
      
      
    })
     if (!result.length) {
      result = []
      
    }
    return result;
    
    




  }


  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
    setUsersClone([...users,user])
  }

  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
        setUsersClone(usersClone.filter(user => user.id !== id))

  }

    const updateUser = (id, updatedUser) => {
    setEditing(false)
  setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    }
  
  const editRow = user => {
    setEditing(true)
 
    setCurrentUser({ id: user.id, name: user.name, username: user.username ,surname:user.surname})
  }
  
 



  

  return (
    <>
   
      <div className="container">
        
          <header>
            <h1>Contact list</h1>
          </header>
  

          <div className="flex-row">
            <div className="flex-large">
              {editing ? (
                <div>
                  <h2>Edit user</h2>
                  <EditUserForm
                    editing={editing}
                    setEditing={setEditing}
                    currentUser={currentUser}
                    updateUser={updateUser}
                  />
                </div>
              ) : (
                <div>
                  <h2>Add contact</h2>
                  <AddUserForm addUser={addUser} />
                </div>
              )}
            </div>
            <div className="flex-large">
              <h2>Search contacts</h2>
              <FormSearch onSearch={searchHandler} />

              <UserTable users={filteredData()} editRow={editRow} deleteUser={deleteUser} />
            </div>
          </div>
     
        </div>
      </>
  )
}

export default Main