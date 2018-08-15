$(document).ready(function(){
  var blockUiCss = {
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
        } };
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
      var formDtl = {
        fName : $("#firstName").val(),
        heading :$("#head").val(),
        intro : $("#intro").val(),
        summary : $("#summary").val(),
        message : $("#message").val(),
      }
      $("#firstName, #head, #intro, #summary, #message").val("");
      $.blockUI(blockUiCss);
      // $.post("/userformdata", formDtl , function( data ) {
      //   $.unblockUI();
      //   console.log(data);
      //     window.location.href = '/greetingcard';
      // });
      $.ajax({
          url: '/userformdata',
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json; charset=utf-8',
          success: function (data) {
            $.unblockUI();
              window.location.href = '/greetingcard';
            console.log(data);
          },
          data: JSON.stringify(formDtl)
      });
    }
    else {
      toastr.error("Please fill all the details");
    }
  })
});

// heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v83 -a my-app
