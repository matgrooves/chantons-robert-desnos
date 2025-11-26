function toggleAudio(id, btn) {
  let audio = document.getElementById(id);
  if (!audio) return;

  let icon = btn.querySelector('.play-icon');

  if (audio.paused) {
    audio.play();
    icon.textContent = '⏸️';
  } else {
    audio.pause();
    icon.textContent = '▶️';
  }

  // Update progress continuously
  audio.ontimeupdate = function() {
    let progress = btn.parentElement.querySelector('.progress');
    progress.value = (audio.currentTime / audio.duration) * 100;
  };
}

function seekAudio(id, slider) {
  let audio = document.getElementById(id);
  if (!audio || !audio.duration) return;
  audio.currentTime = (slider.value / 100) * audio.duration;
}

function setVolume(id, slider) {
  let audio = document.getElementById(id);
  if (!audio) return;
  audio.volume = slider.value;
}