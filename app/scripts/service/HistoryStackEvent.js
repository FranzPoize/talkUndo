"use strict";

angular.module('talkUndoApp').provider('HistoryStackCommand', function HistoryStackCommandProvider() {
  var stack = [],
    position = undefined,
    history = {};

  this.$get = ['TodoHandler', function unicornLauncherFactory(TodoHandler) {

      history.add = function(eventSource) {
      if (position === stack.length - 1) {
          stack.push(command);
          position++;
      } else {
          stack = _.initial(stack,position+1);
          stack.push(command);
          position = stack.length - 1;
      }

      TodoHandler.run(eventSource);
    }

    history.getStack = function() {
      return stack;
    }

    history.goBack = function(step) {
      for(var i = 0; i < step;i++) {
        TodoHandler.back(stack[position]);
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
    
    return history;
  }];
});