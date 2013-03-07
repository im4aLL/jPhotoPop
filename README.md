jPhotoPop
=========

A lightweight jQuery Photo Pop-up plugin with zoom in/out and drag only 6KB.

<ul>
	<li>jPhotoPop.min.js - this have zoom in and out and drag feature</li>
	<li></li>
</ul>

<em>Note: this plug is in development and there is no stable release for this plugin. If you want to use then take the minified version.</em>

<h3>Usage:</h3>

<pre>
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;jPhotoPop/jPhotoPop.css&quot;&gt;

&lt;script type=&quot;text/javascript&quot; src=&quot;jquery-1.8.3.min.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;jPhotoPop/jPhotoPop.js&quot;&gt;&lt;/script&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
	$(document).ready(function(){
		$('a[rel=jPop]').jPhotoPop();
		$('.pop').jPhotoPop({ 'group':true });
	});
&lt;/script&gt;
</pre>

<p>Sample HTML</p>
<pre>
&lt;div class=&quot;demo-wrapper&quot;&gt;
    
	&lt;div style=&quot;clear:both&quot;&gt;&lt;/div&gt;
    &lt;hr&gt;
    
    &lt;p&gt;Single Image:&lt;/p&gt;
    &lt;a href=&quot;images/1.jpg&quot; rel=&quot;jPop&quot;&gt;&lt;img src=&quot;images/1.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    &lt;a href=&quot;images/2.jpg&quot; rel=&quot;jPop&quot;&gt;&lt;img src=&quot;images/2.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    &lt;a href=&quot;images/3.jpg&quot; rel=&quot;jPop&quot;&gt;&lt;img src=&quot;images/3.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    
    &lt;div style=&quot;clear:both&quot;&gt;&lt;/div&gt;
    &lt;hr&gt;
    &lt;p&gt;group Image:&lt;/p&gt;
    &lt;a href=&quot;images/1.jpg&quot; class=&quot;pop&quot;&gt;&lt;img src=&quot;images/1.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    &lt;a href=&quot;images/2.jpg&quot; class=&quot;pop&quot;&gt;&lt;img src=&quot;images/2.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    &lt;a href=&quot;images/3.jpg&quot; class=&quot;pop&quot;&gt;&lt;img src=&quot;images/3.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    &lt;a href=&quot;images/4.jpg&quot; class=&quot;pop&quot;&gt;&lt;img src=&quot;images/4.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    &lt;a href=&quot;images/5.jpg&quot; class=&quot;pop&quot;&gt;&lt;img src=&quot;images/5.jpg&quot; width=&quot;150&quot;&gt;&lt;/a&gt;
    
&lt;/div&gt;
</pre>