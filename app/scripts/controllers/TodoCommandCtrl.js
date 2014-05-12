'use strict';

angular.module('talkUndoApp')
  .controller('TodoCommandCtrl', function ($scope,$rootScope) {
    $scope.deleteTodo = function() {
        $scope.$emit('delete.todo',$scope.todo);
    }

    $scope.save = function(newVal) {
        $scope.$emit('update.todo',$scope.todo,newVal);
    }
  });
