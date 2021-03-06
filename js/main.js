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
  loadVerificationHolder("pending");
  // alert(LOGIN_SECRET);
}

function logout() {
  localStorage.clear();
  $("#secretInput").val("");
  $("#secretInput").show();
  $("#loginButton").show();
  $("#logoutButton").hide();
  loadVerificationHolder("pending");
}

$(document).ready(function () {
  loadVerificationHolder("pending");
});
