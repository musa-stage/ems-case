const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors())

// Sample employee list
let employees = [];

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.post('/add', (req, res) => {
    const newEmployee = req.body;
    if (newEmployee && newEmployee.name && newEmployee.department && newEmployee.age && newEmployee.salary && newEmployee.location && newEmployee.gender) {
        employees.push(newEmployee);
          res.status(201).send({ message: 'Employee added successfully', employee: newEmployee });
    } else {
        res.status(400).send({ message: 'Invalid employee data' });
    }
});

app.get('/employees', (req, res) => {
      res.send(employees);
});

app.delete('/employees/:id', (req, res) => {
      const id = req.params.id;
      employees = employees.filter(employee => employee.id !== id);
      res.send({ message: 'Employee deleted successfully' });
});

app.put('/employees/:id', (req, res) => {
      const id = req.params.id;
      const updatedEmployee = req.body;
      employees = employees.map(employee => employee.id === id ? updatedEmployee : employee);
      res.send({ message: 'Employee updated successfully', employee: updatedEmployee });
});

app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
})