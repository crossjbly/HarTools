<p align=center><img src="https://raw.githubusercontent.com/crossjbly/HarTools/refs/heads/main/hartools.gif"/>
<p align=center><code>Extension/Devtools code execution post-rigtools patch (<133)</code></p> 

## How to use
**1. Download [HARTOOLS.har](https://github.com/crossjbly/HarTools/releases/download/latest/HARTOOLS.har)**\
**2. Get the file `HARTOOLS.har` onto the device you want to run the devtools XSS on**\
**3. On the device you want to run the devtools XSS on go to `devtools://devtools/bundled/inspector.html`**\
**4. Once it loads, add `?experiments=true` to the end of the URL**\
**5. On the sidebar on the inspector page at the top click the 2 arrows (looks like: `>>`) and select network from the dropdown**\
&nbsp;&nbsp;&nbsp;&nbsp;**^^^ if you are already on the network page you can skip this ^^^**\
**6. Click the little upload button and select the downloaded `HARTOOLS.HAR`**\
&nbsp;&nbsp;&nbsp;&nbsp;**^^^ you may need to expand the sidebar to see it ^^^**\
**7. Double click on the text that appears in the box**

***if `devtools://devtools/bundled/inspector.html` is blocked for you:***\
&nbsp;&nbsp;&nbsp;&nbsp;**substitute inspector.html with any of the following:**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`js_app.html`\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`devtools_app.html`\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`worker_app.html`

## Creating your own payloads
- Clone the repo using ``git clone https://github.com/crossjbly/HarTools.git``, then cd into the directory using ``cd HarTools``
- Make any changes you want to the html, or js files
- Run [autoxss.py](https://github.com/crossjbly/HarTools/blob/main/autoxss.py) with ``python autoxss.py``
- Head over to [the generator](https://skiovox125.vercel.app/hartools/generator.html) and paste the contents of autoxss.js (if this is down use the [data page url](https://raw.githubusercontent.com/crossjbly/HarTools/refs/heads/main/generator-datapage.txt))

## Credits
 - Crossjbly: Finding the vulnerability in .har files
 - Blobby Boi: Helping with development of the payloads and UI
 - axqmx: Testing and help with development
 - HarryJarry1: Creating autoxss and with helping development
 - unretained: Original rigtools developer tools code execution exploit (this literally wouldn't have been possible without rigtools lol)

## NOTES:
 - This has been patched by google as of Chrome V133, Only specific versions of 132 work, if it **does** work for you ping me in either [the Titanium Network discord server (in #kajigs-discussion)](https://discord.gg/unblock) or directly on discord (@crossjbly)
 - This will work without internet because everything is included in the main payload ran


If you post this anywhere other than [Titanium Network](https://discord.gg/unblock) please give proper credits and link this repo, and please don't post this on ext-remover.
