Polymer('t-article', {
  highlight: function(idx) {
    var els = this.querySelectorAll('.question-highlight-' + idx);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add('highlight');
    }
    els = this.querySelectorAll(
      '.question-' + idx);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('hidden');
    }
  },
  removeHighlight: function(idx) {
    var els = this.querySelectorAll('.question-highlight-' + idx);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('highlight');
    }
    els = this.querySelectorAll(
      '.question-' + idx);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add('hidden');
    }
  }
});
