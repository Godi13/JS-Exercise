window.onload = function () {
  $().getId('box').css('color','red').css('backgroundColor','grey');
  $().getTag('p').css('color','green').html('haha').click(function () {
    alert('a');
  })
}
