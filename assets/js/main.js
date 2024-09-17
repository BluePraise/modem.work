$(document).ready(function() {
  function getPostsByTag(tag) {
    var url = tag
      ? location.origin + "/tag:" + encodeURIComponent(tag)
      : location.origin;
    $.ajax({
      url: url,
      success: function(response) {
        var projectCount = response.split('"showcase-item"').length - 1;
        $(".js-project-count").text(projectCount);
        $(".showcase").html(response);
        ModemResizeAllGridItems();
      }
    });
  }

  window.ModemGetPostsByTag = getPostsByTag;

  $(".menu-toggle").click(function() {
    $(this).toggleClass("active");
    $(".header__nav").slideToggle();
  });
  $(".showcase-text a").each(function() {
    if (this.host !== window.location.host) {
      $(this).attr("target", "_blank");
    }
  });

  $(".js-go-to-projects").click(function(e) {
    e.preventDefault();

    if (window.location.pathname == "/") {
      getPostsByTag();
      $(".js-go-to-projects").addClass('clicked');
      window.scrollTo(0, $("#projects").offset().top);
    } else {
      location.assign(window.location.origin + "/#projects");
    }
  });


  if ($(".showcase-link").length > 0) {
    $(".showcase-item").addClass("extra-height");
  }

  $('.showcase-images__col img').colorbox({
    rel: 'gal',
    current: '{current} of {total}',
    transition: 'none',
    photo: true,
    maxWidth: '100%',
    maxHeight: '80%',
    href: function () { return $(this).attr('src') },
    retinaImage: false
  });
});

var thisImg;

function getImageBrightness(image,callback) {
    var thisImgID = $('.cboxPhoto');

    var colorSum = 0;
    thisImgID.onload = function() {

    }
}