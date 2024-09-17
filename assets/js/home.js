$(document).ready(function() {
  if ($(".header").length) {
    var maxLogoTop = 250;
    var $mainLogoImg = $(".main-logo img");
    var $header = $(".header");
    var $headerHeight = $header.height();
    var maxLogoWidth = $mainLogoImg.width();
    // var maxImgMarginLeft = parseInt($(".main-logo img").css("margin-left"));
    var $window = $(window);

    var minLogoTop = 0;
    var minLogoWidth = 145;
    var minImgMarginLeft = 0;

    function logosize() {
      var scrollPosition = $window.scrollTop();
      var scrollPercent = 1 - Math.min(scrollPosition / 300, 1);

      var logoTop = minLogoTop + (maxLogoTop - minLogoTop) * scrollPercent;
      var logoWidth =
        minLogoWidth + (maxLogoWidth - minLogoWidth) * scrollPercent;

      $mainLogoImg.css({ width: logoWidth + "px" });
      $(".logo-container").css({ top: logoTop + "px" });

      if (scrollPercent > 0) {
        $header.removeClass("logo-lock");
      } else {
        $header.addClass("logo-lock");
      }
      if ($(".showcase-link").length > 0) {
        $(".showcase-item").addClass("extra-height");
      }

    }

    $window.on("scroll", function() {
      if ($window.width() > 800) {
        var scrollPosition = $window.scrollTop();
        var scrollPercent = 1 - Math.min(scrollPosition / 300, 1);

        var headerHeight =
          $headerHeight / 2 + ($headerHeight / 2) * scrollPercent;

        $header.css({ height: headerHeight + "px" });
      }

      logosize();
    });

    $window.on("load", function() {
      setTimeout(function() {
        logosize();
      });
    });

    $window.on("resize", function() {
      logosize();
    });
  }

  function resizeGridItem(item) {
    var grid = document.querySelector(".grid-layout");
    var rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    var rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    var rowSpan = Math.ceil(
      (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  function resizeAllGridItems() {
    var allItems = document.querySelectorAll(".showcase-item");
    for (var x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x]);
    }
  }

  window.ModemResizeAllGridItems = resizeAllGridItems;

  $(window).load(function() {
    document.querySelector(".grid-layout").classList.add("resized");
    resizeAllGridItems();
  });
  $(window).on("resize", function() {
    resizeAllGridItems();
  });
});
