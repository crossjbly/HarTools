// Disable extension updates (no idea if this works)
let extid=prompt("extension ID?");
const ifr = document.createElement("iframe");
ifr.src = "chrome-extension://"+extid+"/manifest.json";
document.body.appendChild(ifr);
InspectorFrontendHost.setInjectedScriptForOrigin(new URL(ifr.src).origin, "chrome.extension.setUpdateUrlData('ඞ'.repeat(1024));");
