'use strict';

$(document).ready(function() {

  var Photo = function(fileLocation){
    this.path = fileLocation;
    this.votes = 1;
  }
  var kitten1 = new Photo('img/kittens/kitten1.jpg');
  var kitten2 = new Photo('img/kittens/kitten2.jpg');
  var kitten3 = new Photo('img/kittens/kitten3.jpg');
  var kitten4 = new Photo('img/kittens/kitten4.jpg');
  var kitten5 = new Photo('img/kittens/kitten5.jpg');
  var kitten6 = new Photo('img/kittens/kitten6.jpg');
  var kitten7 = new Photo('img/kittens/kitten7.jpg');
  var kitten8 = new Photo('img/kittens/kitten8.jpg');
  var kitten9 = new Photo('img/kittens/kitten9.jpg');
  var kitten10 = new Photo('img/kittens/kitten10.jpg');
  var kitten11 = new Photo('img/kittens/kitten11.jpg');
  var kitten12 = new Photo('img/kittens/kitten12.jpg');
  var kitten13 = new Photo('img/kittens/kitten13.jpg');
  var kitten14 = new Photo('img/kittens/kitten14.jpg');

  var photoArray = [kitten1, kitten2, kitten3, kitten4, kitten5, kitten6,kitten7, kitten8, kitten9, kitten10, kitten11, kitten12, kitten13, kitten14];

  var Tracker = function (){
    this.leftPhoto = photoArray[this.genRand()];
    this.rightPhoto = photoArray[this.genRand()];
  }

  Tracker.prototype.genRand = function() {
    var randomNum = Math.floor(Math.random() * (14 - 1)) +1 ;
    return randomNum;
  }

  Tracker.prototype.displayPhoto = function() {
      var elLeft = $('#displayLeft');
      var elRight = $('#displayRight');
        elLeft.attr('src', this.leftPhoto.path);
        elRight.attr('src', this.rightPhoto.path);
  }

  Tracker.prototype.addEventListeners = function(){
      var elLeft = $('#displayLeft');
      var elRight = $('#displayRight');

      elLeft.click(function(){
        tracker.leftPhoto.votes++;
        console.log(tracker.leftPhoto.votes);
        myNewChart.segments[1].value = tracker.leftPhoto.votes;
        myNewChart.update();
      });

      elRight.click(function(){
        tracker.rightPhoto.votes++;
        console.log(tracker.rightPhoto.votes);
        myNewChart.segments[0].value = tracker.rightPhoto.votes;
        myNewChart.update();
      });

      $('#nextKitten input').click(function(){
        tracker.leftPhoto = photoArray[tracker.genRand()];
        tracker.rightPhoto = photoArray[tracker.genRand()];
        myNewChart.segments[1].value = tracker.leftPhoto.votes;
        myNewChart.segments[0].value = tracker.rightPhoto.votes;
        tracker.displayPhoto();
        myNewChart.update();
      });
  }

  var tracker = new Tracker();

  tracker.displayPhoto();
  tracker.addEventListeners();

  var leftVotes = tracker.leftPhoto.votes;
  var rightVotes = tracker.rightPhoto.votes;

  var ctx = document.getElementById("myChart").getContext("2d");
  var myNewChart = new Chart(ctx).Doughnut([{value: rightVotes, color: "red"},{value: leftVotes, color: "blue"}]);
});
