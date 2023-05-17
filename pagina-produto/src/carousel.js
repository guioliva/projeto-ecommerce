$(function () {
  $(".watch-slider").slick({
    infinite: true,
    slidesToShow: 4,
    centerMode: true,
    prevArrow: $("#arrow-prev"),
    nextArrow: $("#arrow-next"),
    responsive: [
      {
        breakpoint: 1468,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          fade: true,
          cssEase: "linear",
        },
      },
    ],
  });
});
