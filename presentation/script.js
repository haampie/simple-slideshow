document.addEventListener('DOMContentLoaded', () => {
  var num = parseInt(location.hash.slice(1), 10);
  var slide = num ? num : 0;
  var total = document.querySelectorAll('.slide').length;

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37:
      case 38:
        slide = Math.max(0, slide - 1);
        location.hash = ['#', slide].join('');
        e.preventDefault();
      break;
      case 39:
      case 40:
        slide = Math.min(total - 1, slide + 1);
        location.hash = ['#', slide].join('');
        e.preventDefault();
      break;
      case 27:
        document.getElementById('slide-wrap').classList.toggle("overview");
      break;
    }
  });
});
