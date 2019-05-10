$('button.publish').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: $(this).data('url'),
    success: function(data, status) {
      location.reload();
    }
  })
});
