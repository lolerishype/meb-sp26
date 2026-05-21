/*
  Usage in Markdown/HTML:

  <div class="release-box"
       data-release="2026-02-03T09:00:00-05:00"
       data-link="assets/files/homework/hw2.pdf"
       data-label="Download HW 2">
    HW 2 will be posted soon.
  </div>

  Reminder to self: this is NOT secure. If the file is already published in the repository,
  someone may still be able to access it directly. 
*/

document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll("[data-release]");

  boxes.forEach(function (box) {
    const releaseTime = new Date(box.getAttribute("data-release"));
    const now = new Date();

    const link = box.getAttribute("data-link");
    const label = box.getAttribute("data-label") || "Download file";
    const beforeText = box.textContent.trim() || "This file will be posted soon.";

    if (!link) {
      return;
    }

    if (now >= releaseTime) {
      const baseurl = window.COURSE_BASEURL || "";
      const finalLink = link.startsWith("http")
        ? link
        : baseurl + "/" + link.replace(/^\/+/, "");

      box.innerHTML = `<a class="button" href="${finalLink}">${label}</a>`;
    } else {
      const readable = releaseTime.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
      });

      box.innerHTML = `
        <span class="tag">Coming soon</span>
        <p>${beforeText}</p>
        <p class="small">Scheduled release: ${readable}</p>
      `;
    }
  });
});