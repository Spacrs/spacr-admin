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
        <div class="alert alert-dismissible alert-danger">Error.</div>
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
        <div class="card">
          <img class="card-img-top img-fluid" src="${user.ProfilePictureURL}" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">${user.FullName}</h4>
            <p class="card-text">${user.Type}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
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
