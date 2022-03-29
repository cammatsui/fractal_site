var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//======================================================================================================================
//======================================================================================================================
/**
 * A class representing a Deterministic Iterated Function System (IFS).
 */
export class DeterministicIFS {
    //==================================================================================================================
    //==================================================================================================================
    // INSTANCE METHODS
    //==================================================================================================================
    //==================================================================================================================
    /**
     * The constructor for a DeterministicIFS. The parameters a and b give the region [a,b]^2 to draw the fractal in.
     */
    constructor(canvas, affineTable, a, b) {
        /* The current number of iterations. */
        this.numIters = 0;
        /* The delay (in ms) between applying each affine transform in animation. */
        this.AFFINE_DELAY = 220;
        // The fill color for the initial drawing.
        this.START_COLOR = "blue";
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.resetCanvas();
        let affineTransforms = this.calibrateAffineTransforms(affineTable.collectTransforms(), a, b);
        this.maxIters = this.computeMaxIterations(affineTransforms);
        // Get an inverted matrix for each affine transform.
        this.invertedMatrices = [];
        affineTransforms.forEach(t => {
            let invT = t.getInverse();
            // Check that all entered transforms are invertible.
            for (var i = 0; i < invT.length; i++) {
                if (isNaN(invT[i]))
                    throw new Error("Invalid Affine Transform.");
            }
            this.invertedMatrices.push(invT);
        });
    } // constuctor ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Calculate and return the cooldown (number of ms to wait) before the next iteration.
     */
    calculateCooldown() {
        return this.invertedMatrices.length * this.AFFINE_DELAY * 1.8;
    } // calculateCooldown ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Reset the IFS canvas for a new fractal.
     */
    resetCanvas() {
        // Draw square on the canvas.
        this.ctx.fillStyle = this.START_COLOR;
        this.ctx.putImageData(this.ctx.createImageData(this.canvas.width + 100, this.canvas.height + 100), 0, 0);
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    } // resetCanvas ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Run an iteration of the IFS with animation.
     */
    iterate() {
        this.numIters++;
        // Store the results of sequentially applying each transformation.
        let currentImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        // Run the animation.
        this.runAnimation(this.buildAnimationFrames(currentImageData));
    } // iterate ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Create the animation frames for the current iteration, given the
     */
    buildAnimationFrames(currentImageData) {
        let newImageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        var result = [];
        console.log("started building frames");
        this.invertedMatrices.forEach(t => {
            // Get the result of applying the ith transform to the previous iteration.
            let transformed = this.getTransformedImageData(t, currentImageData);
            // Layer the result on top of newImageData.
            newImageData = this.layerImageDatas(newImageData, transformed);
            // Save a copy of newImageData after applying this transform to the results.
            result.push(new ImageData(new Uint8ClampedArray(newImageData.data), newImageData.width, newImageData.height));
        });
        console.log("animation frames built");
        return result;
    } // buildAnimationFrames ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Get the transformed ImageData of applying the given inverse matrix to the current image data.
     */
    getTransformedImageData(transform, currentImageData) {
        let transformed = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        // Apply inverse transform to each pixel on transformed ImageData.
        for (var x = 0; x <= this.canvas.width; x++) {
            for (var y = 0; y <= this.canvas.height; y++) {
                let coordTo = { x: x, y: y };
                let coordFrom = DeterministicIFS.applyMatrix(transform, coordTo);
                coordTo.y = this.canvas.height - coordTo.y;
                coordFrom.y = this.canvas.height - coordFrom.y;
                // Check that inverse pixel is in the bounds of the ImageData.
                let fromInX = coordFrom.x >= 0 && coordFrom.x < this.canvas.width;
                let fromInY = coordFrom.y >= 0 && coordFrom.y < this.canvas.height;
                // Check that either the pixel of the transformation from is not transparent, or the pixel
                // that the transformation is to is transparent.
                let fromTransparent = DeterministicIFS.getAlpha(currentImageData, coordFrom) > 0;
                let toTransparent = DeterministicIFS.getAlpha(transformed, coordTo) == 0;
                if ((fromInX && fromInY) && (!fromTransparent || toTransparent)) {
                    DeterministicIFS.copyPixel(currentImageData, coordFrom, transformed, coordTo);
                }
            }
        }
        return transformed;
    } // getTransformedImageData ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Run the animation for an iteration with the given array of ImageDatas, animationFrames.
     */
    runAnimation(animationFrames) {
        return __awaiter(this, void 0, void 0, function* () {
            // A sleep function.
            function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
            for (var i = 0; i < animationFrames.length; i++) {
                this.ctx.putImageData(animationFrames[i], 0, 0);
                if (i != animationFrames.length - 1)
                    yield sleep(this.AFFINE_DELAY);
            }
        });
    } // runAnimation ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Layer two ImageDatas (imageData1, imageData2) together.
     */
    layerImageDatas(imageData1, imageData2) {
        var layered = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        for (var x = 0; x <= this.canvas.width; x++) {
            for (var y = 0; y <= this.canvas.height; y++) {
                let thisCoord = { x: x, y: y };
                // If thisCoord is not transparent on either ImageData, copy it to the layered result.
                if (DeterministicIFS.getAlpha(imageData1, thisCoord) > 0) {
                    DeterministicIFS.copyPixel(imageData1, thisCoord, layered, thisCoord);
                }
                if (DeterministicIFS.getAlpha(imageData2, thisCoord) > 0) {
                    DeterministicIFS.copyPixel(imageData2, thisCoord, layered, thisCoord);
                }
            }
        }
        return layered;
    } // layerImageDatas ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Find the maximum number of iterations before the fractal "disintegrates," i.e., the whole drawing becomes
     * smaller than a pixel on the canvas.
     */
    computeMaxIterations(affineTransforms) {
        let minDimension = this.findMinDrawingDimension();
        let minScalingFactor = DeterministicIFS.findMinScalingFactor(affineTransforms);
        // if square of minDim, how many times can we multiply by minScalingFactor to get to 1?
        //  i = log_{minScalingFactor}(1/minDim)
        return Math.floor(Math.log(1 / minDimension) / Math.log(minScalingFactor));
    } // computeMaxIterations ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Find the minimum width/height of the drawing on the canvas.
     */
    findMinDrawingDimension() {
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let cur = { minX: this.canvas.width, maxX: 0, minY: this.canvas.height, maxY: 0 };
        function notTransparent(c) { return DeterministicIFS.getAlpha(imageData, c) != 0; }
        for (var x = 0; x <= this.canvas.width; x++) {
            for (var y = 0; y <= this.canvas.height; y++) {
                if (notTransparent({ x: x, y: y })) {
                    cur = { minX: Math.min(x, cur.minX),
                        maxX: Math.max(x, cur.maxX),
                        minY: Math.min(y, cur.minY),
                        maxY: Math.max(y, cur.maxY) };
                }
            }
        }
        return Math.min(cur.maxX - cur.minX, cur.maxY - cur.minY);
    } // findMinDrawingDimension ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * "Calibrate" the affine transforms to the canvas size and window [a,b].
     */
    calibrateAffineTransforms(affineTransforms, a, b) {
        // For now, just assume window is unit square.
        for (var i = 0; i < affineTransforms.length; i++) {
            affineTransforms[i].e = affineTransforms[i].e * this.canvas.width;
            affineTransforms[i].f = affineTransforms[i].f * this.canvas.height;
        }
        return affineTransforms;
    } // calibrateAffineTransforms ()
    //==================================================================================================================
    //==================================================================================================================
    // STATIC METHODS
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Apply a matrix to a coordinate.
     */
    static applyMatrix(matrix, c) {
        return {
            x: Math.floor(matrix[0] * c.x + matrix[1] * c.y + matrix[4]),
            y: Math.floor(matrix[2] * c.x + matrix[3] * c.y + matrix[5])
        };
    } // applyMatrix
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Copy the data at c1 = (x1, y1) on imageData1 to c2 = (x2, y2) on imageData2.
     */
    static copyPixel(imageData1, c1, imageData2, c2) {
        let width = imageData1.width;
        for (var i = 0; i < 4; i++) {
            imageData2.data[(c2.y * width + c2.x) * 4 + i] = imageData1.data[(c1.y * width + c1.x) * 4 + i];
        }
    } // copyPixel ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Get the alpha value of a pixel on a given ImageData.
     */
    static getAlpha(imageData, c) {
        return imageData.data[(c.y * imageData.width + c.x) * 4 + 3];
    } // getAlpha ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Find the minimum scaling factor (r,s) of the given affine transforms.
     */
    static findMinScalingFactor(affineTransforms) {
        let min = Number.MAX_VALUE;
        affineTransforms.forEach(t => {
            if (t.r < min)
                min = t.r;
            if (t.s < min)
                min = t.s;
        });
        return min;
    } // findMinScalingFactor ()
} // class DeterministicIFS
//======================================================================================================================
