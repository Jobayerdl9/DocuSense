function analyzeDocument() {
  const fileInput = document.getElementById("fileInput");
  const resultBox = document.getElementById("result");

  // Reset
  resultBox.classList.add("hidden");
  resultBox.innerHTML = "";

  // Validation
  if (!fileInput.files || fileInput.files.length === 0) {
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = `
      ❌ <span class="font-semibold">No file selected</span><br>
      Please upload a PDF, image, or text document.
    `;
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const fileType = file.type;
  const fileSizeKB = (file.size / 1024).toFixed(2);

  let documentType = "Unknown Document";
  let confidence = "Low";

  /* ========= NAME-BASED HEURISTICS ========= */
  if (fileName.includes("invoice") || fileName.includes("bill")) {
    documentType = "Invoice";
    confidence = "High";
  } 
  else if (fileName.includes("resume") || fileName.includes("cv")) {
    documentType = "Resume";
    confidence = "High";
  } 
  else if (fileName.includes("question") || fileName.includes("exam")) {
    documentType = "Question Paper";
    confidence = "Medium";
  }

  /* ========= MIME-TYPE FALLBACK ========= */
  else if (fileType === "application/pdf") {
    documentType = "PDF Document";
    confidence = "Medium";
  } 
  else if (fileType === "text/plain") {
    documentType = "Text Document";
    confidence = "Medium";
  } 
  else if (fileType.startsWith("image/")) {
    documentType = "Image Document";
    confidence = "Low";
  }

  /* ========= UNSUPPORTED FILE ========= */
  if (!fileType && !fileName) {
    documentType = "Unsupported File";
    confidence = "None";
  }

  /* ========= RESULT ========= */
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    ✅ <span class="font-semibold">Analysis Complete</span><br><br>

    📄 <b>File Name:</b> ${file.name}<br>
    📁 <b>Detected Type:</b> ${documentType}<br>
    📦 <b>File Size:</b> ${fileSizeKB} KB<br>
    🧾 <b>MIME Type:</b> ${fileType || "Unknown"}<br>
    🎯 <b>Confidence:</b> ${confidence}
  `;
}

