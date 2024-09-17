$(document).ready(function() {
  function getPostsByTag(tag) {
    var url = tag
      ? location.origin + "/tag:" + encodeURIComponent(tag)
      : location.origin;
    $.ajax({
      url: url,
      success: function(response) {
        console.log(response);
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
        debugger;
      
    }
}

// $(document).bind("cbox_open", function(){
//         var thisImgID = $('.cboxPhoto');

//         // create canvas
//         var canvas = document.createElement("canvas");
//         canvas.width = this.width;
//         canvas.height = this.height;

//         var ctx = canvas.getContext("2d");
//         ctx.drawImage(this,0,0);

//         var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
//         var data = imageData.data;
//         var r,g,b,avg;

//           for(var x = 0, len = data.length; x < len; x+=4) {
//             r = data[x];
//             g = data[x+1];
//             b = data[x+2];

//             avg = Math.floor((r+g+b)/3);
//             colorSum += avg;
//         }

//         var brightness = Math.floor(colorSum / (this.width*this.height));
//         if( brightness < 127.5) {
//             $(thisImgID).addClass("dark");
//         }else{
//             $(thisImgID).addClass("light");
//         }
// });