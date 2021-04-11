const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
const Base64ToImage = (base64img: string, target: Element, state: string | null, setState: any) => {
  let img: HTMLImageElement | string = new Image();
  img.src = base64img;
  target.appendChild(img);
  img = img.outerHTML;  
  img = img.replace("<img src=","");
  img = img.substr(0, img.length-1); // 마지막 문자열 자르기
  
  if(state === null){
    setState(img);
  }
}

  export { toBase64, Base64ToImage }