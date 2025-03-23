const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vilipi2009:${password}@cluster1.xbtlt1u.mongodb.net/scoreApp?retryWrites=true&w=majority&appName=Cluster1`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const testSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Test = mongoose.model('Test', testSchema)

const test = new Test({
  content: 'HTML is easy',
  important: true,
})

test.save().then(result => {
  console.log('test saved!')
  mongoose.connection.close()
})