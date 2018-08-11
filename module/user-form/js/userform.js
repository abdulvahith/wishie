$(document).ready(function(){
  $("#submit_form").click(function() {
    alert("done");
    window.location.href = '../3d-birthday-card';
  })
});

heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v83 -a my-app
