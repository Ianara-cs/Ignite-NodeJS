const express = require('express')
const {v4 : uuidv4} = require('uuid')

const app = express()
app.use(express.json())

const customers = []

// Middleware
function verifyExistsAccountCPF(req, res, next) {
    const {cpf} = req.headers

    const customer = customers.find((customer) => customer.cpf === cpf)

    if(!customer) {
        return res.status(400).json({error: 'Customer not found!'})
    }

    req.customer = customer

    return next()
}

function getBalance(statement){
    const balence = statement.reduce((acc, operation) => {
        if(operation.type === 'credit') {
            return acc + operation.amount
        }else {
            return acc - operation.amount
        }
    }, 0)

    return balence
}

app.post("/account", (request, response) => {
    const {cpf, name} = request.body

    const customersAlreadyExist = customers.some((customers) => customers.cpf === cpf)

    if(customersAlreadyExist) {
        return response.status(400).json({error: 'Customer Already Exist!'})
    }

    customers.push({
        cpf: cpf,
        name: name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send()
})

app.get("/statement", verifyExistsAccountCPF, (req, res) => {
    const {customer} = req
    return res.json(customer.statement)
})

app.post("/deposit", verifyExistsAccountCPF, (req, res) => {
    const {description, amount} = req.body

    const {customer} = req

    const statementOperation = {
        description,
        amount,
        create_at: new Date(),
        type: 'credit'
    }

    customer.statement.push(statementOperation)
    return res.status(201).send()
})

app.post("/withdraw", verifyExistsAccountCPF, (req, res) => {
    const {amount} = req.body

    const {customer} = req

    const balance = getBalance(customer.statement)

    if(balance < amount) {
       return res.status(400).json({error: 'Insufficient funds!'})
    }

    const statementOperation = {
        amount,
        create_at: new Date(),
        type: 'debit'
    }

    customer.statement.push(statementOperation)
    return res.status(201).send()
})

app.get("/statement/date", verifyExistsAccountCPF, (req, res) => {
    const {customer} = req
    const date = req.query
    const dateFormat = new Date(date + " 00:00") 

    const statement = customer.statement.filter((statement) => statement.create_at.toDateString() ===
    new Date(dateFormat).toDateString)

    return res.json(customer.statement)
})

app.put("/account", verifyExistsAccountCPF, (req, res) => {
    const {name} = req.body
    const {customer} = req

    customer.name = name
    return res.status(201).send()
})

app.get("/account", verifyExistsAccountCPF, (req, res) => {
    const {customer} = req
    return res.json(customer)

})

app.delete("/account", verifyExistsAccountCPF, (req, res) => {
    const {customer} = req

    customers.splice(customer, 1)

    return res.status(204).send()
})

app.get("/balance", verifyExistsAccountCPF, (req, res) => {
    const {customer} = req

    const balance = getBalance(customer.statement)

    return res.json(balance)
})

app.listen(3131)