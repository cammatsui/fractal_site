// Based "Node.js in Action"
// Modified 2015-01-16 by Andy Anderson <aanderson@amherst.edu> to simplify it.

var http = require('http');	// server library — built-in
var fs = require('fs');		// file system library — built-in
var mime = require('mime');	// MIME file-type library — add-in

// Create a web server that, when a page request comes in,
// e.g. "http://localhost:3000/index.html",
// passes it to a callback function to generate a response:

var server = http.createServer(    
    function(request, response)
    {
       var filePath = '.' + (request.url == '/' ? '/index.html' : request.url);
       console.log(request.url, filePath);

        // Check the file status:
        fs.exists(filePath,
            function(exists)
            {
                if (exists)
                    fs.readFile(filePath,
                        function(error, data)
                        {
                            if (error)
                            {
                                response.writeHead(500, 
                                    { 'Content-Type': 'text/plain' });
                                response.end('Error 500: Internal Server Error');
                            }
                            else
                            {
                                response.writeHead(200,
                                    { 'Content-Type':  mime.getType(filePath),
                                      'Content-Length': data.length });
                                response.end(data);
                            }
                        }
                    );
                else
                {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Error 404: resource not found.');
                }
            }
        );
    }
);

// Start up the web server:
server.listen(3000, function() { console.log("Server listening on port 3000."); } );
