console.log("Previous order page succesfull");
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
  location.href = "/login";
}

let element = document.getElementById("nav_id");
//  console.log(element);
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


async function func_data(user_email) {
  let data = await postData("/prevdata", { user_email });
  let v="";
  for (let i = 0; i < data.prev_orders.length; i++) {
    v += `
    <div class="card">         
    <table style="width:80%">
        <h1>Order ${i+1}</h1>
  `;
    // console.log(data.prev_orders[i]);
    for (const key in data.prev_orders[i]) {
      if(data.prev_orders[key]==0)
      continue;
      if(key=="name")
      continue;
      v += `<tr>
      <th>${key}</th>
      <th>x${data.prev_orders[i][key]}</th>
    </tr>`;
    }
    v += `</table>

    <h5>Cart Value &nbsp;  500</h5>
    </div>`
  }
  console.log(v);
  document.getElementById("userdata").innerHTML=v;
}
func_data(user_email);
//  console.log(prev_order_data);

