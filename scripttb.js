
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  const items = document.querySelectorAll(".song-list li");

  input.addEventListener("input", function () {
    const keyword = this.value.toLowerCase().trim();
    let matchFound = false;

    items.forEach(function (item) {
      const songName = item.textContent.toLowerCase();
      const isMatch = songName.includes(keyword);

      item.style.display = isMatch ? "block" : "none";
      if (isMatch) matchFound = true;
    });

    // Xử lý khi không tìm thấy bài hát
    let noResult = document.getElementById("no-result");
    if (!matchFound) {
      if (!noResult) {
        noResult = document.createElement("li");
        noResult.id = "no-result";
        noResult.textContent = "Không tìm thấy bài hát nào.";
        noResult.style.color = "#888";
        document.querySelector(".song-list").appendChild(noResult);
      }
    } else {
      if (noResult) noResult.remove();
    }
  });
});
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "=")) || e.metaKey) {
      e.preventDefault();
    }
  });
  document.addEventListener("wheel", function (e) {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });
