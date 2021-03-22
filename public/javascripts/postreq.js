//document.getElementsByClassName('.answer-form-class').onfocusout = 

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
        // disable this input after correct answer submitted
        $('#answer-' + data.charid).prop('disabled', true);


        // focus on next available input
        var inputs = $('input');
        var count = 0;
        var index = inputs.index($('#answer-' + formid));
        while(index <= inputs.length) {
          //set up testing for this part
          
          // if at end, check for earlier enabled inputs
          //if(index === inputs.length - 1) {
            
          //}
          // find next enabled input
          if(inputs[index + count].disabled) {
            count += 1;
          } else {
            index += count;
            break;
          }
        }
        inputs.eq(
          inputs.length <= index ? 0 : index
        ).focus();


      } else {
        $('#div-' + data.charid).removeClass('letters').addClass('incorrect'); 
        $('#answer-' + data.charid).addClass('incorrect-input');
      }
    });
  });
});
