function loadLandingPageEntries() {
    $("#verificationHolder").html(`
    <center><img style="margin-top:100px;" src="assets/loader.gif" /></center>
    `);
    let url = `https://www.spacr.ml/landingEndpoint/getAll`
  axios
    .post(url, {
      secret: LOGIN_SECRET
    })
    .then(function (response) {
      let html = `
      <h1 class="display-4 text-center" style="padding:10px;">${
        response.data.length
      } landing page entries</h1>`;
      html += createTableHTML(response.data);
      $("#verificationHolder").html(html);
    })
    .catch(function (error) {
        alert(error)
      $("#verificationHolder").html(`
        <div class="alert alert-dismissible alert-danger">Unauthorized. Put the correct key in.</div>
        `);
    });
}

function createTableHTML(data) {
    let html = `
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Name</th>
      <th scope="col">Destination</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>

   `;
   data.forEach((e) => {
    let date = new Date(e.TimeRecorded * 1000);
    let dateText = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var timeText = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var dateTimeText = `${date.toDateString()} ${date.toTimeString()}`
html+= `
<tr>
<th scope="row">${e.id}</th>
<td>${dateTimeText}</td>
<td>${e.Name}</td>
<td>${e.Destination}</td>
<td>${e.Email}</td>
</tr>
`
   })
html +=`
  </tbody>
</table>`

return html
}