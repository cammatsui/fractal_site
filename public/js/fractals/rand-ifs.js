//======================================================================================================================
//======================================================================================================================
/**
 * A class representing a Random Iterated Function System.
 * The class finds a fixed point of one of the affine transforms, and
 * repeatedly applies a random transform to that point.
 */
export class RandomIFS {
    //==================================================================================================================
    //============================================================================================================================================================================
    // INSTANCE METHODS
    //==================================================================================================================
    //==================================================================================================================
    /**
     * The constructor for the RandomIFS.
     */
    constructor(canvas, table, numPts, window, startingPoint) {
        /* The current number of iterations. */
        this.numIters = 0;
        /* The number of points draw. */
        this.pointsDrawn = 0;
        /* The max number of iterations. We allow the random ifs to be iterated infinitely. */
        this.maxIters = Number.MAX_VALUE;
        /* The tolerance on finding a fixed point, in pixels. */
        this.POINT_TOLERANCE = 2;
        /* The cooldown on animation, in ms. */
        this.COOLDOWN = 500;
        /* The number of times to try a matrix for a fixed point. */
        this.FIXED_PT_TRIES = 1000;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.numPoints = numPts;
        // Set the window bounds.
        this.a1 = window.a1;
        this.b1 = window.b1;
        this.a2 = window.a2;
        this.b2 = window.b2;
        // Get the coordinates of the new origin.
        this.x0 = ((-this.a1) / (this.b1 - this.a1)) * this.canvas.width;
        this.y0 = ((-this.a2) / (this.b2 - this.a2)) * this.canvas.height;
        let affineTransforms = this.calibrateAffineTransforms(table.collectTransforms());
        this.transformProbs = table.collectProbabilities();
        this.matrices = RandomIFS.gatherMatrices(affineTransforms);
        this.currentPoint = startingPoint == null ? this.findFixedPointStochastic() : startingPoint;
    } // constructor ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Return the animation cooldown.
     */
    calculateCooldown() {
        return this.COOLDOWN;
    } // calculateCooldown ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Randomly find a fixed point of a random matrix.
     */
    findFixedPointStochastic() {
        function getRandomInt(max) { return Math.floor(Math.random() * max); }
        while (true) {
            let matrix = this.randomMatrix();
            for (var i = 0; i < this.FIXED_PT_TRIES; i++) {
                let randomPoint = { x: getRandomInt(this.canvas.width), y: getRandomInt(this.canvas.height) };
                let randomPointWindowTransformed = this.windowTransform(randomPoint);
                let transformedPoint = RandomIFS.applyMatrix(matrix, randomPointWindowTransformed);
                let distX = Math.abs(randomPointWindowTransformed.x - transformedPoint.x);
                let distY = Math.abs(randomPointWindowTransformed.y - transformedPoint.y);
                if (distX <= this.POINT_TOLERANCE && distY <= this.POINT_TOLERANCE) {
                    return randomPointWindowTransformed;
                }
            }
        }
    } // findFixedPointStochastic ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * "Calibrate" the affine transforms to the canvas size.
     */
    calibrateAffineTransforms(affineTransforms) {
        // For now, just assume window is unit square.
        for (var i = 0; i < affineTransforms.length; i++) {
            affineTransforms[i].e = affineTransforms[i].e * this.canvas.width;
            affineTransforms[i].f = affineTransforms[i].f * this.canvas.height;
        }
        return affineTransforms;
    } // calibrateAffineTransforms ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Run an iteration of the Random IFS.
     */
    iterate() {
        this.numIters++;
        for (var i = 0; i < this.numPoints; i++) {
            if (this.pointsDrawn < 10) {
                this.drawCurrentPointRed();
            }
            else {
                this.drawCurrentPoint();
            }
            this.updateCurrentPoint();
            this.pointsDrawn++;
        }
    } // iterate ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Apply a random matrix to the current point.
     */
    updateCurrentPoint() {
        var rM = this.randomMatrix();
        this.currentPoint = RandomIFS.applyMatrix(rM, this.currentPoint);
    } // updateCurrentPoint ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Get a random (weighted) choice from the matrices.
     */
    randomMatrix() {
        let rand = Math.random();
        for (var i = 0; i < this.matrices.length; i++) {
            let thisProb = this.transformProbs[i];
            let nextProb = this.transformProbs[i + 1];
            if (rand >= thisProb && rand <= nextProb)
                return this.matrices[i];
        }
        return this.matrices[this.matrices.length - 1];
    } // randomMatrix ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Given a coordinate on the canvas, get the corresponding coordinate for the IFS' window.
     */
    windowTransform(c) {
        return {
            x: (c.x - this.x0) * (this.b1 - this.a1),
            y: (c.y - this.y0) * (this.b2 - this.a2),
        };
    } // windowTransform ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Given a coordinate with respect to the IFS' window, get the corresponding coordinate on the canvas.
     */
    invWindowTransform(c) {
        return {
            x: Math.floor((c.x / (this.b1 - this.a1)) + this.x0),
            y: Math.floor((c.y / (this.b2 - this.a2)) + this.y0)
        };
    } // invWindowTransform ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Draw the current point (larger, and in red) onto the canvas.
     */
    drawCurrentPointRed() {
        let pointInWindow = this.invWindowTransform(this.currentPoint);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(pointInWindow.x, this.canvas.height - pointInWindow.y, 4, 4);
    } // drawCurrentPoint ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Draw the current point onto the canvas.
     */
    drawCurrentPoint() {
        let pointInWindow = this.invWindowTransform(this.currentPoint);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(pointInWindow.x, this.canvas.height - pointInWindow.y, 2, 2);
    } // drawCurrentPoint ()
    //==================================================================================================================
    //==================================================================================================================
    // STATIC METHODS
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Apply a matrix to a given coordinate.
     */
    static applyMatrix(matrix, c) {
        return {
            x: Math.floor(matrix[0] * c.x + matrix[1] * c.y + matrix[4]),
            y: Math.floor(matrix[2] * c.x + matrix[3] * c.y + matrix[5])
        };
    } // applyMatrix ()
    //==================================================================================================================
    //==================================================================================================================
    /**
     * Gather the matrices for the affine transform.
     */
    static gatherMatrices(affineTransforms) {
        let matrices = [];
        for (var i = 0; i < affineTransforms.length; i++) {
            matrices.push(affineTransforms[i].createMatrix());
        }
        return matrices;
    } // gatherMatrices ()
} // class RandomIFS 
//======================================================================================================================
