angular.module('talkUndoApp')
    .directive('todo',[function() {
        return {
            //scope:{todo:'=todo'},
            template:'<form class="todo">'+
                '<div ng-hide="edit">{{todo.action}}</div>'+
                '<div ng-hide="!edit"><input type="text" ng-model="newTodo"></input></div>'+
                '<button class="btn btn-primary" ng-click="edit = true;newTodo = todo.action" ng-hide="edit"><i class="glyphicon glyphicon-pencil"></i></button>'+
                '<button class="btn btn-success" type="submit" ng-click="edit = false;save(newTodo)" ng-hide="!edit"><i class="glyphicon glyphicon-floppy-disk"></i></button>'+
                '<button class="btn btn-danger" ng-click="deleteTodo()"><i class="glyphicon glyphicon-remove"></i></button>'+
            '</form>',
            link:function($scope) {
                $scope.edit = false;

            }
        }
    }]);