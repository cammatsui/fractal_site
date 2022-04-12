//======================================================================================================================
/**
 * @file rand-ifs-app.ts
 * @author Cameron Matsui (cmatsui22@amherst.edu)
 * @date February 2022.
 */
// IMPORTS
import { RandomIFS } from '../fractals/rand-ifs.js';
import { ProbabilityAffineTable } from './interfaces/affine-table.js';
import { WindowTable } from './interfaces/window-table.js';
import { Animator } from '../etc/animation.js';
import { presetIFS } from '../etc/preset-ifs.js';
import { PointCanvas } from './interfaces/point-canvas.js';
//======================================================================================================================
//======================================================================================================================
// SETUP
//======================================================================================================================
// Calculate the max dimension for the fractal canvas.
const maxDimension = Math.floor(Math.min(window.innerWidth * .85, window.innerHeight * .85));
// Setup the fractal canvas.
const fractalCanvas = document.getElementById('fractal-canvas');
fractalCanvas.height = maxDimension;
fractalCanvas.width = maxDimension;
const ctx = fractalCanvas.getContext("2d");
// Setup the affine table and window table.
const affineTable = new ProbabilityAffineTable(document.getElementById("affineTable"));
const windowTable = new WindowTable(document.getElementById("windowTable"));
// Get the number of points.
let pointsSlider = document.getElementById("dotsRange");
pointsSlider.value = "50";
// Get the checkbox which determines whether or not to start with a fixed point.
let checkBox = document.getElementById('useFixed');
checkBox.checked = true;
// The HTML tag to display the mouse hover coordinates.
let pointTag = document.getElementById("mouseCoords");
// Create the ifs and the point canvas.
let ifs = new RandomIFS(fractalCanvas, affineTable, getNumPoints(), windowTable.getWindowBounds(), null);
let pointCanvas = new PointCanvas(fractalCanvas, false, pointTag, windowTable);
// Describes whether the canvas is in pick point or IFS mode.
let pickPoint = false;
// Setup the animation.
let iterationsHTML = document.getElementById("numIters");
let animateButton = document.getElementById("animate");
let animator = new Animator(ifs, animateButton, "", iterationsHTML);
//======================================================================================================================
// END SETUP
//======================================================================================================================
//======================================================================================================================
// BUTTON FUNCTIONS & HELPERS
//======================================================================================================================
//==================================================================================================================
/**
 * Reset the IFS, animator, fractal canvas, and iterations tag.
 */
function resetIFS() {
    if (animator.isAnimating())
        animator.toggleAnimation();
    ctx.clearRect(0, 0, fractalCanvas.height, fractalCanvas.width);
    iterationsHTML.innerHTML = "Iterations: 0";
    // If use fixed point is checked, we don't need to change the canvas state to pickPoint.
    if (useFixedPoint()) {
        pickPoint = false;
        calibrateCanvasState();
        return;
    }
    // Otherwise, change to pickpoint.
    pickPoint = true;
    calibrateCanvasState();
} // resetIFS ()
//==================================================================================================================
//==================================================================================================================
/**
 * Calibrate the canvas state from in the IFS to picking a point, or vice versa.
 */
function calibrateCanvasState() {
    if (!pickPoint) {
        // Set the ifs; enable buttons; disable point canvas.
        ifs = new RandomIFS(fractalCanvas, affineTable, getNumPoints(), windowTable.getWindowBounds(), pointCanvas.getPoint());
        animator = new Animator(ifs, animateButton, "", iterationsHTML);
        pointCanvas.disable();
    }
    else {
        // Enable the point canvas.
        pointCanvas.reset();
        pointCanvas.enable();
    }
} // swapCanvasState ()
//==================================================================================================================
//==================================================================================================================
/**
 * The function to call for the run iteration button.
 */
function runIterationButtonFunction() {
    if (pickPoint && pointCanvas.isClicked()) {
        // If in pickPoint, but the canvas has been clicked, i.e., a starting point has been picked,
        // create the IFS and run the iteration.
        pickPoint = false;
        calibrateCanvasState();
        animator.runIterationWithCooldown();
    }
    else if (!pickPoint) {
        // If not in pickPoint, just run an iteration.
        animator.runIterationWithCooldown();
    }
    else {
        // If in pickPoint but the canvas has not yet been clicked, aler the user to pick a point.
        alert("Pick a starting point before iterating.");
    }
} // runIterationButtonFunction ()
//==================================================================================================================
//==================================================================================================================
/**
 * The function to call for the animate button.
 */
function animateButtonFunction() {
    if (pickPoint && pointCanvas.isClicked()) {
        // If in pickPoint, but the canvas has been clicked, i.e., a starting point has been picked,
        // create the IFS and start the animation.
        pickPoint = false;
        calibrateCanvasState();
        animator.toggleAnimation();
    }
    else if (!pickPoint) {
        // If not in pickPoint, just start the animation.
        animator.toggleAnimation();
    }
    else {
        // If in pickpoint but the canvas has not yet been clicked, alert the user to pick a point.
        alert("Pick a starting point before animating.");
    }
} // animateButtonFunction ()
//==================================================================================================================
//==================================================================================================================
/**
 * Get the number of points from the slider.
 */
function getNumPoints() {
    return +pointsSlider.value;
} // getNumPoints ()
//==================================================================================================================
//==================================================================================================================
/**
 * Load the preset with the given name from the "preset-ifs.js" file.
 */
function getPreset(name) {
    let preset = presetIFS[0];
    presetIFS.every(presetEntry => {
        if (presetEntry.name == name) {
            preset = presetEntry;
            return false;
        }
        return true;
    });
    return preset;
} // getPreset ()
//==================================================================================================================
//==================================================================================================================
/**
 * Set the tables to a preset.
 */
function setPresetIFS(preset) {
    affineTable.applyPreset(preset.ifs);
    windowTable.applyPreset(preset.window);
} // setPresetIFS ()
//==================================================================================================================
//==================================================================================================================
/**
 * Whether or not to use a fixed point for the IFS.
 */
function useFixedPoint() {
    return checkBox.checked;
} // useFixedPoint ()
//==================================================================================================================
//======================================================================================================================
// END BUTTON FUNCTIONS & HELPERS
//======================================================================================================================
//======================================================================================================================
// BUTTON SETUP
//======================================================================================================================
//==================================================================================================================
var blankTableButton = document.getElementById("blankTable");
blankTableButton.onclick = () => { affineTable.clear(); };
var runIterButton = document.getElementById("runIter");
runIterButton.onclick = runIterationButtonFunction;
animateButton.onclick = animateButtonFunction;
var addRowButton = document.getElementById("addRow");
addRowButton.onclick = () => { affineTable.addRow(); };
var delRowButton = document.getElementById("delRow");
delRowButton.onclick = () => { affineTable.deleteLastRow(); };
var resetIFSButton = document.getElementById("resIFS");
resetIFSButton.onclick = resetIFS;
var resetButton = document.getElementById("resetDr");
resetButton.onclick = resetIFS;
// Set options and event listeners for the preset dropdown menu.
var presetIFSOptions = document.getElementById("ifsDropDown");
var options = Array.from(presetIFSOptions.getElementsByTagName("a"));
options.forEach(option => {
    option.onclick = () => setPresetIFS(getPreset(option.innerHTML));
});
//==================================================================================================================
//======================================================================================================================
// END BUTTON SETUP
//======================================================================================================================
