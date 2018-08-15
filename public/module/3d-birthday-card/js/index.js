$(document).ready(function () {
  var curUrl = window.location.pathname;
  var urlArr = curUrl.split("/");
  var hrokUrl = window.location.href.toString().split(".")[1];
  var clipUrl = (window.location.href.toString().split(".")[1] == "herokuapp")?"https://wishie.herokuapp.com/getgreeting/"+data.greetingId+"_"+index:"http://localhost:3000/getgreeting/"+data.greetingId+"_"+index;

  var curGreetId;
  if (urlArr[1] == "getgreeting")
    curGreetId = urlArr[2];
  else
    curGreetId = "newgreet";

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
    $.blockUI(blockUiCss);
  var timer = null;
  var getUrl = "/getgreetingdata/"+curGreetId;
  $.get( getUrl, function( resData ) {
    var data = JSON.parse(resData);
    $.unblockUI();
    if (data.hasOwnProperty("userform")) {
      var index = data.userform.length-1;
      $("#greetingUrl").val(clipUrl);
      $("#clipbrd_url").show();
      var loadJson = {
        head:data.userform[index].heading,//"happy birthday dear friend",
        sign:data.userform[index].fName,//"abdul_vahi",
        intro_1:data.userform[index].intro,//"hey dear macha",
        intro_2: data.userform[index].summary,//"I lost the message inside the card 2 times.. and i realsied i am slow at this :'(",
        intro_3: data.userform[index].message//"Listen kid, I want you to be the happiest today.. and i suck at making people happy..This is probably the only gift i can give you, my word.. I will be there with you in your heart and soul whenever you seek me. I love you.I lost the message inside the card 2 times.. and i realsied i am slow at this :'( I lost the message inside the card 2 times.. and i realsied i am slow at this :"
      }
    }
    else {
      $("#clipbrd_url").hide();
      var loadJson = {
        head:data.heading,//"happy birthday dear friend",
        sign:data.fName,//"abdul_vahi",
        intro_1:data.intro,//"hey dear macha",
        intro_2: data.summary,//"I lost the message inside the card 2 times.. and i realsied i am slow at this :'(",
        intro_3: data.message//"Listen kid, I want you to be the happiest today.. and i suck at making people happy..This is probably the only gift i can give you, my word.. I will be there with you in your heart and soul whenever you seek me. I love you.I lost the message inside the card 2 times.. and i realsied i am slow at this :'( I lost the message inside the card 2 times.. and i realsied i am slow at this :"
      }
    }
    $("#heading").text(loadJson.head+"!");

    $("#open").click(function () {
      $("#intro_1").text(loadJson.intro_1+",");
      $("#intro_2").text(loadJson.intro_2);
      $("#intro_3").text(loadJson.intro_3);
      $("#sign").text(loadJson.sign);
      $("#card").attr('class', 'open-half');
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        $("#card").attr('class', 'open-fully');
        timer = null;
      }, 1000);
    });

      $("#close").click(function () {
        $("#card").attr('class', 'close-half');
      if (timer) clearTimerout(timer);
      timer = setTimeout(function () {
        $("#card").attr('class', '');
        timer = null;
      }, 1000);
    });
  });

})
let button = document.getElementById('copyLink');

button.addEventListener('click', function(e) {
  e.preventDefault();
  document.execCommand('copy', false, document.getElementById('greetingUrl').select());
});
