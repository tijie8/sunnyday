Polymer('t-button', {
  onClick: function() {
    if (this.getAttribute('href')) {
      window.location.href = this.getAttribute('href');
    }
  }
});
