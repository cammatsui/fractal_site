 # Fractal Site

This repository contains code written by Cameron Matsui from the 2021-2022 school year at Amherst College for the Fractal Geometry class at Amherst College, which is taught by Professor Amanda Folsom.

Oren Tirschwell began work on the code in the 2022-2023 fall semester. Oren is the current sole author of code in this repository.

The live code for the Fractal Geometry software can be found [on Professor Folsom's Website](https://afolsom.people.amherst.edu/fractalgeometry/).

## Setup

Below, I outline the process to set up a local testing framework for this repository.

1. Please note the presence of the `server.js` file inside of the `fractals` folder.
2. [Download `node.js`](https://nodejs.org/en/download/) if you do not already have it installed on your machine.
3. Open a terminal (Mac) or command line (Windows). `cd` into the `public` folder inside of this repository.
4. Run the command `npm install mime`. This will install the `mime` library that is used by the `server.js` file.
5. Still in your shell environment, and inside of this folder, run the command `node server.js`. Confirm that the output message reads, `Server listening on port 3000.`
6. Open a web browser of your choosing. Navigate to the link, [http://localhost:3000/index.html](http://localhost:3000/index.html). This should contain your local test server! (Please consider bookmarking this URL, so you can access it more easily in the future.)
7. When you make any changes in the local code, reload the web browser and the new code changes will be updated instantly. (Just make sure to save your code.)
8. When you finish making your changes for a session, navigate back to the shell environment and type command-C for a mac, control-C for Windows. This will terminate the local server.


*Documentation of setup instructions* provided by IT can be found [here](https://www.ats.amherst.edu/software/web/interactive/#YourOwnWebServerNodejs). Oren Tirschwell collaborated with Andy Anderson on this set of instructions.

*Local testing framework alternative*: This has not been cleared as secure by IT, but there is a VS Code extension, [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), which seems as though it could potentially replace this `npm`/`node` framework. It could be much simpler, and should be explored in the future.

*Testing on a live web server*: It may be preferable to test the code on a live, web-based `https` page. This would allow you to share a url with someone to view and test any new features or updates, which is great to do before pushing to the live version of the software.
The easiest way to do this is through your Amherst server website. If you do not have this set up, contact IT to get it set up. If you do, you can just drop this entire set of files inside of the `www/html` folder in your web-based server folders.