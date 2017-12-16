$(function() {
  function new_message(message) {

    var message_text = message.body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    var new_message = $('<div class="msg">' +
                '<p class="msg__username">'+ message.name +'</p>' +
                '<p class="msg__time">'+ message.time + '<p>' +
                '<p class ="msg__passage">' + message_text +'</p>' +
                '</div>');
    return new_message;
  }

  $('.msg_form').on('submit', function(e) {
    e.preventDefault();
    var api_url = window.location.pathname;
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
      var html = new_message(data);
      $('.msgs').append(html);
      // 'chat__content'の末尾に'html'を加える
      $('.form__textfield').val('');
      //テキストフィールドを空にする
      $('.form__submit').prop('disabled', false);
      ///送信ボタンを有効にする
    })

    .fail(function(data){
      alert('Asynchronous communication is not working properly!!');
    });
  });
});
