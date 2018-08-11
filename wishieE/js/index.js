console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

$("#signUp").click(function() {
	var uName = $("#s-name").val();
	var uMail = $("#s-mail").val();
	var uPasswd = $("#s-passwd").val();
	var uGender = $("#s-gender").val();
	var signUpDtl = {
		signUp_name : uName,
		signUp_mail : uMail,
		signUp_passwd : uPasswd,
		signUp_gender : uGender
	};
	console.log(signUpDtl);
	$("#s-name,#s-mail,#s-passwd").val("");
	$("#s-gender").val("select");
	alert("clickd")
})

$("#logIn").click(function() {
	var lMail = $("#l-mail").val();
	var lPasswd = $("#l-passwd").val();
	var logDtl = {
		log_mail : lMail,
		log_passwd : lPasswd
	}
	console.log(logDtl);
	$("#l-mail,#l-passwd").val("");
	alert("clickd")
})
