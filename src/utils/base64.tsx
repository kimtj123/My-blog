const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
const Base64ToImage = (base64img: string, target: Element, state: HTMLImageElement | undefined, setState: any) => {
  let img: HTMLImageElement| string = new Image();
  img.src = base64img;
  target.appendChild(img);
  img = img.outerHTML;
  
  if(state === null){
    setState(img);
  }
}

  export { toBase64, Base64ToImage }