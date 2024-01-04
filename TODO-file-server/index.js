const express = require("express");
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()

// let todos = []

app.use(bodyParser.json());


function findIndex(arr , id){
    for(let i = 0 ; i<arr.length ; i++){
        if(arr[i].id == id)return i;
    }
    return -1;

}

function removeIndex(arr , index){
    let newArray = []
    for(let i = 0 ; i<arr.length ; i++){
        if(i!=index) newArray.push(arr[i]);
    }
    fs.writeFile("todo.json" , JSON.stringify(newArray) , (err)=>{
        if(err) throw err;
    })
}


app.get("/todos" , (req ,res)=>{
    fs.readFile("todo.json" , "utf-8" , (err ,data)=>{
        if(err) throw err
        res.json(JSON.parse(data))
    })
})

app.post("/todos" , (req ,res)=>{
    const newTodo = {
        id:Math.floor(Math.random() * 10000), //Generate Random id
        title: req.body.title,
        description:req.body.description
    }
    fs.readFile("todo.json" , "utf-8" , (err , data)=>{
        if (err) throw err;
        const todos = JSON.parse(data)
        todos.push(newTodo);
        fs.writeFile("todo.json" , JSON.stringify(todos) , (err)=>{
            if(err) throw err;
            res.status(201).json(newTodo);
        })

    })
    
})


app.put("/todos/:id" , (req ,res)=>{
    fs.readFile("todo.json" , "utf-8" , (err ,data)=>{
        if(err) throw err
        const todos = JSON.parse(data)
        const todoIndex = findIndex(todos , req.params.id)
        todos[todoIndex].title = req.body.title
        todos[todoIndex].description = req.body.description
        fs.writeFile("todo.json" , JSON.stringify(todos) , (err)=>{
            if(err) throw err
            res.status(201).json("Done!")
        })
        
    })

})

app.delete("/todos/:id" , (req,res)=>{
    fs.readFile("todo.json" , "utf-8" , (err ,data)=>{
        if(err) throw err
        let todos = JSON.parse(data) 
        const todoIndex = findIndex(todos , parseInt(req.params.id))
        if(todoIndex==-1){
            res.status(401).send();
        }
        else{
            todos = removeIndex(todos , todoIndex);
            res.status(200).json("Done!")
        }
    })
    
})

app.listen(5000);