import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // display alert
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')

      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed')
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
      e.target.reset();


    }

  }

  // this function will show alert message when user submit the form
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })

  }

  // this function will clear all items in the list
  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  // this function will remove single item from the list
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  // this function will edit single item from the list
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    const inputText = document.getElementById('inp');
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
    console.log(id)
    inputText.value = specificItem.title

  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* show alert when alert state is true */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            id='inp'
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            onChange={(e) => setName(e.target.value)}

          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  )
}

export default App
