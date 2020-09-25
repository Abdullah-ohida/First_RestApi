// Import Modules
const express = require('express');
const Joi = require('joi')

// Initialize App
const app = express();

// Middle ware
app.use(express.json());

// Create a static database
const lists = [
    {
        id: 1,
        name: "First List" 
    },
    {
        id: 2,
        name: "Second List"
    },
    {
        id: 3,
        name: "Third List"
    },
]

// Get handler
app.get('/vidly/api/lists', (req, res)=>{
    return res.send(lists)
});

// Get indiviual list
app.get('/vidly/api/lists/:id', (req, res) => {
    const list = lists.find((c=> c.id === parseInt(req.params.id)));
    if (!list) return res.status(404).send('The course with the given ID was not found!')
    res.send(list)
});

// Post handler
app.post('/vidly/api/lists/', (req, res)=>{

    const {error} = validation(req.body)
    if(error){
        return res.status(400).send(error.message)
    }

    const list = {
        id: lists.length + 1,
        name: req.body.name,
    };
    lists.push(list);
    res.send(list)
});

// Put handler
app.put('/vidly/api/lists/:id', (req, res)=>{
    const list = lists.find((c => c.id === parseInt(req.params.id)));
    if (!list) return res.status(404).send('The course with the given ID was not found!');

    const { error } = validation(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    
    list.name = req.body.name,
    res.send(list)
});

// delete Handler
app.delete('/vidly/api/lists/:id', (req, res) => {
    const list = lists.find((c => c.id === parseInt(req.params.id)));
    if (!list) return res.status(404).send('The course with the given ID was not found!');

    const index = lists.indexOf(list);
    lists.splice(index, 1);

    res.send(list)
});

// Validation function
function validation(value){
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required()
    });

    return schema.validate(value)
}
// Create server
app.listen(3000, ()=> console.log("App started running at 3000"));