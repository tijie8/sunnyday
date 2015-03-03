Polymer('t-questions', {
  ready: function() {
    this.questions = this.children;
  },
  hideQuestion: function(idx) {
    if (this.isRangeValid(idx)) {
      this.questions[idx-1].classList.add('hidden');
    }
  },
  showQuestion: function(idx) {
    if (this.isRangeValid(idx)) {
      this.questions[idx-1].classList.remove('hidden');
    }
  },
  showAnswers: function() {
    for (var i = 0; i < this.questions.length; i++) {
      this.questions[i].classList.remove('hidden');
    }
    var rightAnswers = this.querySelectorAll('.right-answer');
    for (var i = 0; i < rightAnswers.length; i++) {
      if (rightAnswers[i].checked) {
        rightAnswers[i].parentElement.classList.add('answer-correct');
      } else {
        rightAnswers[i].parentElement.classList.add('answer-wrong');
      }
    }
    var wrongAnswers = this.querySelectorAll('.wrong-answer');
    for (var i = 0; i < wrongAnswers.length; i++) {
      if (wrongAnswers[i].checked) {
        wrongAnswers[i].parentElement.classList.add('answer-wrong');
      }
    }
  },
  isRangeValid: function(idx) {
    return idx > 0 && idx <= this.children.length;
  },
  isFirst: function(idx) {
    return idx == 1;
  },
  isLast: function(idx) {
    return idx == this.children.length;
  }
});
