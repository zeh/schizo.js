schizo.js
=========

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
