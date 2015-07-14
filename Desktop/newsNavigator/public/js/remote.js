var frameIndex = localStorage.getItem('frameIndex');
var timeOutId;

function setFrameIndex(index) {
  console.log('Triggering position change to: ', index);
  frameIndex = index;
}

$(document).ready(function(){

  var myElement = $('html')[0];

  // create a simple instance
  // by default, it only adds horizontal recognizers
  var mc = new Hammer(myElement);

  // let the pan gesture support all directions.
  // this will block the vertical scrolling on a touch-device while on the element
  mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  // listen to events...
  mc.on("pandown", function(ev) {
            
    document.location = "http://localhost:9292/remote" + localStorage.getItem('frameIndex') + ".html"
            
  });
  
  $('.owl-carousel').on('changed.owl.carousel', function(event) {
    // Runs every time the carousel changes
    
    resetTimeout();
  });
  
  $('.owl-carousel').on('changed.owl.carousel', function (event) {
    playPauseVideos(event.item.index);
  });
  
  playPauseVideos(2);
});

function resetTimeout() {
  if(timeOutId) {
    clearTimeout(timeOutId);
  }
  
  timeOutId = setTimeout(function () {
    document.location = "http://localhost:9292/remote.html";
  }, 100000);
}
resetTimeout();


function playPauseVideos(index) {
  $('iframe.youtube').attr('src', ''); // Stop all videos
  var carouselItem = $('.item-video').get(index);
  var $carouselItem = $(carouselItem);
  var $youtubeIframe = $carouselItem.find('iframe.youtube');
  
  console.log(index, carouselItem, $youtubeIframe.length);
  
  if($youtubeIframe.length > 0) {
    console.log($youtubeIframe.attr('data-src'))
    $youtubeIframe.attr('src', $youtubeIframe.attr('data-src')); // Play video
  }
}


