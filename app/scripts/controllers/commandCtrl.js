'use strict';

angular.module('talkUndoApp')
  .controller('CommandCtrl', function ($scope,localStorageService,HistoryStackCommand) {
    $scope.todos = localStorageService.get('commandTodos')  || [];

    $scope.go = function() {
        HistoryStackCommand.goForward(1);
    }

    $scope.back = function() {
        HistoryStackCommand.goBack(1);
    }

    $scope.addTodo = function() {
        var todo,
            todoAction = $scope.todoAction,
            command = {
            name: "add Todo " + todoAction,
            run: function() {
                todo = {
                    id:$scope.todos.length,
                    action:todoAction,
                }
                $scope.todos.push(todo)
                $scope.todoAction = '';
            },
            back:function() {
                $scope.todos.splice(_.indexOf($scope.todos,todo));
            }
        }

        HistoryStackCommand.add(command);
    }

    var deleteTodo = function(todo) {

        var command = {
            name:"delete Todo " + todo.action,
            run: function() {
                $scope.todos.splice(_.indexOf($scope.todos,todo));
            },
            back: function() {
                todo.id = $scope.todos.length;
                $scope.todos.push(todo);
            }
        }

        HistoryStackCommand.add(command)
    }

    var updateTodo = function(oldTodo,newTodo) {
        var oldAction = oldTodo.action,
            command = {
            name:"change Todo" + oldTodo.action + " to " + newTodo,
            run: function() {
                oldTodo.action = newTodo;
            },
            back: function() {
                oldTodo.action = oldAction;
            }
        }

        HistoryStackCommand.add(command);
    }

    $scope.$on('update.todo',function($event,oldVal,newVal) {
        updateTodo(oldVal,newVal);
    })

    $scope.$on('delete.todo',function($event,todo) {
        deleteTodo(todo);
    })

    $scope.stackPlease = function() {
        return HistoryStackCommand.getStack();
    }

    $scope.isFirst = function() {
        return HistoryStackCommand.getPosition() === -1;
    }

    $scope.getBackName = function() {
        if (HistoryStackCommand.getStack()[HistoryStackCommand.getPosition()])
            return HistoryStackCommand.getStack()[HistoryStackCommand.getPosition()].name;
        else
            return '';
    }

    $scope.getGoName = function() {
        if (HistoryStackCommand.getStack()[HistoryStackCommand.getPosition()+1])
            return HistoryStackCommand.getStack()[HistoryStackCommand.getPosition()+1].name;
        else
            return '';
    }

    $scope.isLast = function() {
        return HistoryStackCommand.getPosition() === HistoryStackCommand.getStack().length - 1;
    }
  });
