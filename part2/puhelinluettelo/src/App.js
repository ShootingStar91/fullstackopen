import React, { useState } from 'react'

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

const Persons = (props) => {
  return (
    <div>
      {props.shownNames.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
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

  const addEntry = (event) => {
    event.preventDefault()

    // Check if exists
    if (persons.filter(person => person.name === newName).length > 0) {
      window.alert(`Nimi ${newName} on jo puhelinluettelossa.`)
      setNewName("")
      return
    }
    const newPerson = {name: newName, number: newNumber}
    const newPersons = [...persons, newPerson]
    setPersons(newPersons)
    setShownNames([...persons, newPerson])
  }

  const handleFilterChange = (event) => {
    const name = event.target.value.toLowerCase()
    if (name === '') {
      setShownNames(persons)
      return
    }
    const newShownNames = persons.filter(person => person.name.toLowerCase().includes(name))
    setShownNames(newShownNames)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <FilteringForm handleFilterChange={handleFilterChange} />
      <h3>Lisää numero</h3>
      <AddingForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        addEntry={addEntry} />
      <h3>Numerot</h3>
      <Persons shownNames={shownNames} />
    </div>
  )

}

export default App