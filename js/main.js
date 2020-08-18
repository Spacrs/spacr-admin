var LOGIN_SECRET = localStorage.getItem("key");
if (LOGIN_SECRET !== null) {
  $("#secretInput").hide();
  $("#loginButton").hide();
  $("#logoutButton").show();
}

function login() {
  LOGIN_SECRET = $("#secretInput").val();
  $("#secretInput").val("");
  localStorage.setItem("key", LOGIN_SECRET);
  $("#secretInput").hide();
  $("#loginButton").hide();
  $("#logoutButton").show();
  // alert(LOGIN_SECRET);
}

function logout() {
  localStorage.clear();
  $("#secretInput").val("");
  $("#secretInput").show();
  $("#loginButton").show();
  $("#logoutButton").hide();
}

$(document).ready(function () {
  $("img").on("error", function () {
    alert("err");
    $(this).replaceWith(`<b style="color:red;">EMPTY</b>`);
  });
});
