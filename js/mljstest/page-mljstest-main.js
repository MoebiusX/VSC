

window.onload = function() {
  // initialise mljs
  var db = new mljs(); // calls default configure
  db.logger.setLogLevel("debug");
  
  var error = new com.marklogic.widgets.error("errors");
  
  try {
  
  var logel = document.getElementById("log");
  var log = function(msg) {
    logel.innerHTML = "<p>" + msg + "</p>" + logel.innerHTML;
  };
  
  // check if db needs initialising
  
  var ob = db.createOptions();
  ob.pageLength(100);
  ob.collection().returnResults(false);
  var options = ob.toJson();
  
  var optionsName = "mldbtest-content-options";
  
  var qb = new db.query();
  qb.query(qb.collection("testdata"));
  var query = qb.toJson();
  
  var tripcheck = function() {
    log("Checking for sample triple graphs");
    
    var alldone = function() {
      log("ALL DONE. Click on one of the links above to use the demonstration.");
    };
    
    db.graph("mljs-test-graph-1", function(result) {
      if (result.inError) {
        log(" - Test graphs do not exist. Creating.");
        
        var triples1 = [
          {subject: "http://marklogic.com/semantic/targets/people/adam", predicate: "likes", object: "http://marklogic.com/semantic/targets/foodstuffs/cheese"},
          {subject: "http://marklogic.com/semantic/targets/people/adam", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://xmlns.com/foaf/0.1/Person"},
          {subject: "http://marklogic.com/semantic/targets/people/adam", predicate: "http://xmlns.com/foaf/0.1/name", string: "Adam Fowler", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/foodstuffs/cheese", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://marklogic.com/semantic/rdfTypes/foodstuff"},
          {subject: "http://marklogic.com/semantic/targets/foodstuffs/cheese", predicate: "foodname", string: "Cheese", locale: "en"},
          {subject: "/mixed/4", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://marklogic.com/semantics/ontology/Document"},
          {subject: "/mixed/4", predicate: "http://marklogic.com/semantics/ontology/Document#uri", string: "/mixed/4", locale: "en"}
        ];
        
        var triples2 = [
          {subject: "http://marklogic.com/semantic/targets/people/adam", predicate: "http://xmlns.com/foaf/0.1/knows", object: "http://marklogic.com/semantic/targets/people/wendy"},
          {subject: "http://marklogic.com/semantic/targets/people/wendy", predicate: "http://xmlns.com/foaf/0.1/knows", object: "http://marklogic.com/semantic/targets/people/adam"},
          {subject: "http://marklogic.com/semantic/targets/people/adam", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://xmlns.com/foaf/0.1/Person"},
          {subject: "http://marklogic.com/semantic/targets/people/wendy", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://xmlns.com/foaf/0.1/Person"},
          {subject: "http://marklogic.com/semantic/targets/people/wendy", predicate: "http://xmlns.com/foaf/0.1/name", string: "Wendy Fowler", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/people/wendy", predicate: "likes", object: "http://marklogic.com/semantic/targets/foodstuffs/cheese"},
          {subject: "http://marklogic.com/semantic/targets/people/wendy", predicate: "mentioned_in", object: "/mixed/4"},
          {subject: "http://marklogic.com/semantic/targets/foodstuffs/cheese", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://marklogic.com/semantic/rdfTypes/foodstuff"},
          {subject: "http://marklogic.com/semantic/targets/foodstuffs/cheese", predicate: "foodname", string: "Cheese", locale: "en"}
        ];
        
        var triples3 = [
          {subject: "http://marklogic.com/semantic/targets/movies/1", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://marklogic.com/semantic/rdfTypes/movie"},
          {subject: "http://marklogic.com/semantic/targets/movies/1", predicate: "hastitle", string: "The Goonies", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/1", predicate: "hasactor", string: "Sean Astin", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/1", predicate: "hasgenre", string: "Comedy", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/1", predicate: "releasedin",  number: 1985},
          {subject: "http://marklogic.com/semantic/targets/movies/2", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://marklogic.com/semantic/rdfTypes/movie"},
          {subject: "http://marklogic.com/semantic/targets/movies/2", predicate: "hastitle", string: "Teenage Mutant Ninja Turtles", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/2", predicate: "hasactor", string: "Sean Astin", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/2", predicate: "hasgenre", string: "Adventure", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/2", predicate: "releasedin",  number: 2013},
          {subject: "http://marklogic.com/semantic/targets/movies/3", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://marklogic.com/semantic/rdfTypes/movie"},
          {subject: "http://marklogic.com/semantic/targets/movies/3", predicate: "hastitle", string: "Kick-Ass 2", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/3", predicate: "hasactor", string: "Jim Carrey", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/3", predicate: "hasgenre", string: "Comedy", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/3", predicate: "releasedin",  number: 2013},
          {subject: "http://marklogic.com/semantic/targets/movies/4", predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type", object: "http://marklogic.com/semantic/rdfTypes/movie"},
          {subject: "http://marklogic.com/semantic/targets/movies/4", predicate: "hastitle", string: "The Number 23", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/4", predicate: "hasactor", string: "Jim Carrey", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/4", predicate: "hasgenre", string: "Drama", locale: "en"},
          {subject: "http://marklogic.com/semantic/targets/movies/4", predicate: "releasedin",  number: 2007}
        ];
        
        db.saveGraph(triples1,"mljs-test-graph-1",function(result) {
          if (result.inError) {
            log("ERROR creating test graph 1: " + result.detail);
          } else {
            log(" - Created test graph 1");
            
            db.saveGraph(triples2,"mljs-test-graph-2",function(result) {
              if (result.inError) {
                log("ERROR creating test graph 2: " + result.detail);
              } else {
                log(" - Created test graph 2");
                
                db.saveGraph(triples3,"mljs-test-graph-3",function(result) {
                  if (result.inError) {
                    log("ERROR creating test graph 3: " + result.detail);
                  } else {
                    log(" - Created test graph 3");
                    alldone();
                  }
                });
              }
            });
          }
        });
      } else {
        alldone();
      }
    });
  };
  
  var doload = function() {
    logel.innerHTML = "";
    
    log("Installing search options...");
    var ob1 = db.createOptions();
    ob1.defaultCollation("http://marklogic.com/collation/en")
      .pageLength(100)
      .collectionConstraint() // default constraint name of 'collection' 
      .jsonRangeConstraint("animal",["item-order"]) // constraint name defaults to that of the range element name 
      .jsonRangeConstraint("family",["item-frequency"]); // constraint name defaults to that of the range element name 
    
    var ob2 = db.createOptions();
    ob2.tuples("actor-year","actor","year"); // first is tuple name. defaults to string, json namespace
    var ob3 = db.createOptions();
    ob3.tuples("actor-genre","actor","genre"); // first is tuple name. defaults to string, json namespace
    var ob4 = db.createOptions();
    ob4.defaultCollation("http://marklogic.com/collation/en")
      .collectionConstraint() // default constraint name of 'collection' 
      .jsonRangeConstraint("animal",["item-order"]) // constraint name defaults to that of the range element name 
      .jsonRangeConstraint("family",["item-frequency"]) // constraint name defaults to that of the range element name 
      .jsonRangeConstraint("actor","xs:string","http://marklogic.com/collation/",["item-frequency"])
      .jsonRangeConstraint("year","xs:string","http://marklogic.com/collation/",["item-order"])
      .jsonRangeConstraint("city","xs:string","http://marklogic.com/collation/",["item-order"])
      .jsonRangeConstraint("month","xs:string","http://marklogic.com/collation/",["item-order"])
      .rangeConstraint("Title","title","http://www.w3.org/1999/xhtml","xs:string","http://marklogic.com/collation/",true)
      .rangeConstraint("Heading","h1","http://www.w3.org/1999/xhtml","xs:string","http://marklogic.com/collation/",true)
      .jsonRangeConstraint("stars","xs:int")
      .rangeConstraint("DateReceived","datereceived","http://marklogic.com/ns/dt","xs:date",null,true)
      .annotate("DateReceived","Received On")
      .geoElementPairConstraint("location","location","http://marklogic.com/xdmp/json/basic",
        "lat","http://marklogic.com/xdmp/json/basic","lon","http://marklogic.com/xdmp/json/basic");
    
    var alloptions = [
      "page-charts-search",ob1.toJson(),
      "actor-genre",ob3.toJson(),
      "actor-year",ob2.toJson(),
      "mljstest-page-search-options",ob4.toJson()
    ];
    
    var saveCount = 0;
    var nextSave0 = function() {
      if (saveCount == alloptions.length) {
        complete0();
      } else {
        db.saveSearchOptions(alloptions[saveCount],alloptions[saveCount + 1], function(result) {
          saveCount+=2;
          nextSave0();
        });
      }
    };
  
    var complete0 = function() {
      log("- Done.");
    
    
      log("Checking database for required indexes...");
      
      
      var donefunc = function(result) {
        // check result doc
        var indexes = result.doc["index-summaries"]["index-summary"];
        var missing = new Array();
        for (var i = 0;i < indexes.length;i++) {
          log("- Found index: " + JSON.stringify(indexes[i]));
          if (indexes[i].complete == "false") {
            missing.push(indexes[i]);
          }
        }
        
        if (missing.length > 0) {
          for (var i = 0;i < missing.length;i++) {
            var s = "- *** MISSING INDEX: " + JSON.stringify(missing[i]);
            /*
            if (undefined != missing[i].range) {
              s += "Range: Type: " + missing[i].range.type;
              if (undefined != missing[i].range["path-index"]) {
                
              }
              if (undefined != missing[i].range["element"]) {
                s += " Element: " + JSON
              }
            }
            */
            log(s);
          }
          log("- Abandoning content set up. Create indexes below then refresh page.");
          log("- NB for json-key, create an Element Range Index with the namespace http://marklogic.com/xdmp/json/basic and the local name the same as the json-key value, and the root collation (http://marklogic.com/collation/).");
          
        } else {
          log("- Done. All indexes present and correct");
        
        // if not indexes, then report index issues and stop processing
        
        // if indexes here, continue with checking content
    
          log("Adding test content to database...");
          log("[1 of 7] Adding temperature test data...");
          
          
          // save then get doc
          var docs = [
            {city: "Samsung", month: "Jan", reading: { temp: 1033}},
            {city: "Samsung", month: "Feb", reading: { temp: 2233}},
            {city: "Samsung", month: "Mar", reading: { temp: 3333}},
            {city: "Samsung", month: "Apr", reading: { temp: 3444}},
            {city: "Samsung", month: "May", reading: { temp: 3566}},
            {city: "Samsung", month: "Jun", reading: { temp: 5500}},
            {city: "Samsung", month: "Jul", reading: { temp: 6747}},
            {city: "Samsung", month: "Aug", reading: { temp: 7222}},
            {city: "Samsung", month: "Sep", reading: { temp: 8888}},
            {city: "Samsung", month: "Oct", reading: { temp: 9100}},
            {city: "Samsung", month: "Nov", reading: { temp: 9200}},
            {city: "Samsung", month: "Dec", reading: { temp: 9788}},
            {city: "LG", month: "Jan", reading: { temp: 3033}},
            {city: "LG", month: "Feb", reading: { temp: 5233}},
            {city: "LG", month: "Mar", reading: { temp: 7333}},
            {city: "LG", month: "Apr", reading: { temp: 8444}},
            {city: "LG", month: "May", reading: { temp: 7566}},
            {city: "LG", month: "Jun", reading: { temp: 5500}},
            {city: "LG", month: "Jul", reading: { temp: 3747}},
            {city: "LG", month: "Aug", reading: { temp: 5222}},
            {city: "LG", month: "Sep", reading: { temp: 7888}},
            {city: "LG", month: "Oct", reading: { temp: 8100}},
            {city: "LG", month: "Nov", reading: { temp: 7200}},
            {city: "LG", month: "Dec", reading: { temp: 5788}},
            {city: "Dell", month: "Jan", reading: { temp: 33}},
            {city: "Dell", month: "Feb", reading: { temp: 40}},
            {city: "Dell", month: "Mar", reading: { temp: 44}},
            {city: "Dell", month: "Apr", reading: { temp: 55}},
            {city: "Dell", month: "May", reading: { temp: 66}},
            {city: "Dell", month: "Jun", reading: { temp: 99}},
            {city: "Dell", month: "Jul", reading: { temp: 180}},
            {city: "Dell", month: "Aug", reading: { temp: 210}},
            {city: "Dell", month: "Sep", reading: { temp: 1700}},
            {city: "Dell", month: "Oct", reading: { temp: 7000}},
            {city: "Dell", month: "Nov", reading: { temp: 9993}},
            {city: "Dell", month: "Dec", reading: { temp: 14044}},
			{city: "Motorola", month: "Jan", reading: { temp: 20033}},
            {city: "Motorola", month: "Feb", reading: { temp: 19040}},
            {city: "Motorola", month: "Mar", reading: { temp: 1444}},
            {city: "Motorola", month: "Apr", reading: { temp: 1555}},
            {city: "Motorola", month: "May", reading: { temp: 9966}},
            {city: "Motorola", month: "Jun", reading: { temp: 2299}},
            {city: "Motorola", month: "Jul", reading: { temp: 3801}},
            {city: "Motorola", month: "Aug", reading: { temp: 6210}},
            {city: "Motorola", month: "Sep", reading: { temp: 1700}},
            {city: "Motorola", month: "Oct", reading: { temp: 7000}},
            {city: "Motorola", month: "Nov", reading: { temp: 4493}},
            {city: "Motorola", month: "Dec", reading: { temp: 044}}
          ];  
          saveCount = 0;
          var nextSave1 = function() {
            if (saveCount == docs.length) {
              complete1();
            } else {
              db.save(docs[saveCount],"/temp/" + (saveCount+1),{collection: "temperatures,testdata"}, function(result) {
                saveCount++;
                nextSave1();
              });
            }
          };
  
          var complete1 = function() {
            log("- Done.");
            log("[2 of 7] Adding movie test data...");
            
            docs = [
              {title: "The Goonies",actor: "Sean Astin", genre: "Comedy", year: "1985"},
              {title: "50 First Dates",actor: "Sean Astin", genre: "Comedy", year: "2004"},
              {title: "Kingdom Hearts",actor: "Sean Astin", genre: "Comedy", year: "2002"},
              {title: "The Sky Is Falling",actor: "Sean Astin", genre: "Comedy", year: "2001"},
              {title: "Dorothy and the Witches of Oz",actor: "Sean Astin", genre: "Fantasy", year: "2012"},
              {title: "The Lord of the Rings: The Return of the King",actor: "Sean Astin", genre: "Fantasy", year: "2003"},
              {title: "The Lord of the Rings: The Two Towers",actor: "Sean Astin", genre: "Fantasy", year: "2002"},
              {title: "The Lord of the Rings: The Fellowship of the Ring",actor: "Sean Astin", genre: "Fantasy", year: "2001"},
              {title: "Teenage Mutant Ninja Turtles",actor: "Sean Astin", genre: "Adventure", year: "2013"},
              {title: "Dumb and Dumber To",actor: "Jim Carrey", genre: "Comedy", year: "2014"},
              {title: "Kick-Ass 2",actor: "Jim Carrey", genre: "Comedy", year: "2013"},
              {title: "Mr. Popper's Penguins",actor: "Jim Carrey", genre: "Comedy", year: "2011"},
              {title: "I Love You Philip Morris",actor: "Jim Carrey", genre: "Comedy", year: "2009"},
              {title: "Ace Ventura: When Nature Calls",actor: "Jim Carrey", genre: "Comedy", year: "1995"},
              {title: "Ace Ventura: Pet Detective",actor: "Jim Carrey", genre: "Comedy", year: "1994"},
              {title: "A Christmas Carol",actor: "Jim Carrey", genre: "Drama", year: "2009"},
              {title: "The Number 23",actor: "Jim Carrey", genre: "Drama", year: "2007"}
            ];
            saveCount = 0;
            var nextSave2 = function() {
              if (saveCount == docs.length) {
                complete2();
              } else {
                db.save(docs[saveCount],"/movies/" + (saveCount+1),{collection: "movies,testdata"}, function(result) {
                  saveCount++;
                  nextSave2();
                });
              }
            };
  
            var complete2 = function() {
              log("- Done.");
              log("[3 of 7] Adding animals test data...");
              
              docs = [
                {title: "Polly the Penguin", summary: "Penguins are awesome", animal: "penguin", family: "bird", age: 15},
                {title: "Olly the Ostrich", summary: "Tasty and lean", animal: "ostrich", family: "bird", age: 12},
                {title: "Dave the MarkLogician", summary: "Sir Dave of Vanguard", animal: "homosapien", family: "marklogician",age: 21},
                {title: "Eric the MarkLogician", summary: "Sir Eric of the Community", animal: "homosapien", family: "marklogician", age: 21},
                {title: "Dilbert the Dog", summary: "Dogs are cool", animal: "dog", family: "pet", age: 7},
                {title: "Dogbert the Dog", summary: "I feel woof", animal: "dog", family: "pet", age: 3},
                {title: "Dizzie the Dog", summary: "Which way d'he go?", animal: "dog", family: "pet", age: 9},
                {title: "Charlie the Cat", summary: "Cats are boring", animal: "cat", family: "pet", age: 6},
                {title: "Hammy the Hamster", summary: "Do dah dee dee do dah do do", animal: "hamster", family: "pet", age: 3},
                {title: "Hetty the Hamster", summary: "He he he he he", animal: "hamster", family: "pet", age: 4},
                {title: "George the Gerbil", summary: "Tiny", animal: "gerbil", family: "pet", age:1},
                {title: "Gregory the Guinea Pig", summary: "Only live a couple of years", animal: "guinea pig", family: "pet", age: 5},
                {title: "Adam the MarkLogician", summary: "Adam has no imagination", animal: "homosapien", family: "marklogician", age: 21}
              ];
              
              // TODO save hurtbat.svg
              
              saveCount = 0;
              var nextSave3 = function() {
                if (0 == docs.length || saveCount == docs.length) {
                  complete3();
                } else {
                  db.save(docs[saveCount],"/animals/" + (saveCount+1),{collection: "animals,testdata"}, function(result) {
                    saveCount++;
                    nextSave3();
                  });
                }
              };
  
              var complete3 = function() {
                log("- Done.");
              
                log("[4 of 7] Adding semantic test data...");
                log("- N/A - no semantic data adding script written yet.");
                
                log("[5 of 7] Adding plain text test data...");
              
                docs = [
                  "There once was a poet named Fred.",
                  "Who wrote poems until he was dead.",
                  "They picked up his pencil.",
                  "And found his poem stencil.",
                  "And realised he had ran out of lead."
                ];
              
                saveCount = 0;
                var nextSave5 = function() {
                  if (0 == docs.length || saveCount == docs.length) {
                    complete5();
                  } else {
                    db.save(docs[saveCount],"/plaintext/" + (saveCount+1),{collection: "plaintext,testdata"}, function(result) {
                      saveCount++;
                      nextSave5();
                    });
                  }
                };
  
                var complete5 = function() {
                  log("- Done.");
                  log("[6 of 7] Adding mixed test data...");
              
                  docs = [
                    /*"I am a plain text file",*/
                    textToXML("<documentelement><title>I am an XML file</title><summary>Some XML summary</summary><dt:datereceived xmlns:dt='http://marklogic.com/ns/dt'>2013-01-25</dt:datereceived></documentelement>"),
                    textToXML("<documentelement2><name>I am a generic XML file</name><desc>Generic XML description</desc><dt:datereceived xmlns:dt='http://marklogic.com/ns/dt'>2013-01-18</dt:datereceived></documentelement2>"),
                    textToXML("<documentelement3><wibble>Generic XML wibble file</wibble><flibble>Generic XML flibble element</flibble><dt:datereceived xmlns:dt='http://marklogic.com/ns/dt'>2013-02-14</dt:datereceived></documentelement3>"),
                    textToXML("<html xmlns='http://www.w3.org/1999/xhtml'><head><title>XHTML test doc</title><meta name='Author' content='Adam Fowler'/></head><body><h1>XHTML doc h1</h1><p>Lorem ipsum dolar sit amet</p><h2>Consecutor</h2><p>Wibble de flibble</p></body></html>"),
                    {title: "Some JSON title", summary: "Some JSON summary"},
                    {name: "Generic JSON name", desc: "Generic JSON description"}
                  ];
              
                  saveCount = 0;
                  var nextSave6 = function() {
                    if (0 == docs.length || saveCount == docs.length) {
                      complete6();
                    } else {
                      db.save(docs[saveCount],"/mixed/" + (saveCount+1),{collection: "mixed,testdata"}, function(result) {
                        saveCount++;
                        nextSave6();
                      });
                    }
                  };
  
                  var complete6 = function() {
                    log("- Done.");
                    
                    log("[7 of 7] Adding tourist attractions test data...");
                    // get points using address search at http://itouchmap.com/latlong.html - NB uses EPSG:900913 NOT WGS84(EPSG:4326)???
                    docs = [
                      {title: "Tower of London", location:{ lat: 51.508112,lon: -0.075949},stars: 4, description: "Home of the Crown Jewels"},
                      {title: "Houses of Parliament", location:{ lat:51.499503 ,lon: -0.124357},stars: 3, description: "Seat of power"},
                      {title: "Buckingham Palace", location:{ lat: 51.501364,lon: -0.141890},stars: 3, description: "Tours available"},
                      {title: "London Zoo", location:{ lat: 51.535736,lon: -0.155679},stars: 2, description: "Off the map, far from center."},
                      {title: "St Paul's Cathedral", location:{ lat: 51.513679,lon: -0.099560},stars: 2, description: "Big Cathedral"},
                      {title: "The London Eye", location:{ lat: 51.503400,lon: -0.119519},stars: 5, description: "Great views"},
                      {title: "Oxford Street", location:{ lat: 51.515220,lon: -0.141880},stars: 3, description: "Lots of Shops"}
                    ];
                    
                    saveCount = 0;
                    var nextSave7 = function() {
                      if (0 == docs.length || saveCount == docs.length) {
                        complete7();
                      } else {
                        db.save(docs[saveCount],"/attractions/" + (saveCount+1),{collection: "attractions,testdata"}, function(result) {
                          saveCount++;
                          nextSave7();
                        });
                      }
                    };
    
                    var complete7 = function() {
                      log("- Done.");
                  
                      tripcheck();
                    };
                    
                    log("- Saving " + docs.length + " documents...");
                    nextSave7();
                  };
                
                  log("- Saving " + docs.length + " documents...");
                  nextSave6();
                };
                
                log("- Saving " + docs.length + " documents...");
                nextSave5();
                
                
              }; // end complete 3
              
              log("- Saving " + docs.length + " documents...");
              nextSave3();
              
            }; // end complete 2
            
  
            log("- Saving " + docs.length + " documents...");
            nextSave2();
            
          } // end complete1
  
          log("- Saving " + docs.length + " documents...");
          nextSave1();
          
        }
        
      };
      
        
      db.indexes(donefunc);
    };
    
    nextSave0();
  };
  
  db.saveSearchOptions(optionsName,options,function(result) {
    db.structuredSearch(query,optionsName,function(result) {
      if (result.inError) {
        log("Error searching for test content:-");
      } else {
        log("Found " + result.doc.results.length + " documents in 'testdata' collection");
        if (result.doc.results.length == 74) {
          tripcheck();
          log("We have testdata - not adding more data to test database. End. Click on a link above to test mljs.");
        } else {
          doload();
        }
      }
    });
  });
  
  document.getElementById("forcereload").onclick = function(e) {
    doload();
  };
  
  } catch (err) {
    error.show(err.message);
  }
};