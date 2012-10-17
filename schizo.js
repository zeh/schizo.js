/*
This writes a funny article with false positoves when trying to identify the
user's browser, and injects it into a DOM element with id "schizo-body".

This was initially created (and is used) for the article that resides here:
http://zehfernando.com/2012/browser-schizophrenia/

Important notes:
 * It shouldn't be used for real browser detection.
 * The code is very verbose, with lots of redundancy. It's just so it allows
   for more flexible editing and slight message variations. Do not try to
   optimize it; that's beside the point.

And finally: obviously, browser detection is something that should be avoided
in the vast majority of the cases. A feature detection is often the right
solution. Read these relevant articles about it:

http://msdn.microsoft.com/en-us/magazine/hh475813.aspx
http://jibbering.com/faq/notes/detect-browser/

Still; having .appName, .appCodeName, .appVersion, and .userAgents identifying
itself as 3 or more different browsers at the same time makes no sense. There
are moments when browser detection would make sense, as in:

 * When presenting alternative content for a browser that does support
   a given feature, but in a subpar fashion
 * When optimizing intensive code when you know you should skip parts of it
   (like applying certain CSS changes)
 * When behaving differently in certain platforms that have different UIs
   (rollovers versus clicks for touch devices, for example)
 * When gathering usage statistics
   
One day, maybe, we'll have navigator properties that make sense.
*/

var messages = [];

messages.push("Oh, hey, hello there!");

var uas = navigator.userAgent.split(" ");
var bv; // Browser version
var sn; // System name
var i;
var showOSpunchline = true;

var brokeJoke = function() {
	messages = []
	messages.push("Aw man, you broke the joke by using a different browser! Or maybe you tried to fool the script by changing your user agent... that won't do; I'm checking several different navigator properties at the same time.\n");
	messages.push("If this is a legitimate browser, please help me make this article funnier! Write to zeh@zehfernando.com with the following information:\n");
	messages.push("<ul>");
	for (i in navigator) {
		if (typeof navigator[i] != "function") messages.push("<li>" + i + ": \"" + navigator[i] + "\"</li>");
	}
	messages.push("</ul>");
	messages.push("Thanks!\n");
	
	showOSpunchline = false;
};

var searchUANumber = function(__id) {
	for (var j = 0; j < uas.length; j++) {
		if (uas[j].indexOf(__id) > -1) {
			return uas[j].split("/")[1];
		}
	}
	return "?";
};

if (navigator.appName == "Netscape") {
	// Chrome, FF and Safari use "Netscape" for appName

	/*
	// Android Galaxy Nexus, Chrome
	product = "Gecko"
	productSub = "20030107"
	vendorSub = ""
	appName = "Netscape"
	appCodeName = "Mozilla"
	vendor = "Google Inc."
	userAgent = "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03O) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
	platform = "Linux armv71"

	// Android Nexus One, native
	(same)
	userAgent = "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus One Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"

	// iPhone
	productSub = "20030107"
	product = "Gecko"
	appCodeName = "Mozilla"
	vendorSub = ""
	vendor = "Apple Computer, Inc."
	platform = "iPhone"
	appName = "Netscape"
	userAgent = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5"

	Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) version/4.0.4 Mobile/7B367 Safari/531.21.10
	Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3
	Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543a Safari/419.3

	// Safari
	productSub = "20030107"
	product = "Gecko"
	vendorSub = ""
	vendor = "Apple Computer, Inc."
	platform = "Win32"
	appName = "Netscape"
	appVersion = "5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"
	userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"

	// Chrome
	appCodeName = "Mozilla"
	appName = "Netscape"
	appVersion = "5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13"
	platform = "Win32"
	product = "Gecko"
	productSub = "20030107"
	userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13"
	vendor = "Google Inc."
	
	// OSX => Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1

	// FF
	appCodeName = "Mozilla"
	appName = "Netscape"
	appVersion = "5.0 (Windows)"
	buildID = "20120905151427"
	oscpu = "Windows NT 6.1; WOW64"
	platform = "Win32"
	product = "Gecko"
	productSub = "20100101"
	userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20100101 Firefox/15.0.1"
	
	// Maxthon - http://www.maxthon.com/ - thanks to Peter Macinkovic
	appName: "Netscape"
	vendorSub: ""
	cookieEnabled: "true"
	appVersion: "5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.12 (KHTML, like Gecko) Maxthon/3.4.1.1000 Chrome/18.0.966.0 Safari/535.12"
	plugins: "[object DOMPluginArray]"
	platform: "Win32"
	product: "Gecko"
	userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.12 (KHTML, like Gecko) Maxthon/3.4.1.1000 Chrome/18.0.966.0 Safari/535.12"
	productSub: "20030107"
	vendor: "Maxthon Asia Ltd."
	onLine: "true"
	language: "en-US"
	mimeTypes: "[object DOMMimeTypeArray]"
	geolocation: "[object Geolocation]"
	appCodeName: "Mozilla"
	
	// Safari/iOS embedded in Twitter - thanks to Miller Medeiros
	geolocation: "[object Geolocation]"
	standalone: "false"
	cookieEnabled: "true"
	language: "en-us"
	productSub: "20030107"
	product: "Gecko"
	appCodeName: "Mozilla"
	mimeTypes: "[object MimeTypeArray]"
	vendorSub: ""
	vendor: "Apple Computer, Inc."
	platform: "iPad"
	appName: "Netscape"
	appVersion: "5.0 (iPad; U; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8L1"
	userAgent: "Mozilla/5.0 (iPad; U; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8L1"
	plugins: "[object PluginArray]"
	onLine: "true"
	*/

	messages.push("I see you're visiting this website using a <strong>Netscape</strong> browser. That browser's a bit old, don't you think? Why are you still using it?\n");
	messages.push("Wait, you're not using that, you say? Sorry, my bad. I must have looked in the wrong place. I was looking at your browser's <code>navigator.appName</code> property. It says \"Netscape\" right there! But that's not the right place to look, I suppose. I should have known.\n");

	if (navigator.vendor == "Google Inc." || navigator.vendor == "Apple Computer, Inc." || navigator.vendor == "Maxthon Asia Ltd.") {
		// Chrome or Safari
		messages.push("I got it! I know, you're using <strong>Mozilla</strong>. Wait, what's that exactly? Is that a real browser name? Isn't that Netscape anyway? Or maybe it's Firebird, or Firefox, right?\n");
		messages.push("Uh? You're not using that either? Aw, man. Wrong place again. I was looking at the <code>navigator.appCodeName</code> property. Damn, I thought that would work!\n");
		
		if (navigator.product == "Gecko") {
			messages.push("Alright, let's try again. I think you're using something called... <strong>Gecko</strong>? What the hell is that? That's what it says on <code>navigator.product</code>. Are you kidding me?\n");
			messages.push("So you are not using that either? It figures. Geez.\n");
			
			if (navigator.userAgent.indexOf("Mobile") > -1 && (navigator.userAgent.indexOf("Safari") > -1 || navigator.userAgent.indexOf("AppleWebKit"))) {
				// Mobile...
				showOSpunchline = false;

				if (navigator.userAgent.indexOf("Android") > -1) {
					// ..Android
					messages.push("Ah, I see it now. You're on a mobile device! How awesome! And you're using... <strong>Safari</strong> for iOS! That's it! You're an Apple fan, I assume.\n");
					messages.push("Oh, no? Uh, really? Wow, my bad. Your browser's <code>navigator.userAgent</code> saying \"Mobile Safari\" threw me off. I guess it's not very accurate.\n");
					
					if (navigator.userAgent.indexOf("Chrome") > -1) {
						// Chrome browser
						messages.push("Ok... maybe... is that Chrome? Your browser's <code>navigator.userAgent</code> says so, at least. It is? Great. Makes sense. It looks like Safari, I guess.\n");

						bv = navigator.appVersion.split(" ")[0];
			
						messages.push("Now I just need to know your version. You're using Chrome version <strong>" + bv + "</strong>, right?\n");

						messages.push("Wait, wrong again? Are you sure? It says you're using version " + bv + " right in your browser's <code>navigator.appVersion</code> property!\n");

						messages.push("Ah, I see the problem. Your browser's <code>navigator.userAgent</code> says " + bv + " is the Mozilla version. But you're not using Mozilla, right? Right. So maybe it just thinks it is Mozilla version " + bv + ". It happens.\n");

						messages.push("Alright, alright. Well, maybe I should look again.\n");
			
						bv = searchUANumber("Chrome");
			
						messages.push("Well, here's something. Near the end of <code>navigator.userAgent</code> there's something that says \"Chrome\" with the number <strong>" + bv + "</strong> next to it. Is that it? It looks like it, it's a crazy number. Chrome loves those.\n");

						messages.push("It is? It is?! Incredible! Wow, I finally got it right. Man. That was tougher than I expected!\n");
						
						messages.push("Now I only need to know your operating system. That should be easy; your browser's <code>navigator.userAgent</code> will tell me that. That's <strong>Linux</strong>, right? You nerd!\n");
					} else {
						// Native browser probably
						messages.push("Ok... maybe... is that... I have no idea what that is. Native Android browser, I suppose? Yeah. I'll call it that. Does that even have a version number?\n");
						messages.push("Anyway, I think you need to get a real phone and run Chrome. Just saying.\n");
						
						// No real punchline
					}
				} else {
					// ..iOS

					messages.push("Ah, I see it now. You're on a mobile device! How awesome! And you're using... <strong>Safari</strong> for iOS.\n");
					messages.push("Is that right? It is, right?\n");
					
					messages.push("What? Version? Who cares about version? I'll just assume you're using the latest and greatest. Isn't that what everyone else does?\n");
					
					// No real punchline
				}
			} else if (navigator.userAgent.indexOf("Maxthon") > -1) {
					// Maxthon, mobile
					showOSpunchline = false;

					messages.push("Wait! I know! You're using <strong>Safari</strong>! It says so on the end of your <code>navigator.userAgent</code> string! Ha!\n");
						
					messages.push("No? Uh, really? Well... ok, let me look again.\n");

					messages.push("Ok... maybe... is that Chrome? Your browser's <code>navigator.userAgent</code> says so, at least. It is?\n");
					
					messages.push("No? No??!? What, are you kidding me? It says so right there! Chrome version "+searchUANumber("Chrome")+"!!\n");
					
					messages.push("Ok, ok. I believe you. Let me look again.\n");

					messages.push("Well, there's something on your <code>navigator.userAgent</code> that says <strong>Maxthon</strong>. That's a weird name. Is that it? It can't be it.\n");
					
					messages.push("It is? really? Geez, is that a real browser? Never heard of it. How am I supposed to know?\n");

					bv = navigator.appVersion.split(" ")[0];
		
					messages.push("Well, whateher. Now I just need to know your version. You're using Maxthon version <strong>" + bv + "</strong>, right?\n");

					messages.push("Wait, wrong again? Are you sure? It says you're using version " + bv + " right in your browser's <code>navigator.appVersion</code> property!\n");

					messages.push("Ah, I see the problem. Your browser's <code>navigator.userAgent</code> says " + bv + " is the Mozilla version. But you're not using Mozilla, right? Right. So maybe it just thinks it is Mozilla version " + bv + ". It happens.\n");

					messages.push("Alright, alright. Well, maybe I should look again.\n");
		
					bv = searchUANumber("Maxthon");
		
					messages.push("Well, here's something. Near the end of <code>navigator.userAgent</code> there's something that says \"Chrome\" with the number <strong>" + bv + "</strong> next to it. Is that it? It looks like it, it's a crazy number. Chrome loves those.\n");

					messages.push("It is? It is?! Incredible! Wow, I finally got it right. Man. That was tougher than I expected!\n");
					
			} else {
				// Desktop
				if (navigator.userAgent.indexOf("Safari") > -1) {
					// Chrome or Safari or maybe something else webkit-based
					if (navigator.userAgent.indexOf("Chrome") > -1) {
						// Chrome
						messages.push("Wait! I know! You're using <strong>Safari</strong>! It says so on the end of your <code>navigator.userAgent</code> string! Ha!\n");
						
						messages.push("No? Uh, really? Well... ok, let me look again.\n");

						messages.push("Ok... maybe... is that Chrome? Your browser's <code>navigator.userAgent</code> says so, at least. It is? Great. Makes sense. It looks like Safari, I guess.\n");

						bv = navigator.appVersion.split(" ")[0];
			
						messages.push("Now I just need to know your version. You're using Chrome version <strong>" + bv + "</strong>, right? Doesn't that number seem low to you? I mean, Chrome is supposed to have auto-update!\n");

						messages.push("Wait, wrong again? Are you sure? It says you're using version " + bv + " right in your browser's <code>navigator.appVersion</code> property!\n");

						messages.push("Ah, I see the problem. Your browser's <code>navigator.userAgent</code> says " + bv + " is the Mozilla version. But you're not using Mozilla, right? Right. So maybe it just thinks it is Mozilla version " + bv + ". It happens.\n");

						messages.push("Alright, alright. Well, maybe I should look again.\n");
			
						bv = searchUANumber("Chrome");
			
						messages.push("Well, here's something. Near the end of <code>navigator.userAgent</code> there's something that says \"Chrome\" with the number <strong>" + bv + "</strong> next to it. Is that it? It looks like it, it's a crazy number. Chrome loves those.\n");

						messages.push("It is? It is?! Incredible! Wow, I finally got it right. Man. That was tougher than I expected!\n");

					} else {
						// Safari
						messages.push("Wait! I know! You're using <strong>Safari</strong>! It says so on the end of your <code>navigator.userAgent</code> string! Ha!\n");

						bv = navigator.appVersion.split(" ")[0];
			
						messages.push("Now I just need to know your version. You're using Safari version <strong>" + bv + "</strong>, right? Right?\n");

						messages.push("Wait, wrong again? Are you sure? It says you're using version " + bv + " right in your browser's <code>navigator.appVersion</code> property!\n");

						messages.push("Ah, I see the problem. Your browser's <code>navigator.userAgent</code> says " + bv + " is the Mozilla version. But you're not using Mozilla, right? Right. So maybe it just thinks it is Mozilla version " + bv + ". It happens.\n");

						messages.push("Alright, alright. Well, maybe I should look again.\n");
			
						bv = searchUANumber("Safari");
			
						messages.push("Well, here's something. In the end of <code>navigator.userAgent</code> there's something that says \"Safari\" with the number <strong>" + bv + "</strong> right next to it. That's gotta be it, right? Safari version " + bv + "?!\n");
						
						messages.push("No? No?!?! What! Yeah, I thought that number looked too big. But it's right next to the browser name!\n");

						bv = searchUANumber("Version");
			
						messages.push("Well, last try. There's something there that also says \"Version\" with the number <strong>" + bv + "</strong> next to it. Is that it?\n");

						messages.push("It is? It is?! Incredible! Wow, I finally got it right. Man. That was tougher than I expected!\n");
					}
				} else {
					brokeJoke();
				}
			}
		} else {
			brokeJoke();
		}

		
	} else if (navigator.product == "Gecko") {
		// FF, maybe
		messages.push("I got it! I know, you're using something called... <strong>Gecko</strong>? What the hell is that? Is that a real browser name?\n");
		messages.push("Uh? You're not using that either? Aw, man. Wrong place again. I was looking at the <code>navigator.product</code> property. Damn, I thought that would work!\n");
		
		if (navigator.userAgent.indexOf("Firefox") > -1) {
			// Really FF
			messages.push("Wait! I know! You're using <strong>Firefox</strong>! It says so in the end of your <code>navigator.userAgent</code> string! Ha!\n");

			bv = navigator.appVersion.split(" ")[0];
	
			messages.push("Now I just need to know your version. You're using Firefox version <strong>" + bv + "</strong>, right? Right?\n");
	
			messages.push("Wait, wrong again? Are you sure? It says you're using version " + bv + " right in your browser's <code>navigator.appVersion</code> property!\n");

			messages.push("But you know what.... maybe the problem is that your browser's <code>navigator.userAgent</code> says " + bv + " is the Mozilla version. I thought Firefox and Mozilla were the same thing. I suppose I'm wrong. Maybe I should look again.\n");

			bv = searchUANumber("Firefox");
	
			messages.push("Well, here's something. The end of <code>navigator.userAgent</code> has the number <strong>" + bv + "</strong>. Is that it?\n");
	
			messages.push("It is? It is?! Incredible! Wow, I finally got it right. Man. That was tougher than I expected!\n");
		} else {
			brokeJoke();
		}
	}
} else {
	// Opera and IE use correct names - "Opera" or "Microsoft Internet Explorer"
	
	messages.push("I see you're visiting this website using a <strong>Mozilla</strong> browser. Wait, what's that exactly? Is that a real browser name? Isn't that Netscape anyway? Or maybe it's Firebird, or Firefox, right?\n");
	messages.push("Oh wait, you're not using a Mozilla, you say? Sorry, my bad. I probably looked in the wrong place. I was looking at your browser's <code>navigator.appCodeName</code> property. It says \"Mozilla\" right there! But that's not the right place to look, I suppose. I should have known.\n");
	
	if (navigator.appName == "Opera") {
		// Opera gets it (mostly) right
	
		/*
		// Opera 12.02
		appCodeName = "Mozilla"
		appMinorVersion = ""
		appName = "Opera"
		appVersion = "9.80 (Windows NT 6.1; WOW64; U; en)"
		platform = "Win32"
		userAgent = "Opera/9.80 (Windows NT 6.1; WOW64; U; en) Presto/2.10.289 Version/12.02"
		*/

		messages.push("Ok, I think I got it! You're using <strong>Opera</strong>. Great. I'm glad that browser identifies itself using <code>navigator.appName</code>! That makes it easier, you know.\n");
		
		bv = navigator.appVersion.split(" ")[0];
		
		messages.push("Now I just need to know your version. You're using Opera version <strong>" + bv + "</strong>, right? Right?\n");
		
		messages.push("Wait, wrong again? Are you sure? It says you're using version " + bv + " right in your browser's <code>navigator.appVersion</code> property! And then on the beginning of <code>navigator.userAgent</code> again!\n");
		
		messages.push("Alright, alright. Well, maybe I should look again.\n");
		
		bv = uas[uas.length-1].split("/")[1];
		
		messages.push("Well, here's something. In the end of <code>navigator.userAgent</code> there's something that says \"Version\" with the number <strong>" + bv + "</strong> next to it. Is that it?\n");
		
		messages.push("It is? It is?! Incredible! Wow, I finally got it right. Man. That was tougher than I expected!\n");
		
	} else if (navigator.appName == "Microsoft Internet Explorer") {
		// Surprisingly, MSIE also gets it (mostly) right
		
		messages.push("Ok, I got it! You're using <strong>Internet Explorer</strong>. Great. I mean, not great, since it's still Internet Explorer. But at least I know what it is, that's what I mean. I'm just glad that browser identifies itself using <code>navigator.appName</code>! That makes it easier, you know.\n");
		
		bv = navigator.appVersion.split(" ")[0];

		messages.push("Now I just need to know your version. You're using Internet Explorer version <strong>" + bv + "</strong>, right? Holy shit, that's an old version!\n");

		messages.push("Wait, wrong again? Are you sure? It says you're using version " + bv + " right in your browser's <code>navigator.appVersion</code> property!\n");
		
		messages.push("Alright, alright. Well, maybe I should look again.\n");
		
		messages.push("Ah, I see the problem. Your browser's <code>navigator.userAgent</code> says " + bv + " is the Mozilla version. But you're not using Mozilla, right? Right. So maybe it just thinks it is Mozilla version " + bv + ". It happens.\n");

		i = navigator.userAgent.indexOf("MSIE");

		bv = navigator.userAgent.substr(i, navigator.userAgent.indexOf(";", i) - i);
		
		messages.push("Well, here's something. Somewhere in the middle of <code>navigator.userAgent</code> there's something that says \"MSIE\" with the number <strong>" + bv + "</strong> next to it. Is that it?\n");
		
		messages.push("It is? It is?! Incredible! Wow, I finally got it right. Man. That was tougher than I expected!\n");

		/*
		// MSIE 9
		appCodeName = "Mozilla" 
		appName = "Microsoft Internet Explorer" 
		appMinorVersion = "0" 
		appVersion = "5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; BOIE9;ENUS)" 
		platform = "Win32" 
		userAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.3; .NET4.0C; BOIE9;ENUS)" 
		*/
	} else {
		brokeJoke();
	}

}

// System
if (showOSpunchline) {
	i = navigator.userAgent.indexOf("Windows NT");
	if (i > 0) {
		sn = navigator.userAgent.substr(i, navigator.userAgent.indexOf(";", i) - i);
		messages.push("Now I only need to know your operating system. That should be easy; your browser's <code>navigator.userAgent</code> will tell me that. That's <strong>" + sn + "</strong>, right?\n");
	}
	
	// No real punchline for OSX or Linux :(
}


// Create final message
document.getElementById("schizo-body").innerHTML = "<p>" + messages.join(" ").split("\n").join("</p><p>") + "</p>";
