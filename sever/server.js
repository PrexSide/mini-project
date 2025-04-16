const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require ('path')
const connectDb = require("./config/connectDb");


// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",  // Allow requests from your frontend's port
}));


//routes
app.use("/api/v5/users", require("../sever/routes/userRoute"));

//transaction routes 
app.use("/api/v5/transaction",require("../sever/routes/transactionRoutes"));
 

//static files 
app.use(express.static(path.join(__dirname, './client/build')))

app.get ('*', function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
