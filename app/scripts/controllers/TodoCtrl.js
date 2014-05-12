'use strict';

angular.module('talkUndoApp')
  .controller('TodoCtrl', function ($scope,$rootScope) {
    $scope.deleteTodo = function() {
        $scope.$emit('delete.todo',$scope.todo);
    }

    $scope.save = function(newVal) {
        $scope.$emit('update.todo',$scope.todo,newVal);
    }
  });
