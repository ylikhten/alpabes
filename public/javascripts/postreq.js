$(function () {
  $('#test-form').submit(function(event) {

    event.preventDefault();
    event.stopPropagation();
    var dataToPost = {
      'input': $('#test').val()
    };

    window.alert(dataToPost.input);
    $.ajax({
      url: '/api/test',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataToPost),
      success: function(result){
        window.alert("success " + result);
      }
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
