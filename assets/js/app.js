$(function () {
  
});

$(window).on("scroll", (e) => {
  let windowHeight = $(window).height();
  if ($(this).scrollTop() > windowHeight) {
    $('.fixed-btn').addClass('is-shown')
  } else {
    $('.fixed-btn').removeClass('is-shown')
  }
});