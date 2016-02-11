window.onload = function () {
  $().getClass('member').hover(function() {
    $(this).css('background','url(images/arrow2.png) no-repeat center right');
    $().getClass('member_ul').show();
  }, function() {
    $(this).css('background','url(images/arrow.png) no-repeat center right');
    $().getClass('member_ul').hide();
  })

  var login = $().getId('login')
  login.center(250,350).resize(function () {
    login.center(250,350);
  })
  $().getClass('close').click(function () {
    login.css('display','none');
    document.documentElement.style.overflow = 'auto';
    $().getId('screen').css('display','none')
  })

  $().getClass('login').click(function () {
    login.center(250,350);
    document.documentElement.style.overflow = 'hidden';
    login.css('display','block');
    $().getId('screen').css('display','block');
  })

  login.drag();
}
