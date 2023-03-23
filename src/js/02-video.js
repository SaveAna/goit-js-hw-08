import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const time = localStorage.getItem('videoplayer-current-time');

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const onTimeUpdate = function (currentTime) {
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(currentTime.seconds)
  );
};

const throttledTimeUpdate = throttle(onTimeUpdate, 1000);
player.on('timeupdate', throttledTimeUpdate);

player
  .setCurrentTime(time)
  .then(function (seconds) {
    minutes = Math.floor(time / 60);
    seconds = Math.floor(time % 60);
    console.log(`Video was set to ${minutes} minutes and ${seconds} seconds`);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'The time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        console.log('Some other error occurred');
        break;
    }
  });
