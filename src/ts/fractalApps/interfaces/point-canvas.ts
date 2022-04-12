//======================================================================================================================
/**
 * @file point-canvas.ts
 * @author Cameron Matsui (cmatsui22@amherst.edu)
 * @date April 2022.
 */
// IMPORTS
import { Coordinate } from '../../types.js';
import { WindowTable, WindowCoordinates } from './window-table.js';
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

    /* The window table to get the current window values. */
    private windowTable: WindowTable;

    /* The HTML tag to display hover cooredinates. */
    private coordTag: HTMLParagraphElement;

    //==================================================================================================================


    //==================================================================================================================
    /**
     * The constructor for a PointCanvas. 
     */
    constructor(canvas: HTMLCanvasElement, enabled: boolean, coordTag: HTMLParagraphElement, windowTable: WindowTable) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.windowTable = windowTable;
        this.coordTag = coordTag;
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
        function parseHover(e: MouseEvent) { canvas_.parseHover(e); }

        // Set up event listeners for clicking and hovering.
        this.canvas.addEventListener("mousedown", function(e) {
            parseClick(e);
        }, false);

        this.canvas.addEventListener("mousemove", function(e) {
            parseHover(e);
        }, false);
    } // initializeCanvas ()
    //==================================================================================================================


    //==================================================================================================================
    /**
     * Parse a mouse over event and change the coordinate tag's text. 
     */
    private parseHover(event: MouseEvent) {
        let rect = this.canvas.getBoundingClientRect();
        let coord = this.windowTransform({
            x: event.clientX - rect.left,
            y: this.canvas.height - (event.clientY - rect.top)
        });

        let x = +(coord.x / this.canvas.width).toFixed(3);
        let y = +(coord.y / this.canvas.height).toFixed(3);

        this.coordTag.innerHTML = "X: " + x + "  Y: " + y;
    } // parseHover ()
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


    //==================================================================================================================
    /**
     * Given a coordinate on the canvas, get the corresponding coordinate for the IFS' window. 
     */
    private windowTransform(c: Coordinate): Coordinate {
        let window: WindowCoordinates = this.windowTable.getWindowBounds();
        let x0 = ((-window.a1)/(window.b1-window.a1))*this.canvas.width;
        let y0 = ((-window.a2)/(window.b2-window.a2))*this.canvas.height;
        return {
            x: (c.x-x0)*(window.b1-window.a1),
            y: (c.y-y0)*(window.b2-window.a2),
        };
    } // windowTransform ()
    //==================================================================================================================


//======================================================================================================================
} // class PointCanvas
//======================================================================================================================