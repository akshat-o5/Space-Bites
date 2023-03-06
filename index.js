const express = require('express');
const app =express();
const path = require("path");
const hbs = require("hbs");
const templatepath =path.join(__dirname,'./public/views')
const collection = require('./user_login');
const user = require('./user_data');
const { groupCollapsed } = require('console');

app.set("view engine","hbs");
app.set("views",templatepath);
app.use(express.static(path.join(__dirname, '/public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Endpints to serve out html pages

//First Login Page
app.get("/",(req,res)=>{
   res.render("home")
});
//For Signup page
app.get("/signup",(req,res)=>{
   res.render("signup")
});
// For login Page
app.get("/login",(req,res)=>{
   res.render("login")
});
app.get("/previous",(req,res)=>{
   res.render("previous")
})
app.get("/cusine",(req,res)=>{
   // localStorage.removeItem("user_email");
   // localStorage.removeItem("user_name");
   res.render("cusine");
})
app.get("/eatlist",(req,res)=>{
   res.render("eatlist");
})

//Endpoint to serve apis

// to get data
app.post('/prevdata',async(req,res)=>{
 const data=req.body;
//  console.log(data.user_email);
 try{
 let f1 = await user.findOne({email : data.user_email});
 if(f1==null)
 {
   res.status(201).json({success:1});
 }
 else {
   res.status(201).json({success:0,prev_orders:f1.previous_orders});
 }
 }
 catch(e){
   res.status(201).json({success:2});
 }
})
// To add data in database
app.post('/addtocart',async(req,res)=>{
   const data=req.body;
   console.log(data);
   const checking = await user.findOne({ email: data.user_email });
   let car=checking.cart;
   let a=1;
   for(const key in car)
   {
      // console.log(car[i],data)
     if(key==data.item)
     {
      a=0;
      break;
     }
   }
   console.log(a);
   if(a===1)
   {
      // console.log()
      car[data.item]=1;
      console.log(car);
      const resp= await user.updateOne({email:data.user_email},{$set : {cart:car}});
      res.status(201).status({success:true});
   }

   

})
// Redirect a user from signup page
app.post('/signup', async (req, res) => {
      // Fetching user data from his responses
      const data = req.body;
      
    // Creating general user data to push in database
     const user_data ={
        name : req.body.name,
        email : req.body.email,
        previous_orders : [],
        cart :{"name":1}
     }
     console.log(user_data);
     try{
      const checking = await collection.findOne({ email: data.email })
      if(checking==null)
      {
        await collection.create(data);
      //   console.log(user_data);
        await user.create(user_data);
        res.status(201).json({success:0, email : data.email,name:data.name});
      }
      else if (checking.email === req.body.email) {
         res.status(201).json({success:1})
      }
     }
     catch(e){
      console.log(e);
      res.status(201).json({success:2})
     }
})
//Returning from  login page
app.post('/login', async (req, res) => {
   const data = req.body;
   let user = await collection.findOne(data);
   if(!user)
   {
      res.json({success : 1});
   }
   else{
      
      res.json({success : 0,email :data.email,name:data.email});
   }
})

app.post("/cartdata",async(req,res)=>{
   let data=req.body;
   console.log(data);
   const checking = await user.findOne({ email: data.user_email });
   res.status(201).json({success:1,cart:checking.cart});
})

app.post("/deletecart",async(req,res)=>{
   const data=req.body;
   // console.log(data);
   const resp= await user.updateOne({email:data.user_email},{$set : {cart:{"name":1}}});
   res.status(201).json({success:1});
})
app.post("/payment",async(req,res)=>{
   let data=req.body;
   console.log(data);
   const checking = await user.findOne({ email: data.user_email });
   console.log(checking);
   let a=checking.previous_orders;
   let b=checking.cart;
   a.push(b);
   b={"name":1};
   const resp= await user.updateOne({email:data.user_email},{$set : {cart:b,previous_orders:a}});
   res.status(201).json({success:1});
})
app.post("/changecart",async(req,res)=>{
   const data=req.body;
   console.log(data);
   const cart1 = await user.findOne({ email: data.user_email });
   console.log(cart1.cart);
   cart1.cart[data.item]=data.quant;
   const resp= await user.updateOne({email:data.user_email},{$set : {cart:cart1.cart}});
   // console.log(checking.cart);
   res.status(201).json({success:1});
})
//Listening at local port 3000

app.listen(3300,()=>{
   console.log("Port Connected");
})