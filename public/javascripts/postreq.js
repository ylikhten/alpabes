$(function () {
  // refer to the class (.classname) instead of id (#idname) for 
  // forms generated in a for loop.
  // The id tag must be unique, so the below function will only apply 
  // to the first object that got that tag
  $('.answer-form-class').submit(function(event) {
    var formid = this.id;
    event.preventDefault();
    event.stopPropagation();
    var dataToPost = {
      'input': $('#answer-' + formid).val(),
      'charid': formid
    };

    $.ajax({
      url: '/api/practice/' + $(formid),
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataToPost),
    }).done(function(data){
      // set css class depending on answer from API
      if (data.correctAnswer) {
        $('#div-' + data.charid).removeClass('letters').addClass('correct'); 
      } else {
        $('#div-' + data.charid).removeClass('letters').addClass('incorrect'); 
      }
    });
  });
});
