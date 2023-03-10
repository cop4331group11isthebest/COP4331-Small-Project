const urlBase = 'http://www.4331-spring23-group11.xyz/LAMPAPI';
const extension = 'php';

var userId = 0;
var id = 0;
var firstName = "";
var lastName = "";

var editId = 0;
var editFirstName = "";
var editLastName = "";
var editEmail = "";
var editPhoneNumber = "";
var editAddress = "";
var editCity = "";
var editState = "";

function doRegister()
{
  console.log("doRegister()");
  firstName = document.getElementById("registerFirstName").value;
  lastName = document.getElementById("registerLastName").value;

  let username = document.getElementById("registerUsername").value;
  let password = document.getElementById("registerPassword").value;

  // var hash = md5(password);

  document.getElementById("registerResult").innerHTML = "";

  let tmp = {
      registerFirstName: firstName,
      registerLastName: lastName,
      registerUsername: username,
      registerPassword: password
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + '/Register.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
      xhr.onreadystatechange = function () {

          if (this.readyState != 4) {
              return;
          }

          if (this.status == 500) {
              document.getElementById("registerResult").innerHTML = "User Already Exists. Please Change User Info";
              return;
          }

          if (this.status == 200) {

              let jsonObject = JSON.parse(xhr.responseText);
              userId = jsonObject.id;
              console.log("User Successfully Added");

              firstName = jsonObject.firstName;
              lastName = jsonObject.lastName;

              saveCookie();

              window.location.href = "index.html";
          }
      };

      xhr.send(jsonPayload);
  } catch (err) {
      document.getElementById("registerResult").innerHTML = err.message;
  }
  return;
}

function doLogin()
{
  console.log("doLogin()");
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;
//      var hash = md5( password );

  document.getElementById("loginResult").innerHTML = "";

  let tmp = {
    login:login,
    password:password
  };
//      var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify( tmp );

  let url = urlBase + '/Login.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        let jsonObject = JSON.parse( xhr.responseText );
        userId = jsonObject.id;
        console.log("userId: " + userId);

        if( userId < 1 )
        {
          document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        window.location.href = "ContactsPage.html";
      }
    };
    xhr.send(jsonPayload);
  }
  catch(err)
  {
    document.getElementById("loginResult").innerHTML = err.message;
  }

}

function doLogout()
{
  console.log("doLogout()");
  userId = 0;
  firstName = "";
  lastName = "";

  console.log("DL     firstName=" + firstName);
  console.log("DL     lastName=" + lastName);
  console.log("DL     userId=" + userId);

  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function saveCookie()
{
  console.log("saveCookie()");
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime()+(minutes*60*1000));

  console.log("SC     firstName=" + firstName);
  console.log("SC     lastName=" + lastName);
  console.log("SC     userId=" + userId);

  document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
  console.log("readCookie()");
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++)
    {
      let thisOne = splits[i].trim();
      let tokens = thisOne.split("=");
      if( tokens[0] == "firstName" )
      {
        firstName = tokens[1];
      }
      else if( tokens[0] == "lastName" )
      {
        lastName = tokens[1];
      }
      else if( tokens[0] == "userId" )
      {
        userId = parseInt( tokens[1].trim() );
      }
    }
    console.log("RC.0     firstName=" + firstName);
    console.log("RC.0     lastName=" + lastName);
    console.log("RC.0     userId=" + userId);
    if( userId < 0 )
    {
      window.location.href = "index.html";
    }
    else
    {

      console.log("RC.1     firstName=" + firstName);
      console.log("RC.1     lastName=" + lastName);
      console.log("RC.1     userId=" + userId);
    }
}

function newSaveEditCookie(editId)
{
  console.log("newSaveEditCookie(editId)");
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime()+(minutes*60*1000));

  console.log("newSEC     userId=" + userId);
  console.log("newSEC     editId=" + editId);
  console.log("newSEC     firstname=" + editFirstName);
  console.log("newSEC     lastname=" + editLastName);
  console.log("newSEC     email=" + editEmail);
  console.log("newSEC     phone=" + editPhoneNumber);
  console.log("newSEC     address=" + editAddress);
  console.log("newSEC     city=" + editCity);
  console.log("newSEC     state=" + editState);

  document.cookie = "userId=" + userId + ",editId=" + editId + ",firstname=" + editFirstName + ",lastname=" + editLastName +
                    ",email=" + editEmail +",phone=" + editPhoneNumber +",address=" + editAddress +",city=" + editCity +",state=" + editState +";expires=" + date.toGMTString();
}

function newReadEditCookie()
{
  console.log("readEditCookie()");
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++)
    {
      let thisOne = splits[i].trim();
      let tokens = thisOne.split("=");
      if( tokens[0] == "userId" )
      {
        userId = tokens[1];
      }
      else if( tokens[0] == "editId" )
      {
        editId = tokens[1];
      }
      else if( tokens[0] == "firstname" )
      {
        editFirstName = tokens[1];
      }
      else if( tokens[0] == "lastname" )
      {
        editLastName = tokens[1];
      }
      else if( tokens[0] == "email" )
      {
        editEmail = tokens[1];
      }
      else if( tokens[0] == "phone" )
      {
        editPhoneNumber = tokens[1];
      }
      else if( tokens[0] == "address" )
      {
        editAddress = tokens[1];
      }
      else if( tokens[0] == "city" )
      {
        editCity = tokens[1];
      }
      else if( tokens[0] == "state" )
      {
        editState = tokens[1];
      }
    }
    console.log("newREC     userId=" + userId);
    console.log("newREC     editId=" + editId);
    console.log("newREC     firstname=" + editFirstName);
    console.log("newREC     lastname=" + editLastName);
    console.log("newREC     email=" + editEmail);
    console.log("newREC     phone=" + editPhoneNumber);
    console.log("newREC     address=" + editAddress);
    console.log("newREC     city=" + editCity);
    console.log("newREC     state=" + editState);
    if( userId < 0 )
    {
      window.location.href = "index.html";
    }
    else
    {
      // document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
      console.log("newREC     userId=" + userId);
      console.log("newREC     editId=" + editId);
      console.log("newREC     firstname=" + editFirstName);
      console.log("newREC     lastname=" + editLastName);
      console.log("newREC     email=" + editEmail);
      console.log("newREC     phone=" + editPhoneNumber);
      console.log("newREC     address=" + editAddress);
      console.log("newREC     city=" + editCity);
      console.log("newREC     state=" + editState);
    }
}

function saveEditCookie(id)
{
  console.log("saveEditCookie(id)");
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime()+(minutes*60*1000));

  console.log("SEC     userId=" + userId);
  console.log("SEC     id=" + id);

  document.cookie = "userId=" + userId + ",id=" + id + ";expires=" + date.toGMTString();
}

function readEditCookie()
{
  console.log("readEditCookie()");
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for(var i = 0; i < splits.length; i++)
    {
      let thisOne = splits[i].trim();
      let tokens = thisOne.split("=");
      if( tokens[0] == "userId" )
      {
        userId = tokens[1];
      }
      else if( tokens[0] == "id" )
      {
        id = tokens[1];
      }
    }
    console.log("REC.0     userId=" + userId);
    console.log("REC.0     id=" + id);
    if( userId < 0 )
    {
      window.location.href = "index.html";
    }
    else
    {

      console.log("REC.1     userrId=" + userId);
      console.log("REC.1     id=" + id);
    }
}

function addContact()
{
  readCookie();

  console.log("addContact()");
  console.log("AC     firstName=" + firstName);
  console.log("AC     lastName=" + lastName);
  console.log("AC     userId=" + userId);

  let contFirstname = document.getElementById("contactFirstName").value;
  let contLastname = document.getElementById("contactLastName").value;
  let contPhoneNumber = document.getElementById("contactPhoneNumber").value;
  let contEmail = document.getElementById("contactEmail").value;
  let contAddress = document.getElementById("contactAddress").value;
  let contCity = document.getElementById("contactCity").value;
  let contState = document.getElementById("contactState").value;

  let tmp = {
    userId: userId,
    contFirstname: contFirstname,
    contLastname: contLastname,
    contPhoneNumber: contPhoneNumber,
    contEmail: contEmail,
    contAddress: contAddress,
    contCity: contCity,
    contState: contState
  };

  let jsonPayload = JSON.stringify(tmp);
  let url = "http://www.4331-spring23-group11.xyz/LAMPAPI/AddContact.php";
  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    console.log("AC     try");
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        let jsonObject = JSON.parse(xhr.responseText);
        console.log("Contact added");
        window.location.href = "ContactsPage.html";
      }
    };
    xhr.send(jsonPayload);
  }

  catch(err)
  {
    console.log("AC     catch");
    console.log(err.message);
  }
  console.log("AC     return");
  window.location.href = 'ContactsPage.html';
}

function searchContact()
{
  console.log("searchContact();");

  const searchText = document.getElementById("searchbar").value;

  const contactData = []

  let tmp = {
    userId:userId,
    search:searchText
  };
  let jsonPayload = JSON.stringify( tmp );

  let url = 'http://www.4331-spring23-group11.xyz/LAMPAPI/SearchContacts.php';

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        console.log("SC          Contact(s) has been retrieved");

        let jsonObject = JSON.parse( xhr.responseText );
        if (jsonObject.error)
        {
            console.log(jsonObject.error);
            return;
        }

        let tableBodyData = "";

        console.log("Number of Contacts for UserID " + userId + " with these search parameters: " + jsonObject.contacts.length);
        for (let i = 0; i < jsonObject.contacts.length; i++) {
            contactData[i] = jsonObject.contacts[i].ID;

            tableBodyData += "<tr>";
            tableBodyData += "<td id='firstName" + i + "'><span>" + jsonObject.contacts[i].firstName + "</span></td>";
            tableBodyData += "<td id='lastName" + i + "'><span>" + jsonObject.contacts[i].lastName + "</span></td>";
            tableBodyData += "<td id='email" + i + "'><span>" + jsonObject.contacts[i].email + "</span></td>";
            tableBodyData += "<td id='phoneNumber" + i + "'><span>" + jsonObject.contacts[i].phoneNumber + "</span></td>";
            tableBodyData += "<td id='address" + i + "'><span>" + jsonObject.contacts[i].address + "</span></td>";
            tableBodyData += "<td id='city" + i + "'><span>" + jsonObject.contacts[i].city + "</span></td>";
            tableBodyData += "<td id='state" + i + "'><span>" + jsonObject.contacts[i].state + "</span></td>";

            tableBodyData += "<td id='edit" + i + "'><a href='EditContactPage.html' class='fa-solid fa-user-pen' onclick='row("+ i +");saveEditCookie(" + jsonObject.contacts[i].id + ");newSaveEditCookie(" + jsonObject.contacts[i].id + ");'></a></td>";
            // row("+ i +");
            tableBodyData += "<td id='delete" + i + "'><a class='fa-solid fa-trash' onclick='deleteContact(" + jsonObject.contacts[i].userId + ", " + jsonObject.contacts[i].id + ")'></a></td>";
            tableBodyData += "</tr>";
        }

        document.getElementById("tableContacts").innerHTML = tableBodyData;

      }
    };
    xhr.send(jsonPayload);
  }

  catch(err)
  {
    document.getElementById("contactSearchResult").innerHTML = err.message;
  }

}

function editContact()
{
  readCookie();
  readEditCookie();
  newReadEditCookie();

  console.log("editContact(UserID: " + userId + " ID: " + editId + ")");

  let contNewFirstname = document.getElementById("contactEditFirstName").value;
  let contNewLastname = document.getElementById("contactEditLastName").value;
  let contPhoneNumber = document.getElementById("contactEditPhoneNumber").value;
  let contEmail = document.getElementById("contactEditEmail").value;
  let contAddress = document.getElementById("contactEditAddress").value;
  let contCity = document.getElementById("contactEditCity").value;
  let contState = document.getElementById("contactEditState").value;

  console.log("EC     contNewFirstname: " + contNewFirstname);
  console.log("EC     contNewLastname: " + contNewLastname);
  console.log("EC     contPhoneNumber: " + contPhoneNumber);
  console.log("EC     contEmail: " + contEmail);
  console.log("EC     contAddress: " + contAddress);
  console.log("EC     contCity: " + contCity);
  console.log("EC     contState: " + contState);
  console.log("EC     userId: " + userId);
  console.log("EC     id: " + editId);

  let tmp = {
    contNewFirstname: contNewFirstname,
    contNewLastname: contNewLastname,
    contPhoneNumber: contPhoneNumber,
    contEmail: contEmail,
    contAddress: contAddress,
    contCity: contCity,
    contState: contState,
    userId: userId,
    id: editId
  };

  console.log("EC     tmp: " + tmp);

  let jsonPayload = JSON.stringify(tmp);
  let url = "http://www.4331-spring23-group11.xyz/LAMPAPI/EditContact.php";
  let xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
    console.log("EC     try");
    xhr.onreadystatechange = function()
    {
      if (this.readyState == 4 && this.status == 200)
      {
        let jsonObject = JSON.parse(xhr.responseText);
        console.log("Contact Edited");
        window.location.href = "ContactsPage.html";
        }
    };
    xhr.send(jsonPayload);
  }

  catch(err)
  {
    console.log("EC     catch");
    console.log(err.message);
    }
  console.log("EC     return");
  window.location.href = 'ContactsPage.html';
}

function row(i)
{
  console.log("row();");

  let fn = document.getElementById("firstName" + i);
  let ln = document.getElementById("lastName" + i);
  let em = document.getElementById("email" + i);
  let pn = document.getElementById("phoneNumber" + i);
  let ad = document.getElementById("address" + i);
  let ci = document.getElementById("city" + i);
  let st = document.getElementById("state" + i);

  editFirstName = fn.innerText;
  editLastName = ln.innerText;
  editEmail = em.innerText;
  editPhoneNumber = pn.innerText;
  editAddress = ad.innerText;
  editCity = ci.innerText;
  editState = st.innerText;

  console.log("row: " + editFirstName);
  return;
}

function setEditValues()
{
  console.log("setEditValues();");

  console.log("setEditValues: " + editFirstName);

  var inputFN = document.getElementById("contactEditFirstName");
  var inputLN = document.getElementById("contactEditLastName");
  var inputEM = document.getElementById("contactEditEmail");
  var inputPN = document.getElementById("contactEditPhoneNumber");
  var inputAD = document.getElementById("contactEditAddress");
  var inputCI = document.getElementById("contactEditCity");
  var inputST = document.getElementById("contactEditState");

  inputFN.value = editFirstName;
  inputLN.value = editLastName;
  inputEM.value = editEmail;
  inputPN.value = editPhoneNumber;
  inputAD.value = editAddress;
  inputCI.value = editCity;
  inputST.value = editState;
  return;
}

function deleteContact(userId, id)
{
  console.log("deleteContact(UserID: " + userId + " ID: " + id + ")");

  if (confirm("Are you sure you want to delete this contact?") == true) {
    console.log("Confirmation");
  } else {
     console.log("Cancelation");
     return;
  }

  let tmp =
  {
      id:id
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = 'http://www.4331-spring23-group11.xyz/LAMPAPI/DeleteContact.php';

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
      xhr.onreadystatechange = function ()
      {
          if (this.readyState == 4 && this.status == 200) {

              console.log("Contact has been deleted");
              searchContact();
          }
      };
      xhr.send(jsonPayload);
  }
  catch (err)
  {
      console.log(err.message);
  }

  return;
}
