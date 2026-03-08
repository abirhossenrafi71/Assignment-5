document.getElementById("sign-btn").addEventListener('click', function(){
    const inputUsername = document.getElementById("input-username");
    const userName = inputUsername.value;

    const inputPassword = document.getElementById("input-password");
    const userPassword = inputPassword.value;

    if(userName == "admin" && userPassword == "admin123"){
        alert('✅ Sign in successful!!');
        window.location.assign("/issue.html");
    }
    else{
        alert("❌ Sign in failed. Invalid username or password.");
        return;
    }
}
);
