console.log("Login Connection Succesfull");

async function postData(url = "", data = {}) {
     const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
   let rdata=await response.json(); // parses JSON response into native JavaScript objects
   return rdata;
  }

let submit_data=document.getElementById("submit")
submit_data.addEventListener("click",async ()=>{
    let email=document.getElementById("email_id").value;
    let password=document.getElementById("password").value;
    let resp=await postData('/login',{email,password});
    // console.log("hello");
    console.log(resp);
    if(resp.success===0){
      localStorage.setItem("user_email", JSON.stringify(resp.email));
      localStorage.setItem("user_name", JSON.stringify(resp.name));
     location.href ="/";
    }
    else{
     alert("Enter Valid email and password");
    }
})