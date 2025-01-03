const express = require("express");
const bodyParser = require("body-parser")

const app = express();


// * Middleware
app.use(bodyParser.json());

/**
 * 
 * C U R D
 * 
 * Post 
 * create: User , class, attendance, subject, time table
 * 
 * Put
 * update: User, 
 * 
 *
 * Get: 
 * Read single item 
 * 
 *  Delete:
 * delete: user, class, attendance
 * 
 */

let users = [
    {
      "_id": 1735927470469,
      "first_name": "Pavan Mortale"
    },
    {
      "_id": 1735927487703,
      "first_name": "Swap Mortale"
    },
    {
      "_id": 1735927494027,
      "first_name": "Swapnil Mortale"
    }
];

// * completed
app.post("/users", function(request, response, next){
    const user = {
        _id: Date.now(),
        first_name: request.body.first_name,
    }
    users.push(user);
    response.status(200).json(user);
})

// * completed
app.get("/users", function(request, response, next){
    response.status(200).json(users);
})

app.put("/users", function(request, response, next){

    const updatedUser = {
        _id: request.body._id,
        first_name: request.body.first_name,
    }

    let index = -1;

    for (let i=0; i<users.length; i++){
        if (users[i]._id == updatedUser._id){
            index = i;
            break;
        }
    }

    if (index == -1){
        response.status(400).json({message: "User not found"});
    }else{
        users[index] = updatedUser;
        response.status(200).json(updatedUser);
    }
})

app.delete("/users/:_id", function(request, response, next){

    const _id = request.params._id;

    let index = -1;

    for (let i=0; i<users.length; i++){
        if (users[i]._id == _id){
            index = i;
            break;
        }
    }

    if (index == -1){
        response.status(400).json({message: "User not found"});
    }else{

        users = users.filter(function(value, index, array){
            return value._id != _id;
        })

        response.status(200).json({message: "user deleted", _id: _id});

    }
})





app.listen(3000, ()=>{
    console.log("Server started")
})