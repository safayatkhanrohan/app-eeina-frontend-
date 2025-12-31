import html2pdf from "html2pdf.js";

const prepareImages = async (container: HTMLElement) => {
  const imgs = container.querySelectorAll<HTMLImageElement>("img");

  for (let img of imgs) {
    const src = img.src;
    if (src.startsWith(window.location.origin) || src.startsWith("data:")) {
      continue;
    }

    try {
      img.crossOrigin = "anonymous";
      img.src = `https://images.weserv.nl/?url=${encodeURIComponent(src)}`;
    } catch (err) {
      console.log("Image proxy failed:", src, err);
    }
  }
};



export const exportPDF = async (
  container: HTMLElement | null,
  fileName: string = "document.pdf"
) => {
  if (!container) return;

  await prepareImages(container);

  const options:any = {
    margin: 0.5,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
     html2canvas: { 
    scale: 2,
    useCORS: true 
  },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  return html2pdf().from(container).set(options).save();
};
