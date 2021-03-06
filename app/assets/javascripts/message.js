$(function() {
  function escapeScript(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  function new_message(message) {
    var message_text = escapeScript(message.body);
    var new_message = $('<div class="msg">' +
                '<p class="msg__username">'+ message.name +'</p>' +
                '<p class="msg__time">'+ message.time + '<p>' +
                '<p class ="msg__passage">' + message_text +'</p>' +
                '</div>');
    return new_message;
  };

  function appendMessage(e){
    e.preventDefault();
    var formdata = new FormData($(this).get(0));

    $.ajax({
      url: window.location.pathname,
      type: 'POST',
      data: formdata,
      contentType: false,
      processData: false,
      dataType: 'json',
      cache: false
    })

    .done(function(data){
      $('.msgs').append(new_message(data));
      // 'chat__content'の末尾に'html'を加える
      $('.form__textfield').val('');
      //テキストフィールドを空にする
      $('.form__submit').prop('disabled', false);
      ///送信ボタンを有効にする
    })

    .fail(function(data){
      alert('Asynchronous communication is not working properly!!');
    });
  };

  function automaticMessageLoad(){
    $.ajax({
      url: window.location.pathname,
      type: 'GET',
      contentType: false,
      processData: false,
      dataType: 'json',
    })

    .done(function(messages){
      $('.msgs').empty();
      messages.forEach(function(message){
        $('.msgs').append(new_message(message));
      });
    })

    .fail(function(data){
      alert('Automatic loading is not working properly!!');
    });
  };

  $('.msg_form').on('submit', appendMessage);
  //自動更新
  window.setInterval(automaticMessageLoad, 5000);
});
