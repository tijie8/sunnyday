Polymer('tpo-reading', {
  ready: function() {
    this.tQuestions = this.children[0];
    this.tArticle = this.children[1];
  },
  currentQuestionIndex: 0,
    updateQuesionVisibility: function(newIdx) {
    if (newIdx == this.currentQuestionIndex) {
      return;
    }
    this.tQuestions.hideQuestion(this.currentQuestionIndex);
    this.tQuestions.showQuestion(newIdx);
    this.tArticle.removeHighlight(this.currentQuestionIndex);
    this.tArticle.highlight(newIdx);
    this.currentQuestionIndex = newIdx;
    if (this.tQuestions.isFirst(this.currentQuestionIndex)) {
      this.$.previousQuestion.setAttribute('disabled', true);
    } else {
      this.$.previousQuestion.removeAttribute('disabled' );
    }
    if (this.tQuestions.isLast(this.currentQuestionIndex)) {
      this.$.nextQuestion.setAttribute('disabled', true);
    } else {
      this.$.nextQuestion.removeAttribute('disabled');
    }
  },
  showNextQuestion: function() {
    var newIdx = this.currentQuestionIndex + 1;
    if (this.tQuestions.isRangeValid(newIdx)) {
      this.updateQuesionVisibility(newIdx)
    }
  },
  showPreviousQuestion: function() {
    var newIdx = this.currentQuestionIndex - 1;
    if (this.tQuestions.isRangeValid(newIdx)) {
      this.updateQuesionVisibility(newIdx)
    }
  },
  showAnswers: function() {
    this.$.previousQuestion.setAttribute('disabled', true);
    this.$.nextQuestion.setAttribute('disabled', true);
    this.tQuestions.showAnswers();
  }
});
