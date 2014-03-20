xquery version "0.9-ml"
(:
 : start.xqy  display the plays by category
 :
 : Copyright (c)2002-2008 Mark Logic Corporation. All Rights Reserved.
 :
 : Licensed under the Apache License, Version 2.0 (the "License");
 : you may not use this file except in compliance with the License.
 : You may obtain a copy of the License at
 :
 : http://www.apache.org/licenses/LICENSE-2.0
 :
 : Unless required by applicable law or agreed to in writing, software
 : distributed under the License is distributed on an "AS IS" BASIS,
 : WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 : See the License for the specific language governing permissions and
 : limitations under the License.
 :
 : The use of the Apache License does not indicate that this project is
 : affiliated with the Apache Software Foundation.
 :
 :)

declare namespace apidoc="http://marklogic.com/xdmp/apidoc"

xdmp:set-response-content-type("text/html"),

<html>
	<head></head>
	<body>
	<table vspace="20" align="center">
	<tr><td><p>&nbsp;</p></td></tr>
	
	<tr><td><H2 align="center">Business Activity Monitoring</H2></td></tr>
	<tr><td align="center">
			<a href="/VSC" target="_parent"><img src="VSC_BM.jpeg" alt="Business Model" align="top"/></a></td></tr>
			
	<tr><td><p>&nbsp;</p></td></tr>
        </table>
      <table width="90%" align="center" cellpadding="10">
                         <tr><th align="center">Products</th>
                             <th align="center">Services</th>
                             <th align="center">Cloud</th></tr>
      <tr><td valign="top" style="text-indent: -15">{
      for $play in collection()/*[local-name()='json']
      return
      <li>{$play/*[local-name()='id']/text()}</li>
         
      }</td>
      <td valign="top" style="text-indent: -15">{
      for $play in xdmp:directory("/shakespeare/plays/")
      where $play/property::playtype/text() eq "TRAGEDY"
      order by $play/PLAY/TITLE/text()
      return
      <li><a href="displayScene.xqy?fname={fn:base-uri($play)}&drama=true">{
          normalize-space(string-join($play/PLAY/TITLE/text(), "") )}</a>
          </li>
         
      }</td>
      <td valign="top" style="text-indent: -15">{
      for $play in xdmp:directory("/shakespeare/plays/")
      where $play/property::playtype/text() eq "HISTORY"
      order by $play/PLAY/TITLE/text()
      return
      <li><a href="displayScene.xqy?fname={fn:base-uri($play)}&drama=true">{
          normalize-space(string-join($play/PLAY/TITLE/text(), "") )}</a>
          </li>
         
      }</td></tr></table>

	</body>
</html>

