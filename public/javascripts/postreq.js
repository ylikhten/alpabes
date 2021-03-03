$(function () {
  $('.answer-form-class').submit(function(event) {
    var formid = this.id;
    event.preventDefault();
    event.stopPropagation();
    var dataToPost = {
      'input': $('#answer-' + formid).val(),
      'charid': formid
    };

    window.alert(dataToPost.input);
    $.ajax({
      url: '/api/practice/' + $(formid),
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataToPost),
    }).done(function(data){
      window.alert(data);
      var div = document.getElementById("test-display");
      div.innerHTML += data.display;
    });
    
  });

});
/*
+// SUBMIT FORM
+$(function () {
+  $('#test-form').submit(function(event) {
+    //prevent form from submitting vie browser
+    // i.e. stop page from reloading on submit
+    event.preventDefault();
+    event.stopPropagation();
+    window.alert("pressed enter");
+    var dataToPost = {
+      'input': $('#test').val()
+    };
+    $.ajax({
+      url: '/api/test',
+      type: 'POST',
+      contentType: 'application/json',
+      data: JSON.stringify(dataToPost),
+      success: function(result){
+        window.alert("success " + result);
+      }
+    })
+  });
+});
*/
