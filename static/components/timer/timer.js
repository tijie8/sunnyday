Polymer('t-timer', {
  countDown: 20 * 60,
  timerState: 'pause',
  countingDownInterval: null,
  onStart: function() {
    var self = this;
    if (this.timerState == 'pause') {
      this.timerState = 'running';
      this.$.timerStart.textContent = 'Pause';
        this.countingDownInterval = setInterval(function() {
        self.countDown = self.countDown - 1;
        if (self.countDown == 0) {
          clearInterval(countingDownInterval);
        } else {
          var reminder = self.countDown % 60;
          var reminderStr = reminder >= 10 ? reminder : '0' + reminder;
          self.$.time.textContent = Math.floor(self.countDown / 60) + ":" + reminderStr;
        }
      }, 1000);
    } else {
      this.timerState = 'pause';
      this.$.timerStart.textContent = 'Start';
      clearInterval(this.countingDownInterval);
    }
  },
  onReset: function() {
    clearInterval(this.countingDownInterval);
    this.countDown = 20 * 60;
    this.$.time.textContent = '20:00';
    this.timerState = 'pause';
    this.$.timerStart.textContent = 'Start';
  }
});

