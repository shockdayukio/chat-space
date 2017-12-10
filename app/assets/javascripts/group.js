$(document).on('turbolinks:load', function(){
  //turbolinksが悪さをする。らしい...
  //検索&検索結果に追加
  var search_list = $("#user-search-result");
  function appendUser(user){
    // var html = `<li class="searched_user">${ user.name }</li>`
    var html =  '<li class="clearfix">' +
                '<div class="chat-group-user__name">' + user.name + '</div>' +
                '<button class="chat-group-user__btn chat-group-user__btn--add" id="add_button" type="button" data-user-name="'+ user.name +'" + data-user-id="'+user.id+'">' +'追加' + '</button>' +
                '</li>'
    search_list.append(html);
  }
  function appendNoUser(user){
    var html = `<li>${ user }</li>`
    search_list.append(html);
  }

  $(".search_users").on("keyup", function(){
    var input = $(".search_users").val();

    $.ajax({
      url: '/users/search',
      type: 'POST',
      data: { keyword: input },
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
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function(data){
      alert('ユーザー検索に失敗しました。');
    });
  });
  //検索結果をクリック&チャットメンバーに追加
  function appendUserToGroup(name, id){
    var member_list = $("#chat_users");
    var html =  '<li class="clearfix">' +
                '<div class="chat-group-user__name">' + name + '</div>' +
                '<button class="chat-group-user__btn chat-group-user__btn--remove" type="button" data-user-name="'+ name +'"data-user-id="'+id+'">' +'削除' + '</button>' + '</li>' +
                '<input type="hidden" name="group[user_ids][]" value="' + id + '">'
    member_list.append(html);
  }

  $("#user-search-result").on("click", "#add_button", function(){
    var selected_user_id = $(event.target).attr('data-user-id');
    var selected_user_name = $(event.target).attr('data-user-name');
    appendUserToGroup(selected_user_name, selected_user_id);
  });
  $("#chat_users").on("click", ".chat-group-user__btn--remove", function(){
    $(event.target).parent("li").remove();
  });
});


