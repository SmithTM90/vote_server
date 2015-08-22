'use strict';

//client ID 65f92de39f6d2b4
//secret 83b1ea0cc4290224ced30cc85295bc8d710ad89c

$(document).ready(function() {

var pics = [];
var tracker;
var myNewChart;

$.ajax({
  url: 'https://api.imgur.com/3/album/DDoWy.json',
  method: 'GET',
  headers: {
    'Authorization': 'Client-ID 65f92de39f6d2b4'
  }
})
.done(function(res) {
  pics = res.data.images;
  console.log(pics);

  for (var i = 0; i < pics.length; i++) {
    photoArray[i] = new Photo(pics[i].link);
  }

  tracker = new Tracker();
  tracker.displayPhoto;
  tracker.addEventListeners();
  var leftVotes = tracker.leftPhoto.votes;
  var rightVotes = tracker.rightPhoto.votes;
  var ctx = document.getElementById("myChart").getContext("2d");
  myNewChart = new Chart(ctx).Doughnut([{value: rightVotes, color: "red"},{value: leftVotes, color: "blue"}]);
  tracker.displayPhoto();

})
.fail(function(err) {
  console.log(err);
});

  var Photo = function(fileLocation){
    this.path = fileLocation;
    this.votes = 1;
  }

  var photoArray = [];

  var Tracker = function (){
    this.leftPhoto = photoArray[this.genRand()];
    this.rightPhoto = photoArray[this.genRand()];

    while(this.leftPhoto === this.rightPhoto){
      this.leftPhoto = photoArray[this.genRand()];
    }
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

        if (tracker.leftPhoto === tracker.rightPhoto){
          tracker.leftPhoto = photoArray[tracker.genRand()];
        }

        tracker.displayPhoto();
        myNewChart.update();
      });
  }
});
