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
	// $("#signUp").prop('disabled', true);
	var uName = $("#s-name").val();
	var uMail = isEmail($("#s-mail").val())?$("#s-mail").val():"";
	var uPasswd = $("#s-passwd").val();
	var uGender = $("#s-gender").val();
	if(uName.length == 0){
		toastr.error("Please Enter Username");

		$("#s-name").focus();
		return ;
	}
	else if(uMail.length == 0){
		toastr.error("Please Enter Valid Mail Id");
		$("#s-mail").focus();
		return ;
	}
	else if(uGender == "select"){
		toastr.error("Please select your gender");
		$("#s-gender").focus();
		return ;
	}
	else if(uPasswd.length == 0){
		toastr.error("Please Enter Password");
		$("#s-passwd").focus();
		return ;
	}
	var signUpDtl = {
		signUp_name : uName,
		signUp_mail : uMail,
		signUp_passwd : uPasswd,
		signUp_gender : uGender,
		greetingId:""
	};

	// console.log(signUpDtl);
	$.blockUI({
          message: 'Please Wait.....',
          css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: '.5',
            color: '#fff',
          	fontSize: '18px',
            fontFamily: 'Verdana,Arial',
          	fontWeight: 200,
        } });
	$.post( "/signupDetail", signUpDtl , function( data ) {
		if (data == "fail")
			toastr.error("Mail Id Aldready Registered Please Login");
		else
			toastr.success("Signup Successfully Please Login");

		$("#login").trigger("click");
			$.unblockUI();
	});
	$("#s-name,#s-mail,#s-passwd").val("");
	$("#s-gender").val("select");
	// $("#signUp").prop('disabled', false);
})

$("#logIn").click(function() {
	// $("#logIn").prop('disabled', true);
	var lMail = isEmail($("#l-mail").val())?$("#l-mail").val():"";
	var lPasswd = $("#l-passwd").val();
	if(lMail.length == 0){
		toastr.error("Please Enter Valid Mail ID");
		$("#l-mail").focus();
		return ;
	}
	else if(lPasswd.length == 0){
		toastr.error("Please Enter Password");
		$("#l-passwd").focus();
		return ;
	}
	var logDtl = {
		log_mail : lMail,
		log_passwd : lPasswd
	}
	$.blockUI({
          message: 'Loading.......',
          css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: '.5',
            color: '#fff',
          	fontSize: '18px',
            fontFamily: 'Verdana,Arial',
          	fontWeight: 200,
        } });
	$.post("/userLogin", logDtl , function( data ) {
		console.log(data);
		$.unblockUI();
		if (data == "mail not found")
			toastr.error("Your Mail Id Not Registered");
		else if(data == "pass failed")
			toastr.error("Incorrect Password");
		else{
			$("#l-mail,#l-passwd").val("");
			 // window.location.href = '../module/user-form';
			  window.location.href = '/userform';
		}
	});
	console.log(logDtl);
	// $("#logIn").prop('disabled', false);
	// toastr.success("Login Successfully");
	// window.location.replace("");
})

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var result = regex.test(email);
	return result;
}
