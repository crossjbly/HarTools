import base64

def read_and_encode(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    return base64.b64encode(content.encode("utf-8")).decode("utf-8")

# Encode the HTML and JS files
entry_b64 = read_and_encode("entry.html")
index_html_b64 = read_and_encode("payloads/index.html")
index_js_b64 = read_and_encode("payloads/index.js")

# Load the xss.js file
with open("autoxss.js", "r", encoding="utf-8") as f:
    js_contents = f.read()

# Replace placeholders with base64-encoded strings
js_contents = js_contents.replace("putentrycontentshere", entry_b64)
js_contents = js_contents.replace("putindex.htmlcontentshere", index_html_b64)
js_contents = js_contents.replace("putindex.jscontentshere", index_js_b64)

# Save the modified xss.js
with open("autoxss.js", "w", encoding="utf-8") as f:
    f.write(js_contents)
print("The output should now be saved at autoxss.js")
print("Go to https://skiovox125.vercel.app/hartools/generator.html in order to convert xss.js to HARTOOLS.har")
