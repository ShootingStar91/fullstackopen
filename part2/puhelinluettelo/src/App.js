import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const ShowError = ( { message } ) => {
  if (message === null) {
    return null
  }
  
  return <div className="error">{message}</div>
}

const ShowMessage = ( { message } ) => {
  if (message === null) {
    return null
  }
  
  return <div className="success">{message}</div>
}

const DeleteButton = (props) => {
  return (
    <button onClick={props.handleDeleteButton} value={props.id}>Poista</button>
  )
}

const FilteringForm = (props) => {
  return (
    <div>
    <p>Suodata näytetyt nimet: </p>
        <p><input onChange={props.handleFilterChange}/></p>
    </div>
  )
}

const AddingForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addEntry}>
        Nimi: <input onChange={props.handleNameChange} />
        <div>
          Puhelinnumero: <input onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
    </div>
    )
}

const DisplayPersons = (props) => {

  return (
    <div>
      {props.shownNames.map((person) => 
        <p key={person.name}>{person.name} {person.number} 
          <DeleteButton handleDeleteButton={props.handleDeleteButton} id={person.id} />
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ shownNames, setShownNames ] = useState(persons)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    const result = personService.getAll((data) => {
      setPersons(data)
      setShownNames(data)
    })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()

    // Check if exists
    if (persons.filter(person => person.name === newName).length > 0) {
      const confirm = window.confirm(`Muutetaanko henkilön ${newName} puhelinnumeroa?`)
      if (!confirm) { return }

      // Update old number
      const id = persons.find((person) => person.name === newName).id
      const newPerson = {name: newName, number: newNumber, id: id}
      personService.update(newPerson,
        ).then((response) => {
        setSuccessMessage("Puhelinnumero päivitettiin onnistuneesti")
        setTimeout(() => {
          setSuccessMessage(null)
    
        }, 5000)
      }).catch(error => {
        setErrorMessage("Puhelinnumero on aiemmin poistettu tietokannasta")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      
      const newPersonList = persons.filter((person) => person.id != id).concat(newPerson)
      setPersons(newPersonList)
      setShownNames(newPersonList)      

      return
    }
    const newPerson = {name: newName, number: newNumber}
    const newPersons = [...persons, newPerson]
    setPersons(newPersons)
    setShownNames([...persons, newPerson])

    // Send to server
    const result = personService.create(newPerson)
    result.then((newPerson) => {
      const newPersonList = persons.concat(newPerson)
      setPersons(newPersonList)
      setShownNames(newPersonList)
      setSuccessMessage("Puhelinnumero lisättiin onnistuneesti")
      setTimeout(() => {
        setSuccessMessage(null)
  
      }, 5000)
    }
    ).catch(error => {
      setErrorMessage("Puhelinnumeron lisääminen ei onnistunut")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    })

  }

  const handleFilterChange = (event) => {
    const name = event.target.value.toLowerCase()
    if (name === '') {
      setShownNames(persons)
      return
    }
    const newShownNames = persons
      .filter(person => person.name.toLowerCase().includes(name))
    setShownNames(newShownNames)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeleteButton = (event) => {
    const personId = event.target.value
    const confirm = window.confirm("Poistetaanko " + persons.find((person) => person.id === personId))
    if (!confirm) {
      return
    }
    const result = personService.deletePerson(personId, () => {
      const newPersonList = persons.filter((person) => person.id != personId)
      setPersons(newPersonList)
      setShownNames(newPersonList)
      setSuccessMessage("Puhelinnumero poistettiin onnistuneesti")
      setTimeout(() => {
        setSuccessMessage(null)
  
      }, 5000)
    },
    () => {
      setErrorMessage("Puhelinnumero on jo aiemmin poistettu")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })


  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <ShowMessage message={successMessage}/>
      <ShowError message={errorMessage}/>
      <FilteringForm handleFilterChange={handleFilterChange} />
      <h3>Lisää numero</h3>
      <AddingForm handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange}
                  addEntry={addEntry} />
      <h3>Numerot</h3>
      <DisplayPersons shownNames={shownNames} handleDeleteButton={handleDeleteButton} />
    </div>
  )

}

export default App