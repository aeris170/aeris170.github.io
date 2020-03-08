function validate(form) {
  let rv = true;

  let name = form["name"];
  let replyto = form["_replyto"];
  let message = form["message"];
  if (name.value == "") {
    name.classList.add("glow-red");
    rv = false;
  }
  if (!validateEmail(replyto.value)) {
    replyto.classList.add("glow-red");
    rv = false;
  }
  if (message.value == "") {
    message.classList.add("glow-red");
    rv = false;
  }
  return rv;
}

function inputListener(e) {
  if (e.classList.contains("glow-red")) {
    e.classList.remove("glow-red");
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}