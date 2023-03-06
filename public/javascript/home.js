console.log("Home Page Connection Successful");

// function for handling login_logout part/,
//  Async function for api post fetch methos
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify(data),
    });
    return response.json(); 
}

const user_email = JSON.parse(localStorage.getItem("user_email"));
const user_name = JSON.parse(localStorage.getItem("user_name"));
 if(user_email==null)
 {
    let element = document.getElementById("nav_id");
    element .innerHTML = `
    <li><a href="/cusine">Cusine</a></li>
    <li><a href="/eatlist">Eatlist</a></li>
       <li class="dropdown">
     <a href="#">Profile</a>
     <ul class="dropdown-menu">
       <li><a href="/login">Login</a></li>
       <li><a href="/signup">Signup</a></li>
    `
 }
 else{
    let element = document.getElementById("nav_id");
    element .innerHTML = `
    <li><a href="/cusine">Cusine</a></li>
    <li><a href="/eatlist">Eatlist</a></li>
   <li class="dropdown">
     <a href="#"> Hi, ${user_name} <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="20"></a>
     <ul class="dropdown-menu">
       <li><a href="/previous" class="b"><button >Your Orders</button></a></li>
       <li><a href="#" class="b"><button id="logout">Logout</button></a></li>
    `
 }
 let logout = document.getElementById("logout");
 console.log(logout);
 logout.addEventListener("click",async()=>{
    let x=await postData("/deletecart",{user_email});
    console.log(x);
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    location.reload();
 })
