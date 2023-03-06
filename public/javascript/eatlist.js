console.log("Eatlist Page Connection Successful");

// function for handling login_logout part/,
//  Async function for api post fetch methos
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

    let element = document.getElementById("nav_id");
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
    logout.addEventListener("click", async () => {
        let x = await postData("/deletecart", { user_email });
        console.log(x);
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_name");
        location.href = '/';
    })
    let payment = document.getElementById("pay");
    payment.addEventListener("click", async () => {
      console.log(user_email);
      let result = await postData("/payment",{user_email});
      alert("Order Placed Succefully");
      location.href='/previous';
    })

    async function cart_data(user_email) {
        let data = await postData('/cartdata', { user_email });
        console.log(data);
        let obj1={};
        let obj2={};
        let total=0;
        let element = "";
        let i=0;
        for (const key in data.cart) {
            console.log(key);
            if(key=="name" || data.cart[key]==0)
            continue;
            i+=1;
            obj1[i]=key;
            obj2[i]=data.cart[key];
            total += 50*data.cart[key];
            element += `
        <tr>
        <td>
            <div class="cart-info" id="item${i}">
                <div>
                    <p>${key}</p>
                    <small>Price: 50</small>
                </div>
            </div>
        </td>
        <td><input type="number" value="${data.cart[key]}" id="value${i}" min="0"></td>
        <td>${50*data.cart[key]}Rs</td>
    </tr>
        `
        }
        if(element==""){
        document.getElementById("details").innerHTML += `<p style="padding-top:10px ; padding-left:200px">Add Something to cart to place your order</p>`;
        document.getElementById("price").innerHTML ="";
        document.getElementById("pay").innerHTML ="";
    }
        else{
        document.getElementById("details").innerHTML += element; 
        document.getElementById("price").innerHTML =`
        <table>
        <tr>
            <td>Total</td>
            <td>${total}Rs</td>
        </tr></table>
        `;    
    }
    let a=Object.keys(data.cart).length -1;
    for(let i=1;i<a;i++){
    document.getElementById(`value${i}`).addEventListener("click",async()=>{
        console.log(document.getElementById(`value${i}`).value);
        let item= obj1[i];
        let quant = parseInt(document.getElementById(`value${i}`).value);
        let res= await postData('/changecart',{user_email,item,quant});
        location.href="/eatlist";
    })
    }
    }
    cart_data(user_email);
}

