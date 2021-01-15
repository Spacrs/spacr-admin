function loadLandingPageEntries() {
    $("#verificationHolder").html(`
    <center><img style="margin-top:100px;" src="assets/loader.gif" /></center>
    `);
    let url = `https://www.spacr.ml/landingEndpoint?secret=${LOGIN_SECRET}`
  axios
    .get(url)
    .then(function (response) {
      let html = `
      <h1 class="display-4 text-center" style="padding:10px;">${type.toUpperCase()} USERS (${
        response.data.length
      })</h1>`;
      html += JSON.stringify(response.data);
      $("#verificationHolder").html(html);
    })
    .catch(function (error) {
      $("#verificationHolder").html(`
        <div class="alert alert-dismissible alert-danger">Unauthorized. Put the correct key in.</div>
        `);
    });
}