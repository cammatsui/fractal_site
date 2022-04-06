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
//======================================================================================================================


//======================================================================================================================
// SETUP
//======================================================================================================================

// Calculate the max dimension for the fractal canvas.
const maxDimension = Math.floor(Math.min(window.innerWidth*.85, window.innerHeight*.85));

// Setup the fractal canvas.
const fractalCanvas = <HTMLCanvasElement>document.getElementById('fractal-canvas')
fractalCanvas.height = maxDimension;
fractalCanvas.width = maxDimension;
const ctx = fractalCanvas.getContext("2d")!;

// Setup the affine table and window table.
const affineTable = new ProbabilityAffineTable(<HTMLTableElement>document.getElementById("affineTable"));
const windowTable = new WindowTable(<HTMLTableElement>document.getElementById("windowTable"));

// Get the number of points.
let pointsSlider = <HTMLInputElement>document.getElementById("dotsRange")!;

// Create the ifs.
let ifs : RandomIFS = new RandomIFS(fractalCanvas, affineTable, getNumPoints(), windowTable.getWindowBounds(),
                                    shouldUseFixedPoint());

// Setup the animation.
let iterationsHTML: HTMLElement = document.getElementById("numIters")!;
let animateButton = <HTMLButtonElement>document.getElementById("animate")!;
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
        // If the animator is running, stop it.
        if (animator.isAnimating()) animator.toggleAnimation();
        ifs = new RandomIFS(fractalCanvas, affineTable, getNumPoints(), windowTable.getWindowBounds(), 
                            shouldUseFixedPoint());
        animator = new Animator(ifs, animateButton, "", iterationsHTML);
        ctx.clearRect(0, 0, fractalCanvas.height, fractalCanvas.width)
        iterationsHTML.innerHTML = "Iterations: 0";
    } // resetIFS ()
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
    function getPreset(name: string) {
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
    function setPresetIFS(preset: any) {
        affineTable.applyPreset(preset.ifs);
        windowTable.applyPreset(preset.window);
    } // setPresetIFS ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Whether to use a fixed point to start the Random IFS.
     */
    function shouldUseFixedPoint() {
        let checkBox = <HTMLInputElement>document.getElementById('useFixed')!;
        return checkBox.checked;
    } // shouldUseFixedPoint ()
    //==================================================================================================================


//======================================================================================================================
// END BUTTON FUNCTIONS & HELPERS
//======================================================================================================================


//======================================================================================================================
// BUTTON SETUP
//======================================================================================================================


    //==================================================================================================================

    var blankTableButton = document.getElementById("blankTable")!;
    blankTableButton.onclick = () => { affineTable.clear() };

    var runIterButton = document.getElementById("runIter")!;
    runIterButton.onclick = () => { animator.runIterationWithCooldown() };

    animateButton.onclick = () => { animator.toggleAnimation() };

    var addRowButton = document.getElementById("addRow")!;
    addRowButton.onclick = () => { affineTable.addRow() };

    var delRowButton = document.getElementById("delRow")!;
    delRowButton.onclick = () => { affineTable.deleteLastRow() };

    var resetIFSButton = document.getElementById("resIFS")!;
    resetIFSButton.onclick = resetIFS;

    var resetButton = document.getElementById("resetDr")!;
    resetButton.onclick = resetIFS;

    // Set options and event listeners for the preset dropdown menu.
    var presetIFSOptions = document.getElementById("ifsDropDown")!;
    var options = Array.from(presetIFSOptions.getElementsByTagName("a"))!;
    options.forEach(option => {
        option.onclick = () => setPresetIFS(getPreset(option.innerHTML));
    });

    //==================================================================================================================


//======================================================================================================================
// END BUTTON SETUP
//======================================================================================================================