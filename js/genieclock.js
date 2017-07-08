var genieclock = angular.module("genieClockApp", []);

genieclock.controller('clockCtrl', function ($scope) {
  var app = this;
  $scope.timestring = "";
  $scope.timestringerror = false;

  $scope.digits = [
    { digit: 0, char: 'o', xpos: 0, ypos: 0 },
    { digit: 1, char: 'o', xpos: 0, ypos: 0 },
    { digit: 2, char: 'o', xpos: 0, ypos: 0 },
    { digit: 3, char: 'o', xpos: 0, ypos: 0 },
    { digit: 4, char: 'o', xpos: 0, ypos: 0 },
    { digit: 5, char: 'o', xpos: 0, ypos: 0 },
    { digit: 6, char: 'o', xpos: 0, ypos: 0 },
    { digit: 7, char: 'o', xpos: 0, ypos: 0 },
    { digit: 8, char: 'o', xpos: 0, ypos: 0 },
    { digit: 9, char: 'o', xpos: 0, ypos: 0 },
    { digit: 10, char: 'o', xpos: 0, ypos: 0 },
    { digit: 11, char: 'o', xpos: 0, ypos: 0 },
  ];
  
  positionDigits();

  $scope.parseTime = function () {
    let enteredTime = $scope.timestring;
    let timeRegex = new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$');

    if (timeRegex.test(enteredTime) === true) {
      $scope.timestringerror = false;
      resetDigits();
      setDigits(enteredTime)
    }
    else {
      $scope.timestringerror = true;
    }
  };

  function resetDigits()
  { 
    for(var idx = 0; idx < $scope.digits.length; idx++){
      $scope.digits[idx].char = 'o';
      $scope.digits[idx].bkgd = "white";
      $scope.digits[idx].color = "black";
    }
  }

  function setDigits(enteredTime){
    var parsedTime = enteredTime.split(':');
    let hour = parsedTime[0] % 12;
    let minute = (parsedTime[1] - (parsedTime[1] % 5)) / 5;

    if(minute == hour)
    {
      $scope.digits[hour].char = 'x';
      $scope.digits[hour].bkgd = "yellow";
    }
    else
    {
      $scope.digits[hour].char = 'h';
      $scope.digits[hour].bkgd = 'purple';
      $scope.digits[hour].color = 'white';
      $scope.digits[minute].char = 'm';
      $scope.digits[minute].bkgd = 'blue';
      $scope.digits[minute].color = 'white';
    }
  }

  function positionDigits(){
    for(var idx = 0; idx < $scope.digits.length; idx++){
      let angle = (-idx+3) * 30
      let radius = 100;
      $scope.digits[idx].xpos = 85 + Math.round(radius * Math.cos((angle/360) * 2 * Math.PI)); 
      $scope.digits[idx].ypos = 85 - Math.round(radius * Math.sin((angle/360) * 2 * Math.PI));
    }
  }

});