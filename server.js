const { response } = require("express");
const express = require("express") //import express and and store express in a variable
const app = express();// initialize the express application and store it in a variable call app
const port = 8000 //dont use 3000
const {faker} = require("@faker-js/faker");//importing faker  //? to install faker: npm install --save-dev @faker-js/faker

// make sure that this lines are above any app.get or app.post code blocks
app.use(express.json());//this allow the application to parse json data (form info)
app.use(express.urlencoded({extended: true}));//this allows the application to accept form info

// user class
class User{
    constructor(){
        this.id = faker.database.mongodbObjectId();
        this.f_name =  faker.name.firstName();
        this.l_name= faker.name.lastName();
        this.phone_number = faker.phone.number();
        this.email = faker.internet.email();
        this.password = faker.internet.password(8,false, /[a-z+A-Z+1-9]/);
    }
}

// company class
class Company{
    constructor(){
        this.id =  faker.database.mongodbObjectId();
        this.name =  faker.company.name();
        this.address = `${faker.address.street()} ${faker.address.city()} ${faker.address.state()} ${faker.address.zipCode()} ${faker.address.country()}`;
    }
}

// instances of user and company classes
const user = new User();
const companies = new Company();

//todo http verbs
//todo|| get = retrieve see all data or one 
//todo|| post = create something new
//todo|| put = update something 
//todo|| delete = delete something 

/*  @app.route("/api")
def say_hello():
    return "hello word"*/
    // http://localhost:8000/api
//? req == request   ,  res ==respondes
// user route 
app.get("/api/user",(req,res)=>{ //! this is the same as in python just  in a javascript format
    // respond with json the user info 
    res.json({
        results: user
    })
})

// companies route
app.get("/api/companies", (req,res) => {
    res.json({
        results: companies
    })
})

// user and companies route
app.get("/api/company",(req,res) =>{
    res.json({
        results:[{user},
            {companies}
    ]})
})

//?this needs to be below the other code blocks make this the las line 
app.listen(port,( )=> console.log(`listening on port: ${port}`));