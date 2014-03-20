xquery version "1.0-ml";
declare namespace cts="http://marklogic.com/cts";
import module namespace sem = "http://marklogic.com/semantics" at "/Marklogic/semantics.xqy";

let $triples := cts:triples((),(),sem:iri("http://example.org/marklogic/Official/CPO"))
for  $triple in  $triples
	let $node := sem:database-nodes($triple)
	let $replace := <sem:triple>{$node/sem:subject,$node/sem:predicate}<sem:object>http://example.org/marklogic/Official/CEO</sem:object></sem:triple>
return $node ! xdmp:node-replace(., $replace)

,
"

done transfering Business Line/s Responsability"
