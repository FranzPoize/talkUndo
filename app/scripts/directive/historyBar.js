angular.module('talkUndoApp')
    .directive('historyBar',['HistoryStackCommand',function(HistoryStackCommand) {
        return {
            scope:{steps:'=historyBar'},
            replace:true,
            template:'<div class="history-bar">'+
                '<div data-trigger="hover" data-type="success" data-container="body" data-title="{{getTitle(step,$index)}}" bs-tooltip ng-repeat="step in steps" class="history-step" ng-click="goTo($index)" ng-class="{highlight: isHighLight($index)}"></div>'+
            '</div>',
            link:function($scope) {

                $scope.goTo = function($index) {
                    HistoryStackCommand.goTo($index);
                }

                $scope.isHighLight = function($index) {
                    return HistoryStackCommand.getPosition() === $index;
                }

                $scope.getTitle = function(step,$index) {
                    if ($index > HistoryStackCommand.getPosition())
                        return 'redo ' + step.name;
                    else if ($index <= HistoryStackCommand.getPosition()) {
                        return 'undo ' + step.name;
                    }
                }

            }
        }
    }]);