$(document).ready(function(){
  $("#submit_form").click(function() {
    var isValid = true;
    $('#bday_form input').each(function() {
      if ( $(this).val() == '' ){
        isValid = false;
        $(this).focus();
      }
    });
    if ($("#message").val() == "") {
      $("#message").focus();
      isValid = false;
    }

    if (isValid){
      console.log("inside");
      $("#firstName, #head, #intro, #summary, #message").val("");
      window.location.href = '/greetingcard';
    }
    else {
      toastr.error("Please fill all the details");
    }
  })
});

// heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v83 -a my-app
