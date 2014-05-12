'use strict';

angular.module('talkUndoApp')
  .controller('EventCtrl', function ($scope,localStorageService) {
    $rootScope.todos = localStorageService.get('eventTodos');
    $rootScope.eventStack = localStorageService.get('eventStack');

    
  });
