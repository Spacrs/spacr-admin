function loadVerificationHolder(type) {
  $("#verificationHolder").html(`
    <center><img style="margin-top:100px;" src="assets/loader.gif" /></center>
    `);
  axios
    .post("https://www.spacr.ml/user/getAllByVerificationStatus", {
      secret: LOGIN_SECRET,
      verified: type,
    })
    .then(function (response) {
      let html = getVerificationCards(response.data);
      $("#verificationHolder").html(html);
    })
    .catch(function (error) {
      $("#verificationHolder").html(`
        <div class="alert alert-dismissible alert-danger">Unauthorized. Put the correct key in.</div>
        `);
    });
}

function getVerificationCards(data) {
  if (data.length === 0) {
    return `<div class="alert alert-warning">Empty response</div>`;
  }
  let html = "<div class='container'><div class='row'>";
  data.forEach((user) => {
    html += `
    <div class='col-sm-4' id="card-${user.UserID}"> 
        <div class="card" style="padding: 7px; margin: 10px; border-radius: 10px;">
        <center><span class="badge badge-pill badge-primary">${
          user.UserID
        }</span></center>
        ${imageRender(user.ProfilePictureURL, true, user.UserID)}
          <div class="card-block" style="padding: 3px;">
            <h4 class="card-title">${paramR(user.FullName)}</h4>
            
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Login type:</b> ${user.Type}</li>
          <li class="list-group-item"><b>Email:</b> ${user.Email}</li>
            <li class="list-group-item"><b>Phone number:</b> ${paramR(
              user.Phone
            )}</li>
            <li class="list-group-item"><b>Birthday</b> ${paramR(
              user.Birthday
            )}</li>
            <li class="list-group-item"><b>EmiratesID</b> ${paramR(
              user.EmiratesID
            )}</li>
            <li class="list-group-item"><b>EmiratesID Front Image</b> ${imageRender(
              user.EmiratesIDFrontImageURL,
              true,
              user.UserID
            )} </li>
            <li class="list-group-item"><b>EmiratesID Back Image</b> ${imageRender(
              user.EmiratesIDBackImageURL,
              true,
              user.UserID
            )}</li>
          </ul>
          <div class="card-block text-center" >
          <img id="loader-${
            user.UserID
          }" src="assets/loader.gif" style="width:50px;display:none;" />
          <div style="padding:10px;" id="action-button-${
            user.UserID
          }" class="btn-group" role="group" aria-label="Basic example">
          <button type="button" onclick="pend('${user.UserID}',${
      user.Verified == "pending" ? "true" : "false"
    })" class="btn btn-warning">Pending</button>
          <button type="button" onclick="reject('${user.UserID}',${
      user.Verified == "rejected" ? "true" : "false"
    })" class="btn btn-danger">Rejected</button>
          <button type="button" onclick="verify('${user.UserID}',${
      user.Verified == "verified" ? "true" : "false"
    })" class="btn btn-success">Verified</button>
        </div>
          </div>
        </div>
    </div>
`;
  });
  html += "</div></div>";
  return html;
}

function pend(userID, same) {
  $("#action-button-" + userID).hide();
  $("#loader-" + userID).show();
  updateVerificationStatus(userID, "pending", (response) => {
    if (!same) {
      removeCardWithUserID(userID);
    }

    $("#action-button-" + userID).show();
    $("#loader-" + userID).hide();
  });
}

function reject(userID, same) {
  $("#action-button-" + userID).hide();
  $("#loader-" + userID).show();
  updateVerificationStatus(userID, "rejected", (response) => {
    if (!same) {
      removeCardWithUserID(userID);
    }
    $("#action-button-" + userID).show();
    $("#loader-" + userID).hide();
  });
}

function verify(userID, same) {
  $("#action-button-" + userID).hide();
  $("#loader-" + userID).show();
  updateVerificationStatus(userID, "verified", (response) => {
    if (!same) {
      removeCardWithUserID(userID);
    }
    $("#action-button-" + userID).show();
    $("#loader-" + userID).hide();
  });
}

function removeCardWithUserID(id) {
  $("#card-" + id).remove();
}

function updateVerificationStatus(userID, type, cb) {
  axios
    .post("https://www.spacr.ml/admin/verify", {
      secret: LOGIN_SECRET,
      verify: type,
      userID: userID,
    })
    .then(function (response) {
      cb(response);
    })
    .catch(function (error) {
      $("#verificationHolder").html(error);
    });
}

function paramR(param) {
  if (param == null) {
    return `<b style="color:red;">EMPTY</b>`;
  } else {
    return param;
  }
}

function imageRender(url, isGallery, galName = "gallery") {
  let galAttribute = "data-fancybox='" + galName + "'";
  let gallery = isGallery ? galAttribute : "data-fancybox";
  return `<a ${gallery} href="${url}"><img style="padding: 3px;" class="card-img-top img-fluid" src="${url}" alt="Card image cap" onerror="replaceImage(this.parentNode)"></a>`;
}

function replaceImage(elem) {
  var b = document.createElement("b");
  b.innerHTML = "EMPTY";
  b.setAttribute("style", "color:red;");
  elem.replaceWith(b);
}
