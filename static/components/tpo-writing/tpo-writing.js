Polymer('tpo-writing', {
  onUp: function() {
    var selection;
    if (window.getSelection) {
      selection = window.getSelection();
    } else {
      selection = document.selection.createRange();
    }
    selection.toString() !== '' &&
      alert('"' + selection.toString() + '" was selected at ' + e.pageX + '/' + e.pageY);
  }
});
