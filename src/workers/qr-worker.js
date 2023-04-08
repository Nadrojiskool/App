importScripts("jsQR.js");
 
self.addEventListener("message", e => {
    const {data, width, height} = e.data;
    const qrData = jsQR(data, width, height);
    self.postMessage(qrData);
});