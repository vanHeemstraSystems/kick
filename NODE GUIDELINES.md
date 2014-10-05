NODE GUIDELINES

1) To check your current version of Node.
<pre>
	$node -v
	v0.6.12
</pre>
2) To clear your npm cache.
<pre>
	sudo npm cache clean -f
</pre>
3) Install 'n'.
<pre>
	sudo npm install -g n
</pre>
4) Upgrade to a later version (this step can take a while). You can specify a particular version, like so:
<pre>
	sudo n 0.8.11
</pre>
	Or you can just tell the manager to install the latest stable version, like so:
<pre>
	sudo n stable
</pre>
5) Check the running version of Node to verify that it has worked:
<pre>
	$node -v
	v0.8.11
</pre>
If in step 5 the version doesn't output the number that you were expecting, you may need to reboot.
