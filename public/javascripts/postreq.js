$(function(){
  $('#test-form').submit(function(event){

    window.alert("here!");
    event.preventDefault();
    event.stopPropagation();
    var disable = {
      disable: $('#test').val();
    };

    $.ajax({
      url: '/api/learn',
      type: 'POST',
      contentType: 'applications/json',
      data: JSON.stringify(disable),
      success: function(result){
        window.alert("success " + result);
      }
    });
    
  });

});
