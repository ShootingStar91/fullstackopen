
const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {

    console.log("Invalid arguments. Possible arguments: password, or: password name number")

} else {

    const password = process.argv[2]
    const url =
      `mongodb+srv://frankuniqueunit:${password}@cluster0.cfycw.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority`
    
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    
    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
      })
      
    const Person = mongoose.model('Person', personSchema)
  
    if (process.argv.length === 3) {
        // Find all
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    
    } else {
        const name = process.argv[3]
        const number = process.argv[4]

        // Add name + person


        const person = new Person({
            name: name,
            number: number,
        })
        person.save(function(err, res) {
            if (err) {
                console.log("error at save: ", err)
            }
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    }

}
