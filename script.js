let animationId = null;

    const audio = document.getElementById("player");
    const icon = document.getElementById("play-icon");
    const lyricsDisplay = document.getElementById("lyricsDisplay");
    const cdImage = document.getElementById("cdImage");

    const lyrics = [/* lyrics array giữ nguyên như bạn đưa */];

    let currentLine = -1;
    let isPlaying = false;

    function showLyric(index) {
      lyricsDisplay.innerHTML = "";
      const lineDiv = document.createElement("div");
      lineDiv.className = "marquee-text";
      lineDiv.textContent = lyrics[index].line;

      let duration = 8;
      if (index < lyrics.length - 1) {
        duration = lyrics[index + 1].time - lyrics[index].time;
      }
      lineDiv.style.animationDuration = `${duration}s`;
      lyricsDisplay.appendChild(lineDiv);
    }

    function syncLyrics() {
      const currentTime = audio.currentTime;

      if (currentLine === -1 && currentTime >= lyrics[0].time) {
        currentLine = 0;
        showLyric(currentLine);
      } else if (
        currentLine < lyrics.length - 1 &&
        currentTime >= lyrics[currentLine + 1].time
      ) {
        currentLine++;
        showLyric(currentLine);
      }

      if (isPlaying) {
        animationId = requestAnimationFrame(syncLyrics);
      }
    }

    function togglePlayPause() {
      if (audio.paused) {
        audio.play();
        icon.src = "pause.png";
        icon.alt = "Pause";
        cdImage.style.animationPlayState = "running";
        currentLine = -1;
        isPlaying = true;
        animationId = requestAnimationFrame(syncLyrics);
      } else {
        audio.pause();
        icon.src = "play.png";
        icon.alt = "Play";
        cdImage.style.animationPlayState = "paused";
        lyricsDisplay.innerHTML = "";
        currentLine = -1;
        isPlaying = false;
        if (animationId) cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    audio.addEventListener("ended", () => {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = null;

      icon.src = "play.png";
      icon.alt = "Play";
      cdImage.style.animationPlayState = "paused";
      lyricsDisplay.innerHTML = "";
      audio.currentTime = 0;
      currentLine = -1;
      isPlaying = false;
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && isPlaying) {
        audio.play();
      }
    });