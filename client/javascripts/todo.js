//jshint esversion: 6

let controller = function() {
  $.ajax({
    url: "http://localhost:8888/todos",
    method: "GET"
  }).done(res => {
    let pElem;
    //console.log(res.comments[0]._id + " " + res.comments[0].data)
    res.todos.forEach(todo => {
      pElem = $("<p>").html(todo.data);
      $(".comments").append(pElem);
    });
  });

  let addCommentFromInputBox = function() {
    //Semmy uses "$" to name variables that will contain jQuery objects
    let $new_todo, content;

    if ($(".comment-input input").val() !== "") {
      content = $(".comment-input input").val();
      $new_todo = $("<p>").text(content);
      //$new_todo.hide();
      $(".comments").append($new_todo);
      //$new_todo.fadeIn();
      $(".comment-input input").val("");

      //add comment to db
      $.ajax({
        method: "POST",
        url: "http://localhost:8888/addtodo",
        data: {
          data: content
        }
      }).done(function(msg) {
        console.log("Data Saved: " + msg);
      });
    }
  };

  $(".comment-input button").on("click", function(event) {
    addCommentFromInputBox();
  });

  $(".comment-input input").on("keypress", function(event) {
    if (event.keyCode === 13) {
      addCommentFromInputBox();
    }
  });
};

let deleteToDo = () => {
  //delete a comment from db
  let content = $("#deleteOne").val();
  $.ajax({
    method: "POST",
    url: "http://localhost:8888/deletetodo/" + content
  }).done(function(msg) {
    console.log("Todo deleted: " + msg);
  });

  window.location.reload();
};

let getToDo = () => {
  //clear outDiv
  $("#outDiv").html("");
  let pElem;
  //retrieve a todo from db
  let content = $("#getOne").val();
  $.ajax({
    method: "GET",
    url: "http://localhost:8888/gettodo/" + content
  }).done(function(msg) {
    console.log("Todo retrieved: " + msg.message.data);
    pElem = $("<p>").html("Todo Retrieved: " + msg.message.data);
    $("#outDiv").append(pElem);
  });

  //window.location.reload();
};

let deleteAll = () => {
  //delete all todos from db
  localStorage.removeItem("commentsList");
  window.location.reload();
};

$(document).ready(() => {
  let btn01, btn02, btn03;
  //console.log("ready")
  //select the delete button
  btn03 = document.querySelectorAll("button")[3];
  btn03.addEventListener("click", deleteAll);
  btn02 = document.querySelectorAll("button")[2];
  btn02.addEventListener("click", deleteToDo);
  btn01 = document.querySelectorAll("button")[1];
  btn01.addEventListener("click", getToDo);
  controller();
});
