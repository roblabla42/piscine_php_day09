$(document).ready(function() {
  var newlist = $("#newlist");
  var removeCookie = $("#removecookie");
  $("#newlist").submit(function(form) {
    form.preventDefault();
    var elem = prompt("What do you want ToDo ?");
    addTodoCookie(elem);
    addTodo(elem);
    return false;
  });
  $("#removecookie").submit(function(form)
  {
    form.preventDefault();
    eraseCookie("ft_list");
    $("#ft_list").html("");
    return false;
  });
  loadDefault();
});

function addTodoCookie(elem) {
  var cookie;
  try {
    cookie = readCookie("ft_list");
    if (cookie != null)
    {
      cookie = JSON.parse(decodeURIComponent(cookie));
      console.log(cookie);
    }
    else
      cookie = [];
  } catch (e) {
    cookie = [];
  }
  cookie.push(elem);
  createCookie("ft_list", encodeURIComponent(JSON.stringify(cookie)));
}

function removeTodoCookie(i)
{
  var cookie;
  try {
    cookie = readCookie("ft_list");
    if (cookie != null)
    {
      cookie = JSON.parse(decodeURIComponent(cookie));
      console.log(cookie);
    }
    else
      cookie = [];
  } catch (e) {
    cookie = [];
  }
  cookie.splice(i, 1);
  createCookie("ft_list", encodeURIComponent(JSON.stringify(cookie)));
}

function addTodo(elem) {
  /*var div = document.createElement("div");
  div.appendChild(document.createTextNode(elem));
  div.classList.add("todoitem");*/
  var i = $("#ft_list").children().length;
  $("#ft_list").append("<div class='todoitem-" + i + "'>" + elem + "</div>");
  $(".todoitem-" + i).click(function() {
    $(".todoitem-" + i).remove();
    removeTodoCookie(i); // TODO : find index of div
  });
}

function loadDefault()
{
  var cookie;
  if ((cookie = readCookie("ft_list")) != null) {
    try {
      var list = JSON.parse(decodeURIComponent(cookie));
      list.forEach(function (elem) {
        addTodo(elem);
      });
    } catch (e)
    {}
  }
}

function createCookie(name,value) {
    document.cookie = name + "=" + value + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i=0;i < cookies.length;i++) {
        var curr = cookies[i];
        while (curr.charAt(0)==' ') curr = curr.substring(1,curr.length);
        if (curr.indexOf(nameEQ) == 0)
            return curr.substring(nameEQ.length,curr.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
