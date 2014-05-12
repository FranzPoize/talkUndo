"use strict";

angular.module('talkUndoApp').provider('HistoryStackCommand', function HistoryStackCommandProvider() {
  var stack = [],
    position = undefined,
    history = {};

  history.add = function(command) {
    if (position === stack.length - 1) {
        stack.push(command);
        position++;
    } else {
        stack = _.initial(stack,position+1);
        stack.push(command);
        position = stack.length - 1;
    }

    command.run();
  }

  history.getStack = function() {
    return stack;
  }

  history.goBack = function(step) {
    for(var i = 0; i < step;i++) {
        stack[position].back();
        if (position >= 0)
            position--;
    }
  }

  history.getPosition = function() {
    return position;
  }

  history.goForward = function(step) {
    if (position + step > stack.length) {
        step = stack.length - position;
    }
    for(var i = 0; i < step;i++) {
        position++;
        stack[position].run();
    }
  }

  history.goTo = function(positionToGo) {
    if (position < positionToGo) {
      history.goForward(positionToGo - position);
    } else if (position > positionToGo) {
      history.goBack(position - positionToGo);
    }
  }

  this.$get = [ function unicornLauncherFactory() {

    return history;
  }];
});