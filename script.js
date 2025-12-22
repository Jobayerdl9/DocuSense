function analyzeDocument() {
  const fileInput = document.getElementById("fileInput");
  const resultBox = document.getElementById("result");

  if (fileInput.files.length === 0) {
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      ❌ <span class="font-semibold">No file selected.</span><br>
      Please upload a valid document.
    `;
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const fileType = file.type;

  let documentType = "Unknown Document";

  if (fileName.includes("invoice")) {
    documentType = "Invoice";
  } else if (fileName.includes("resume") || fileName.includes("cv")) {
    documentType = "Resume";
  } else if (fileName.includes("question")) {
    documentType = "Question Paper";
  } else if (fileType === "text/plain") {
    documentType = "Text Document";
  } else if (fileType.includes("image")) {
    documentType = "Image Document";
  } else if (fileType === "application/pdf") {
    documentType = "PDF Document";
  }

  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    ✅ <span class="font-semibold">Analysis Complete</span><br><br>

    📁 <b>File Name:</b> ${file.name}<br>
    📄 <b>Detected Type:</b> ${documentType}<br>
    📦 <b>File Size:</b> ${(file.size / 1024).toFixed(2)} KB<br>
    🧾 <b>MIME Type:</b> ${fileType || "N/A"}
  `;
}
