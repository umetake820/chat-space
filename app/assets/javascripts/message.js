$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="contents__messages">
                    <div class="contents__messages__data">
                      ${message.user_name}
                      <span>
                        ${message.created_at}
                      </span>
                      <p class="contents__messages__message">
                        ${message.content}
                      </p>
                      <img class="lower-message__image" src=${message.image} >
                    </div>
                  </div>`
    } else {
      var html = `<div class="contents__messages">
                    <div class="contents__messages__data">
                      ${message.user_name}
                      <span>
                        ${message.created_at}
                      </span>
                      <p class="contents__messages__message">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents').append(html);
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  })
  .always(function() {
    $('input').prop('disabled', false);
  });
  });
});