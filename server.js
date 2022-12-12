const express = require("express");
require("dotenv").config();

const {con} = require('./db');
const routes = require("./routes");
const port = process.env.PORT || 5000;

const app = express()
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get("/",function(request,response){
response.send("welcome")
})


app.use("/api/v1", routes);

app.listen(port, function () {
console.log("Started application on port %d", port)
});