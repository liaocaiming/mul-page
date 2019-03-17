export default  (title: string) => {
  document.title = title;
  const mobile = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(mobile)) {
    const iframe = document.createElement("iframe");
    iframe.style.visibility = "hidden";
    iframe.setAttribute("src", "/static/images/close.png");
    const iframeCallback = () => {
      setTimeout(() => {
        iframe.removeEventListener("load", iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener("load", iframeCallback);
    document.body.appendChild(iframe);
  }
}
