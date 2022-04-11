//======================================================================================================================
/**
 * @file point-canvas.ts
 * @author Cameron Matsui (cmatsui22@amherst.edu)
 * @date April 2022.
 */
// IMPORTS
import { Coordinate } from '../../types.js';
//======================================================================================================================


//======================================================================================================================
/**
 * A class for a canvas to determine when a point has been clicked, and get that point.
 */
export class PointCanvas {
//======================================================================================================================


    //==================================================================================================================
    // FIELDS

    /* The canvas to wait for a click on. */
    readonly canvas: HTMLCanvasElement;

    /* The context for the canvas. */
    readonly ctx: CanvasRenderingContext2D;

    /* Whether the canvas has been clicked and a point has been chosen. */
    private clicked = false;

    /* The point */
    private point: Coordinate;

    /* Whether or not the point canvas is enabled. If not, return null as point. */
    public enabled: boolean;
    //==================================================================================================================


    //==================================================================================================================
    /**
     * The constructor for a PointCanvas. 
     */
    constructor(canvas: HTMLCanvasElement, enabled: boolean) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.enabled = enabled;
        this.point = { x: -1, y: -1 };
        this.initializeCanvas();
    } // constructor ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Reset the PointCanvas to its initial state.
     */
    public reset() {
        this.clicked = false;
        this.point = { x: -1, y: -1 };
    } // reset ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * A getter for the PointCanvas' point. 
     */
    public getPoint() {
        if (!this.enabled) return null;
        return {
            x: this.point.x,
            y: this.canvas.height - this.point.y,
        };
    } // getPoint ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * A getter for whether the PointCanvas has been clicked. 
     */
    public isClicked(): Boolean {
        return this.clicked;
    } // isClicked ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Enable the PointCanvas.
     */
    public enable() {
        this.enabled = true;
    } // enable ()
    //==================================================================================================================
    

    //==================================================================================================================
    /**
     * Disable the PointCanvas.
     */
    public disable() {
        this.enabled = false;
    } // disable ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Initialize the canvas/setup the event listener.
     */
    private initializeCanvas() {
        let canvas_ = this;
        function parseClick(e: MouseEvent) { canvas_.parseClick(e); }
        // Set up event listener.
        this.canvas.addEventListener("mousedown", function(e) {
            parseClick(e);
        }, false);
    } // initializeCanvas ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Process a click by setting clicked to be true as well as the PointCanvas' point. 
     */
    private parseClick(event: MouseEvent) {
        if (!this.enabled) return;
        let rect = this.canvas.getBoundingClientRect();
        this.point = {
            x: Math.floor(event.clientX - rect.left),
            y: Math.floor(event.clientY - rect.top)
        };
        this.clicked = true;
        this.clearCanvas();
        this.drawCurrentStartingPoint();
    } // parseClick ()
    //==================================================================================================================
    

    //==================================================================================================================
    /**
     * Draw the current starting point onto the canvas.
     */
    private drawCurrentStartingPoint() {
        this.ctx.fillStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(this.point.x, this.point.y, 4, 0, 2 * Math.PI);
        this.ctx.fill(); 
    } // drawCurrentPoint ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Clear the canvas.
     */
    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } // drawCurrentPoint ()
    //==================================================================================================================


//======================================================================================================================
} // class PointCanvas
//======================================================================================================================