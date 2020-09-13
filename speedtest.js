const timeOfTest = 15;

var timerGoing = false;
var startTime = 0;
var timeLeft = 30;
var timerInterval;
var log="";
const htmlContent = "<h1 class=\"page-title\">Analysis</h1><table id=\"mainTable\"><tr><td class=\"left\">Words Typed</td><td id=\"wordsTyped\" class=\"right\">0</td></tr><tr><td class=\"left\">Words Per Minute (Raw)</td><td id=\"wpmRaw\" class=\"right\">0</td></tr><tr><td class=\"left\">Words Per Minute (Corrected)</td><td id=\"wpmCorrect\" class=\"right\">0</td></tr><tr><td class=\"left\">Accuracy</td><td class=\"right\"><span id=\"accuracy\">0</span>%</td></tr></table><textarea disabled id=\"logRead\" rows=\"30\"></textarea><textarea disabled id=\"textRead\" rows=\"30\"></textarea><script src=\"speedtestanalysis.js\"></script>";
var textContents="";
var wordsTyped=0;
var wordsPerMinuteRaw=0;
var accuracy=0
var wordsPerMinuteTypedCorrect=0;

document.getElementById("minuteprint").innerHTML = (timeOfTest/60).toFixed(2);
document.getElementById("secondprint").innerHTML = timeOfTest.toFixed(1);
document.getElementById("timerReadout").innerHTML = timeOfTest.toFixed(1);

document.getElementById("textInput").addEventListener("keydown", keyDown);
document.getElementById("textInput").addEventListener("keyup", keyUp);
document.getElementById("textInput").addEventListener("focusout", lostFocus);

function lostFocus(e) {
	if (timerGoing) {
		alert("Hey there!\nYou lost focus on the text input box. Try not to click elsewhere on the screen in order to maintain an accurate test of your typing abilities. We are restarting your test.\nThank you!");
		location.reload();
	}
}

function updateTime() {
	document.getElementById("timerReadout").innerHTML =  timeLeft.toFixed(1);
}

function currentMilli() {
	const date = new Date();
	return date.getTime();
}

function startTimer() {
	startTime = currentMilli();
	window.setTimeout(function() {
		timerGoing = false;
		textContents = document.getElementById("textInput").value;
		document.getElementById("textInput").disabled = "disabled";
		displayFinal();
	}, timeOfTest*1000);
	requestAnimationFrame(animateTimer);
}

function animateTimer() {
	if (timerGoing) {
		timeLeft = timeOfTest-((currentMilli()-startTime)/1000);
		updateTime();
		requestAnimationFrame(animateTimer);
	}
}

function keyDown(e) {
	if (!timerGoing) {
		timerGoing = true;
		startTimer();
	}
	log+=e.code + " : " + (currentMilli()-startTime) + "\n";
	keyBehavior(e, "red");
}

function displayFinal() {
	document.body.innerHTML = htmlContent;
	document.getElementById("logRead").innerHTML = log;
	wordsTyped = textContents.length/5;
	wordsPerMinuteRaw = wordsTyped/(timeOfTest/60);
	document.getElementById("textRead").innerHTML = textContents;
	document.getElementById("wordsTyped").innerHTML = wordsTyped;
	document.getElementById("wpmRaw").innerHTML = wordsPerMinuteRaw;
}

function keyUp(e) {
	keyBehavior(e, "transparent");
}

function changeColor(key, color) {
	document.getElementById(key).style.backgroundColor = color;
}

function keyBehavior(e, color) {
	try {
		if (e.location == 0) {
			document.getElementById(e.key.toLowerCase()).style.backgroundColor = color;
		}
		if (e.shiftKey && e.location == 1) {
			changeColor("leftShift", "red");
		} else if (!e.shiftKey && e.location == 1) {
			changeColor("leftShift", "transparent");
		}
		if (e.shiftKey && e.location == 2) {
			changeColor("rightShift", "red");
		} else if (!e.shiftKey && e.location == 2) {
			changeColor("rightShift", "transparent");
		}
		if (e.altKey && e.location == 1) {
			changeColor("leftAlt", "red");
		} else if (!e.altKey && e.location == 1) {
			changeColor("leftAlt", "transparent");
		}
		if (e.altKey && e.location == 2) {
			changeColor("rightAlt", "red");
		} else if (!e.altKey && e.location == 2) {
			changeColor("rightAlt", "transparent");
		}
		if (e.ctrlKey && e.location == 1) {
			changeColor("leftControl", "red");
		} else if (!e.ctrlKey && e.location == 1) {
			changeColor("leftControl", "transparent");
		}
		if (e.ctrlKey && e.location == 2) {
			changeColor("rightControl", "red");
		} else if (!e.ctrlKey && e.location == 2) {
			changeColor("rightControl", "transparent");
		}
		if (e.metaKey && e.location == 1) {
			changeColor("leftWindowsKey", "red");
		} else if (!e.metaKey && e.location == 1) {
			changeColor("leftWindowsKey", "transparent");
		}
		if (e.metaKey && e.location == 2) {
			changeColor("rightWindowsKey", "red");
		} else if (!e.metaKey && e.location == 2) {
			changeColor("rightWindowsKey", "transparent");
		}
		
	} catch (err) {
		keyChange = "";
		switch(e.key) {
			case "`":
				keyChange = "graveAccent";
			break;
			case "-":
				keyChange = "hyphen";
			break;
			case "=":
				keyChange = "equalsSign";
			break;
			case " ": 
				keyChange = "space";
			break;
			case "[": 
				keyChange = "openBracket";
			break;
			case "]": 
				keyChange = "closeBracket";
			break;
			case "\\": 
				keyChange = "backslash";
			break;
			case ",": 
				keyChange = "comma";
			break;
			case ".": 
				keyChange = "period";
			break;
			case "/": 
				keyChange = "forwardSlash";
			break;
			case "~": 
				keyChange = "graveAccent";
			break;
			case "!": 
				keyChange = "1";
			break;
			case "@": 
				keyChange = "2";
			break;
			case "#": 
				keyChange = "3";
			break;
			case "$": 
				keyChange = "4";
			break;
			case "%": 
				keyChange = "5";
			break;
			case "^": 
				keyChange = "6";
			break;
			case "&": 
				keyChange = "7";
			break;
			case "*": 
				keyChange = "8";
			break;
			case "(": 
				keyChange = "9";
			break;
			case ")": 
				keyChange = "0";
			break;
			case "_": 
				keyChange = "hyphen";
			break;
			case "+": 
				keyChange = "equalsSign";
			break;
			case "{": 
				keyChange = "openBracket";
			break;
			case "}": 
				keyChange = "closeBracket";
			break;
			case "|": 
				keyChange = "backslash";
			break;
			case ":": 
				keyChange = ";";
			break;
			case "\"": 
				keyChange = "\'";
			break;
			case "<": 
				keyChange = "comma";
			break;
			case ">": 
				keyChange = "period";
			break;
			case "?": 
				keyChange = "forwardSlash";
			break;
			default: 
				keyChange = null;
				console.log(e.key);
			break;
		}
		changeColor(keyChange, color);
	}
}