console.log("Cusine order page succesfull");
// import AOS from 'aos';
// import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
// AOS.init();
async function postData(url = "", data = {}) {
   const response = await fetch(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
   });
   let rdata = await response.json(); // parses JSON response into native JavaScript objects
   return rdata;
}
const user_email = JSON.parse(localStorage.getItem("user_email"));
const user_name = JSON.parse(localStorage.getItem("user_name"));
if (user_email == null) {
   alert("Please login to view your orders")
   location.href = "/";
}
else {
   // console.log(user_email);
   async function func_data(user_email) {
      let prev_data = await postData("/prevdata", { user_email });
      console.log(prev_data);
   }
   func_data(user_email);
}
let element = document.getElementById("nav_id");
console.log(element);
element.innerHTML = `
    <li><a href="/cusine">Cusine</a></li>
    <li><a href="/eatlist">Eatlist</a></li>
   <li class="dropdown">
     <a href="#"> Hi, ${user_name} <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="20"></a>
     <ul class="dropdown-menu">
       <li><a href="/previous" class="b"><button >Your Orders</button></a></li>
       <li><a href="#" class="b"><button id="logout">Logout</button></a></li>
    `;
    let logout = document.getElementById("logout");
    console.log(logout);
    logout.addEventListener("click",async()=>{
       let x=await postData("/deletecart",{user_email});
       console.log(x);
       localStorage.removeItem("user_email");
       localStorage.removeItem("user_name");
       location.href='/';
    })

let add_to_cart1 = document.getElementById("add1");
// console.log(add_to_cart);
add_to_cart1.addEventListener("click", async () => {
  const item="Pizza";
add_to_cart1.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart2 = document.getElementById("add2");
// console.log(add_to_cart);
add_to_cart2.addEventListener("click", async () => {
  const item="Sandwich";
  add_to_cart2.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart3 = document.getElementById("add3");
// console.log(add_to_cart);
add_to_cart3.addEventListener("click", async () => {
  const item="Samosa";
  add_to_cart3.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart4 = document.getElementById("add4");
// console.log(add_to_cart);
add_to_cart4.addEventListener("click", async () => {
  const item="Capecino";
  add_to_cart4.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart5 = document.getElementById("add5");
// console.log(add_to_cart);
add_to_cart5.addEventListener("click", async () => {
  const item="Nachos";
  add_to_cart5.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart6 = document.getElementById("add6");
// console.log(add_to_cart);
add_to_cart6.addEventListener("click", async () => {
  const item="French fries";
  add_to_cart6.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart7 = document.getElementById("add7");
// console.log(add_to_cart);
add_to_cart7.addEventListener("click", async () => {
  const item="Honey";
  add_to_cart7.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart8 = document.getElementById("add8");
// console.log(add_to_cart);
add_to_cart8.addEventListener("click", async () => {
  const item="Burger";
  add_to_cart8.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart9 = document.getElementById("add9");
// console.log(add_to_cart);
add_to_cart9.addEventListener("click", async () => {
  const item="Patties";
  add_to_cart9.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart10 = document.getElementById("add10");
// console.log(add_to_cart);
add_to_cart10.addEventListener("click", async () => {
  const item="Cofee";
  add_to_cart10.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart11 = document.getElementById("add11");
// console.log(add_to_cart);
add_to_cart11.addEventListener("click", async () => {
  const item="Noodles";
  add_to_cart11.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart12 = document.getElementById("add12");
// console.log(add_to_cart);\
add_to_cart12.addEventListener("click", async () => {
   add_to_cart12.innerText="Added";
  const item="Chole";

  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart13 = document.getElementById("add13");
// console.log(add_to_cart);
add_to_cart1.innerText="Added";
add_to_cart13.addEventListener("click", async () => {
  const item="Bread";
  add_to_cart13.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart14 = document.getElementById("add14");
// console.log(add_to_cart);
add_to_cart14.addEventListener("click", async () => {
  const item="Cold Drink";
  add_to_cart14.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});
let add_to_cart15 = document.getElementById("add15");
// console.log(add_to_cart);
add_to_cart15.addEventListener("click", async () => {
  const item="Pasta";
  add_to_cart15.innerText="Added";
  let resp = await postData("/addtocart",{user_email,item});
});