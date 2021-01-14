//https://sweetalert2.github.io/#show-close-button
let optionsForRejection = [
  {
    label: "Face doesn't match",
    text: "Faces don't match between documents / images.",
  },
  {
    label: "Identification numbers are not visible.",
    text: "Identification numbers are not visible in document(s).",
  },
  {
    label: "Phone number not available.",
    text: "No valid phone number.",
  },
];

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
      let html = `
      <h1 class="display-4 text-center" style="padding:10px;">${type.toUpperCase()} USERS (${
        response.data.length
      })</h1>`;
      html += getVerificationCards(response.data);
      $("#verificationHolder").html(html);
    })
    .catch(function (error) {
      $("#verificationHolder").html(`
        <div class="alert alert-dismissible alert-danger">Unauthorized. Put the correct key in.</div>
        `);
    });
}

function getVerificationCards(data) {
  console.log(JSON.stringify(data));
  if (data.length === 0) {
    return `<div class="alert alert-warning">Empty response</div>`;
  }
  let modalHTML = "";
  let html =
    "<div class='container' style='background:#F0F8FF;'><div class='row'>";

  data.forEach((user) => {
    let verificationInfoCode = "";
    if (user.VerificationInfo != null && user.Verified != "verified") {
      verificationInfoCode = `<li class='list-group-item'><b>Verification info:</b> ${user.VerificationInfo}</li>`;
    }
    html += `
    <div class='col-sm-4' id="card-${user.UserID}"> 
        <div class="card" style="padding: 7px; margin: 10px; border-radius: 10px;">
        <center><span class="badge badge-pill badge-primary">${
          user.UserID
        }</span></center>
        ${imageRender(user.ProfilePictureURL, true, user.UserID)}
          <div class="card-block" style="padding: 3px;">
            <h4 class="card-title">${paramR(user.FullName)}</h4> 
            <button type="button" onclick="sendPingToUser('${user.UserID}','ping-button-${user.UserID}')" class="btn btn-primary btn-sm" id="ping-button-${user.UserID}">Ping</button>
          </div>
          <ul class="list-group list-group-flush">
          ${verificationInfoCode}
          <li class="list-group-item"><b>Login type:</b> ${user.Type}</li>
          <li class="list-group-item"><b>Email:</b> ${user.Email}</li>
            <li class="list-group-item"><b>Phone number:</b> ${paramR(
              user.Phone
            )}</li>
            <li class="list-group-item"><b>Location</b>
            <ul style="list-style: none;padding: 5px;"><li>Address: ${paramR(
              user.Address
            )} </li><li> Longitude: ${paramR(
      user.AddressLongitude
    )} </li><li>Latitude: ${paramR(user.AddressLatitude)}</li></ul></li>
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
            <li class="list-group-item"><b>Passport Number</b> ${paramR(
              user.PassportNumber
            )}</li>
            <li class="list-group-item"><b>Passport Image</b> ${imageRender(
              user.PassportImageURL,
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
    <a href="#modal-${
      user.UserID
    }" rel="modal:open"><button type="button" class="btn btn-danger">Rejected</button></a>
          <button type="button" onclick="verify('${user.UserID}',${
      user.Verified == "verified" ? "true" : "false"
    })" class="btn btn-success">Verified</button>
        </div>
          </div>
        </div>
    </div>
`;
    //reject('${user.UserID}',${user.Verified == "rejected" ? "true" : "false"})
    modalHTML += modalCode(user);
  });
  html += "</div></div>";
  html += modalHTML;

  return html;
}

function modalCode(user) {
  let userID = user.UserID;
  var date = new Date();
  var timestamp = date.getTime();
  let randomString = makeid(20) + "" + timestamp;
  let optionCode = "";
  let options = optionsForRejection;
  for (let optionIndex in options) {
    optionCode += `<div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" id="customCheck${optionIndex}${randomString}" onclick="checkBox${randomString}(${optionIndex})">
    <label class="custom-control-label" for="customCheck${optionIndex}${randomString}">${options[optionIndex].label}</label>
  </div>`;
  }

  return `
  <script>
  
let selectedVals${randomString} = []
function checkBox${randomString}(type) {
  
  if(!selectedVals${randomString}.includes(type)) {
    selectedVals${randomString}.push(type)
  } else {
    var index = selectedVals${randomString}.indexOf(type);
    selectedVals${randomString}.splice(index, 1);
  }

  let text = ""
  for(let x of selectedVals${randomString}) {
    text += optionsForRejection[x].text + " ";
  }
  $("#textArea${randomString}").val(text)
}

function rejectButtonClick${randomString}() {
  $("#loader-modal-${randomString}").show()
  reject('${user.UserID}',${
    user.Verified == "rejected" ? "true" : "false"
  }, $("#textArea${randomString}").val(), () => {
    $("#loader-modal-${randomString}").hide()
  });
}
</script>
  <div id="modal-${userID}" class="modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Rejection Info</h5><a href="#" rel="modal:close">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button></a>
      </div>
      <div class="modal-body">
        <p>Reasons:</p>
        <div class="form-group">${optionCode}</div>
  <div class="form-group">
      <label for="exampleTextarea">Rejection message user will see (editable):</label>
      <textarea class="form-control" id="textArea${randomString}" rows="3" style="margin-top: 0px; margin-bottom: 0px; height: 93px;"></textarea>
    </div>
      </div>
      <div class="modal-footer">
      <img id="loader-modal-${randomString}" src="assets/loader.gif" style="width:50px;display:none;" />
        <button type="button" onclick="rejectButtonClick${randomString}()" class="btn btn-danger">Reject user</button>
        <a href="#" rel="modal:close"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></a>
      </div>
    </div>
  </div>
</div>

`;

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

function pend(userID, same) {
  if (same) {
    return;
  }
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

function reject(userID, same, rejectionText, cb) {
  if (same) {
    return;
  }
  $("#action-button-" + userID).hide();
  $("#loader-" + userID).show();
  updateVerificationStatusWithRejectionText(
    userID,
    "rejected",
    rejectionText,
    (response) => {
      if (!same) {
        removeCardWithUserID(userID);
      }
      $("#action-button-" + userID).show();
      $("#loader-" + userID).hide();
      $.modal.close();
      cb();
    }
  );
}

function verify(userID, same) {
  if (same) {
    return;
  }
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

function sendPingToUser(userID, idVal) {
  axios
    .post("https://www.spacr.ml/admin/pingUser", {
      secret: LOGIN_SECRET,
      userID: userID,
    })
    .then(function (response) {
      buttonUnclickable(idVal)
    })
    .catch(function (error) {
      $("#verificationHolder").html(error);
    });
}

function updateVerificationStatusWithRejectionText(userID, type, text, cb) {
  axios
    .post("https://www.spacr.ml/admin/verify", {
      secret: LOGIN_SECRET,
      verify: type,
      userID: userID,
      verificationInfo: text,
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

function buttonUnclickable(id){
  $("#" + id).attr('disabled', true);
}
