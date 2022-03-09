export { DragAndDrop };

class DragAndDrop {
  constructor(el) {
    this.el = el;
  }

  render() {
    this.el.innerHTML = `
      <div id="drop-area">
        <form class="my-form">
          <input type="file" id="fileElem" multiple accept="file_extension">
          <label class="button" for="fileElem"></label>
        </form>
        <progress id="progress-bar" max="100" value="10"></progress>
        <div id="gallery"></div>
      </div>
    `;
  }

  init() {
    const dropArea = this.el.querySelector("#drop-area");
    const progressBar = this.el.querySelector("#progress-bar");
    const fileElem = this.el.querySelector("#fileElem");
    const gallery = this.el.querySelector("#gallery");
    let uploadProgress = [];

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function highlight() {
      dropArea.classList.add("highlight");
    }

    function unHighlight() {
      dropArea.classList.remove("active");
    }

    dropArea.addEventListener("drop", handleDrop, false);
    fileElem.addEventListener("change", handleFiles.bind(fileElem.files));

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unHighlight, false);
    });

    function handleDrop(e) {
      const dt = e.dataTransfer;
      let files = dt.files;
      files = [...files];
      initializeProgress(files.length);
      files.forEach(uploadFile);
      files.forEach(previewFile);
    }

    function initializeProgress(numFiles) {
      progressBar.value = 0;
      uploadProgress = [];
      for (let i = numFiles; i > 0; i--) {
        uploadProgress.push(0);
      }
    }

    function updateProgress(fileNumber, percent) {
      uploadProgress[fileNumber] = percent;
      let total =
        uploadProgress.reduce((tot, curr) => tot + curr, 0) /
        uploadProgress.length;
      console.debug("update", fileNumber, percent, total);
      progressBar.value = total;
    }

    function handleFiles(files) {
      files = [...files.target.files];
      initializeProgress(files.length);
      files.forEach(uploadFile);
      files.forEach(previewFile);
    }

    function previewFile(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/gif"
        ) {
          const img = document.createElement("img");
          img.src = reader.result;
          gallery.appendChild(img);
        } else {
          const doc = document.createElement("img");
          doc.src = "assets/img/document.png";
          gallery.appendChild(doc);
        }
      };
    }

    function uploadFile(file, i) {
      let url = "URL";
      let formData = new FormData();
      formData.append("file", file);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then(() => {
          updateProgress(i, 100);
        })
        .catch(() => {
          console.error(
            "change the URL /uploadFile function/ to work with your back-end"
          );
        });
    }
  }

  run() {
    this.render();
    this.init();
  }
}
