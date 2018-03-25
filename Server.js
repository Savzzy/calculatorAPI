var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongo_url = "mongodb://localhost:27017/CalculatorDB";

mongoose.connect(mongo_url);
//server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.listen(3000, () => {
    console.log("server started and is listening on port 3000");
});

mongoose.connection.on("connected", () => {
    console.log("dB Connection successful to " + mongo_url);
});
mongoose.connection.on("disconnected", (err) => {
    console.log(err);
});


var dbSchema = new mongoose.Schema({ "operation": mongoose.Schema.Types.String, "firstNumber": mongoose.Schema.Types.Number, "secondNumber": mongoose.Schema.Types.Number, "result": mongoose.Schema.Types.Number }, { "collection": "Calculator" });
var calculator = mongoose.model("calculator", dbSchema);


server.get("/", (request, response) => {
    response.status(200).send("Server is Ready For calculations");
});
server.post("/add", (request, response) => {
    var firstNumber = request.body.a;
    var secondNumber = request.body.b;
    var result = firstNumber + secondNumber;
    var calculator1 = new calculator({ "operation": "add", "firstNumber": firstNumber, "secondNumber": secondNumber, "result": result });

    if (firstNumber != null || secondNumber != null) {

        calculator1.save((error) => {

            //console.log("Data has been saved");
            if (error) {
                console.error(error);
            }
            else {
                response.status(200).send(result.toString());
            }
        });

    }
    else {
        response.status(404).send("Please Check the Input");
    }

})





