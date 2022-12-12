

const express = require("express")

const { TodoModel } = require("../models/Todo.model")

const notesRouter = express.Router();


notesRouter.get("/", async (req, res) => {
    const status = req.query.status;
    if (status) {
        const data = await TodoModel.find({ status: `${status}` });
        res.status(200).json(data)
    }
    else {
        const notes = await TodoModel.find()
        res.send(notes)
    }

})

notesRouter.post("/create", async (req, res) => {
    const payload = req.body
    //get token from header
    //verify token using jwt
    try {
        const new_note = new TodoModel(payload)
        await new_note.save()
        res.send({ "msg": "Todo created successfully" })
    }
    catch (err) {
        console.log(err)
        res.send({ "err": "Something went wrong" })
    }
})

notesRouter.patch("/update/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await TodoModel.findOne({ _id: noteID })
    if (userID !== note.userID) {
        res.send("Not authorised")
    }
    else {
        await TodoModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.send({ "msg": "Todo updated successfully" })
    }
})

notesRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    const userID = req.body.userID
    const note = await TodoModel.findOne({ _id: noteID })
    if (userID !== note.userID) {
        res.send("Not authorised")
    }
    else {
        await TodoModel.findByIdAndDelete({ _id: noteID })
        res.send({ "msg": "Todo deleted successfully" })
    }
})


module.exports = { notesRouter }


