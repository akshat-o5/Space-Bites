console.log("Signup Connection Succesfull");

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
let submit_data=document.getElementById("submit");
console.log(submit_data);
submit_data.addEventListener("click",async ()=>{
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    console.log(name,email,password);
    let resp=await postData('/signup',{name,email,password});
    console.log(resp);
    if(resp.success===0){
      localStorage.setItem("user_email", JSON.stringify(resp.email));
      localStorage.setItem("user_name", JSON.stringify(resp.name));
     location.href ="/";
    }
    else if(resp.success===1){
      alert("Email Already Exists");
    }
    else{
      alert("Enter Valid details");
    }
})