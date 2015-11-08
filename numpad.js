var shiftKeyPressed = false;

function numpad() {
    document.addEventListener("DOMContentLoaded", function () {
        var iframe = document.createElement('iframe');
        iframe.id = "numpadIframe";
        var iframecss = "#numpadIframe {margin:0;padding: 0;width:149px;height: 192px; position: absolute; bottom: 0;right:0; border: none}";

        var iframeStyle = document.createElement('style');
        iframeStyle.type = 'text/css';
        iframeStyle.appendChild(document.createTextNode(iframecss));
        document.body.appendChild(iframeStyle);

        iframe.onload = function () {
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            var numpad = doc.createElement('div');
            var style = doc.createElement('style');
            style.type = 'text/css';
            var css = "body{ width: 100%;margin:0;} .numpad { width: 139px; border: 1px solid #6D6D6D; background-color: #777777; padding: 4px; border-radius: 5px; } .key { font-size: 18px; width: 40px; height: 40px; display: inline-block; line-height: 40px; text-align: center; outline: none; margin: 3px; } .clicked { background: #AFAFAF; border: none;}";
            style.appendChild(document.createTextNode(css));
            numpad.className = "numpad";
            var kbKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", '0', "#"];
            kbKeys.forEach(function (id) {
                var button = doc.createElement('button');
                button.className = "key";
                button.id = id;
                button.value = id;
                button.appendChild(doc.createTextNode(id));
                numpad.appendChild(button);

            });
            doc.body.appendChild(numpad);
            doc.body.appendChild(style);
            kbKeys.forEach(function (id) {
                doc.getElementById(id).onclick = function () {
                    triggerKeyboardEvent(document.body, id.charCodeAt(0));
                }
            });

            function keyDown(e) {
                shiftKeyPressed = !!e.shiftKey;
                var key = getKey(e.keyCode);
                if (key !== undefined) {
                    var element = doc.getElementById(key);
                    clickEffect(element);
                    element.click();
                }
            }

            document.addEventListener("keydown", keyDown, false);
            document.addEventListener("keyup", keyUp, false);
        };
        document.body.appendChild(iframe);
    });
}

function keyUp(e) {
    if (e.shiftKey) {
        shiftKeyPressed = false;
    }
}

function getKey(code) {
    if (code >= 48 && code <= 57) {
        if (shiftKeyPressed) {
            if (String.fromCharCode(code) == "3") {
                return '#';
            }
            if (String.fromCharCode(code) == "8") {
                return '*';
            }
        } else {
            return String.fromCharCode(code);
        }
    }
}

function removeClass(element, className) {
    var classes = element.className.split(" ");
    classes.splice(classes.indexOf(className), 1);
    element.className = classes.join(" ");
}

function addClass(element, className) {
    element.className = element.className + " " + className;
}

function clickEffect(element) {
    addClass(element, 'clicked');
    setTimeout(function () {
        removeClass(element, 'clicked')
    }, 100);
}

function triggerKeyboardEvent(el, keyCode) {
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");

    if (eventObj.initEvent) {
        eventObj.initEvent("keydown", true, true);
    }

    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;

    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj);
}
