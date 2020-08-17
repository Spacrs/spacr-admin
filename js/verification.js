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
    <div class='col-sm-4'> 
        <div class="card" style="padding: 3px; margin: 10px;">
        ${imageRender(user.ProfilePictureURL, true, user.UserID)}
          <div class="card-block" style="padding: 3px;">
            <h4 class="card-title">${user.FullName}</h4>
            <p class="card-text">Login type: ${user.Type}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Phone number: ${user.Phone}</li>
            <li class="list-group-item">EmiratesID: ${user.EmiratesID}</li>
            <li class="list-group-item">EmiratesID Front Image: ${imageRender(
              user.EmiratesIDFrontImageURL,
              true,
              user.UserID
            )} </li>
            <li class="list-group-item">EmiratesID Back Image: ${imageRender(
              user.EmiratesIDBackImageURL,
              true,
              user.UserID
            )}</li>
          </ul>
          <div class="card-block">
            <a href="#" class="card-link">Card link</a>
          </div>
        </div>
    </div>
`;
  });
  html += "</div></div>";
  return html;
}

function imageRender(url, isGallery, galName = "gallery") {
  let galAttribute = "data-fancybox='" + galName + "'";
  let gallery = isGallery ? galAttribute : "data-fancybox";
  return `<a ${gallery} href="${url}"><img style="padding: 3px;" class="card-img-top img-fluid" src="${url}" alt="Card image cap"></a>`;
}
