xquery version "0.9-ml"

declare namespace apidoc="http://marklogic.com/xdmp/apidoc"

xdmp:set-response-content-type("text/html"),

<html>
	<head></head>
	<body>
	<table vspace="15" align="center">
	<tr><td><p>&nbsp;</p></td></tr>
	
	<tr><td><H3 align="center"><a href="/VSC" target="_parent">Business Activity Monitoring</a></H3></td></tr>
	<tr><td align="center"></td></tr>
			
	<tr><td><p>&nbsp;</p></td></tr>
        </table>
      <table width="90%" align="center" cellpadding="10">
		<tr>
			<th align="center">Products</th>
            <th align="center">Services</th>
            <th align="center">Cloud</th>
		</tr>
		<tr>
			<td>Events Received: {let $play := collection()/*[local-name()='BusinessEvent']/BusinessLine[text()="Product"] return count($play)}</td><td>Events Received: {let $play := collection()/*[local-name()='BusinessEvent']/BusinessLine[text()="Services"] return count($play)}</td><td>Events Received: {let $play := collection()/*[local-name()='BusinessEvent']/BusinessLine[text()="Cloud"] return count($play)}</td>
		</tr>
		<tr>
			<td>Avg. transaction value: {let $play := collection()/*[local-name()='BusinessEvent']/BusinessLine[text()="Product"] return count($play)}</td><td>Avg. transaction value: {let $play := collection()/*[local-name()='BusinessEvent']/BusinessLine[text()="Services"] return count($play)}</td><td>Avg. transaction value: {let $play := collection()/*[local-name()='BusinessEvent']/BusinessLine[text()="Cloud"] return count($play)}</td>
		</tr>
		
		<tr>
			<td>SLA Violations: 0</td><td>SLA Violations: 0</td><td>SLA Violations: 0</td>
		</tr>
		<tr>
			<td>SLA Warnings: 0</td><td>SLA Warnings: 0</td><td>SLA Warnings: 1</td>
		</tr>
		<tr>
			<td>Avg. duration: N/A</td><td>Avg. duration: N/A</td><td>Avg. duration: N/A</td>
		</tr>
		<tr>
			<td>Std. deviation: 5%</td><td>Std. deviation: 30%</td><td>Std. deviation: 1%</td>
		</tr>	 	 
<!--
		<tr>
			<td></td><td></td><td></td>
		</tr>	 	 
  -->
		<tr>
			<td>Event Detail</td><td>Event Detail</td><td>Event Detail</td>
		</tr>	 	 

		<tr>
		
			<td valign="top" style="text-indent: -15">{for $play in collection()/*[local-name()='BusinessEvent'][BusinessLine="Product"]/OrderID return
			<li><a href="http://localhost:8822/v1/documents?uri=/Events/Event_{$play/text()}.xml" target="_blank">{$play/text()}</a></li>}</td>
			
			<td valign="top" style="text-indent: -15">{for $play in collection()/*[local-name()='BusinessEvent'][BusinessLine="Services"]/OrderID return
			<li><a href="http://localhost:8822/v1/documents?uri=/Events/Event_{$play/text()}.xml" target="_blank">{$play/text()}</a></li>}</td>
			
			<td valign="top" style="text-indent: -15">{for $play in collection()/*[local-name()='BusinessEvent'][BusinessLine="Cloud"]/OrderID return
			<li><a href="http://localhost:8822/v1/documents?uri=/Events/Event_{$play/text()}.xml" target="_blank">{$play/text()}</a></li>}</td>
		  
		</tr>
	 
	  
	
	  </table>

	</body>
</html>