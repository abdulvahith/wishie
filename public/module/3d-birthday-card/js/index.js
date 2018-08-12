$(document).ready(function () {
  var timer = null;
  var loadJson = {
    head:"happy birthday dear friend",
    sign:"abdul_vahi",
    intro_1:"hey dear macha",
    intro_2: "I lost the message inside the card 2 times.. and i realsied i am slow at this :'(",
    intro_3: "Listen kid, I want you to be the happiest today.. and i suck at making people happy..This is probably the only gift i can give you, my word.. I will be there with you in your heart and soul whenever you seek me. I love you.I lost the message inside the card 2 times.. and i realsied i am slow at this :'( I lost the message inside the card 2 times.. and i realsied i am slow at this :"
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
})
