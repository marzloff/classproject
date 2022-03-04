function getEmployees()
{
  // 1. Create a new XMLHttpRequest object
  //alert('Script running')
  let xhr = new XMLHttpRequest();

  // 2. Configure it: GET-request for the URL /article/.../load
  xhr.open('GET', '/db');

  // 3. Send the request over the network
  xhr.send();

  // 4. This will be called after the response is received
  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      // xhr.responseText
      myFunction(xhr.responseText);
      //alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
    }
  };

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      //alert(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
      //alert(`Received ${event.loaded} bytes`); // no Content-Length
    }

  };

  xhr.onerror = function() {
    alert("Request failed");
  };
}

function myFunction(arr) {
  const employee = JSON.parse(arr);
  var out = "";
  var i;
  out = '<table border="1"><tr><th>First Name</th><th>Last Name</th></tr>';
  for(i = 0; i < employee.length; i++) {
      out += '<tr><td>' + employee[i].first_name + '</td><td>' + employee[i].last_name +'</td><td><input type="button" value="Delete" onclick="deleteEmployee(' + employee[i].employee_id + ')"</tr>';
  }
  out += '</table>'
  document.getElementById("employee_output").innerHTML = out;
}

function addEmployee()
{
  let xhr = new XMLHttpRequest();
  let fn = document.getElementById('first_name').value;
  let ln = document.getElementById('last_name').value;
  let jsObject = {
    first_name: fn,
    last_name:ln
  };

  document.getElementById('first_name').value = '';
  document.getElementById('last_name').value = '';

  // 2. Configure it: GET-request for the URL /article/.../load
  xhr.open('PUT', '/dbadd');

  xhr.setRequestHeader('Content-Type', 'application/json');

  // send rquest with JSON payload
  xhr.send(JSON.stringify(jsObject));

  // 4. This will be called after the response is received
  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      // xhr.responseText
      getEmployees();
      //alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
    }
  };

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      //alert(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
      //alert(`Received ${event.loaded} bytes`); // no Content-Length
    }

  };

  xhr.onerror = function() {
    alert("Request failed");
  };
}

function deleteEmployee(id)
{
  let xhr = new XMLHttpRequest();
  let jsObject = {
    employee_id: id
  };
  // 2. Configure it: GET-request for the URL /article/.../load
  xhr.open('PUT', '/dbdelete');

  xhr.setRequestHeader('Content-Type', 'application/json');

  // send rquest with JSON payload
  xhr.send(JSON.stringify(jsObject));

  // 4. This will be called after the response is received
  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
    } else { // show the result
      // xhr.responseText
      getEmployees();
      //alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
    }
  };

  xhr.onprogress = function(event) {
    if (event.lengthComputable) {
      //alert(`Received ${event.loaded} of ${event.total} bytes`);
    } else {
      //alert(`Received ${event.loaded} bytes`); // no Content-Length
    }

  };

  xhr.onerror = function() {
    alert("Request failed");
  };
}