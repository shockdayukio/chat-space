$(document).on('turbolinks:load', function(){
  //turbolinksが悪さをする。らしい...

  function appendUser(user){
    var search_list = $("#user-search-result");
    var html =  '<li class="clearfix">' +
                '<div class="chat-group-user__name">' + user.name + '</div>' +
                '<button class="chat-group-user__btn chat-group-user__btn--add" id="add_button" type="button" data-user-name="'+ user.name +'" + data-user-id="'+user.id+'">' +'追加' + '</button>' +
                '</li>'
    search_list.append(html);
  }

  function insertMessageIntoHtml(message){
    var html = `<li>${ message }</li>`
    search_list.append(html);
  }

  function appendUserToGroup(name, id){
    var html =  '<li class="clearfix">' +
                '<div class="chat-group-user__name">' + name + '</div>' +
                '<button class="chat-group-user__btn chat-group-user__btn--remove" type="button" data-user-name="'+ name +'"data-user-id="'+id+'">' +'削除' + '</button>' +
                '<input type="hidden" name="group[user_ids][]" value="' + id + '">'+
                '</li>'
    $("#chat_users").append(html);
  }

  //ユーザーを検索する
  $(".search_users").on("keyup", function(){
    var input = $(".search_users").val();
    // グループに追加済みのユーザを検索結果に表示しないための配列を定義
    var group_members = []
    $('#chat_users input').each(function(i){group_members.push(this.value);})

    $.ajax({
      url: '/users',
      type: 'GET',
      data: { user: { name: input, group_members: group_members } },
      dataType: 'json'
    })
  // message.jsと違い、contentTypeとprocessDataを指定しない。なぜ？
  // 参考 http://js.studio-kingdom.com/jquery/ajax/ajax
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        insertMessageIntoHtml("一致するユーザーはいません");
      }
    })
    .fail(function(data){
      alert('ユーザー検索に失敗しました。');
    });
  });

  //ユーザをグループに追加する
  $("#user-search-result").on("click", "#add_button", function(){
    var selected_user_id = $(event.target).attr('data-user-id');
    var selected_user_name = $(event.target).attr('data-user-name');
    appendUserToGroup(selected_user_name, selected_user_id);
    $(event.target).parent("li").remove();
  });

  //ユーザをグループから削除する
  $("#chat_users").on("click", ".chat-group-user__btn--remove", function(){
    $(event.target).parent("li").remove();
  });
});
