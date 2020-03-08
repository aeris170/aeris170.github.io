window.onload = function () {
  $(".slides").scrollLeft($("#home").position().left);
  $(".slides").scrollLeft($("#home").position().left);
  blackhole();
  history.replaceState('', 'Home', '#home');
  anchorLinkBackButtonFix();
}

function changeTitle(title) {
  document.title = title;
}

function anchorLinkBackButtonFix() {
  $(".anchor").click(function (e) {
    e.preventDefault();
  });

  $(window).on('hashchange', function (e) {
    e.preventDefault();
    $(".slides").scrollLeft($(window.location.hash).position().left - $("#about").position().left);
  });
};

function fadeInOutStuff() {
  $(".slider").delay(1000).animate({
    top: '0px',
    opacity: '1',
  }, {
    duration: 1000,
    easing: 'swing',
  });
  $("#canvas-div").animate({
    opacity: '1',
  }, {
    duration: 1000,
    easing: 'swing',
  });
  $(".background-stripe").delay(1000).animate({
    opacity: '0.3',
  }, {
    duration: 1000,
    easing: 'swing',
  });
  $(".loader").delay(1000).fadeOut("slow");
  $(".slides").css("height", window.innerHeight);
  $(".background-filter").css("left", (window.innerWidth - $(".background-filter").width()) / 2);
  $("div.slides").children().css("height", $(".slides").height() - 10);
  $("div.buttons").each(function () {
    $(this).children('a').each(function (index) {
      $(this).addClass("anchor translucent-button bouncy");
      $(this).css("animation-delay", index * 0.07 + "s");
    });
  });
  $("div.grid-container").each(function () {
    $(this).children('a').each(function (index) {
      $(this).addClass("grid-item");
    });
    $(this).children('div').each(function (index) {
      $(this).addClass("grid-item");
    });
  });
  $("div.exp-grid-container").each(function () {
    $(this).children('a').each(function (index) {
      $(this).addClass("exp-grid-item");
    });
    $(this).children('div').each(function (index) {
      $(this).addClass("exp-grid-item");
    });
  });
  $(".no-padding").css("padding", 0);
  $(".no-margin").css("margin", 0);
  $(".no-border").css("border", 0);
  let lineHeight = parseInt($(".content").css("font-size").slice(0, -2)) * 1.15 + "px";
  $(".content").css("padding-bottom", lineHeight);
  $(".content").css("padding-top", lineHeight);
  $(".back").height($(".back").width() / 2);
  $(".front").height($(".front").width() / 2);
};

$(window).resize(() => {
  $(".slides").css("height", window.innerHeight);
  $(".background-filter").css("left", (window.innerWidth - $(".background-filter").width()) / 2);
  $("div.slides").children().css("height", $(".slides").height() - 10);
  let lineHeight = parseInt($(".content").css("font-size").slice(0, -2)) * 1.15 + "px";
  $(".content").css("padding-bottom", lineHeight);
  $(".content").css("padding-top", lineHeight);
  $(".back").height($(".back").width() / 2);
  $(".front").height($(".front").width() / 2);
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}