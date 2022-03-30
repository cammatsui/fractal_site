//======================================================================================================================
/**
 * @file preset-ifs.ts
 * @author Cameron Matsui (cmatsui22@amherst.edu)
 * @date December 2021.
 */
// IMPORTS
import { AffineTransform } from "../fractals/affine-transform.js";
//======================================================================================================================


//======================================================================================================================
export const presetIFS = [
    {
        "name": "Sierpinski Gasket",
        "ifs": [
            new AffineTransform(0.5, 0.5, 0, 0, 0, 0),
            new AffineTransform(0.5, 0.5, 0, 0, 0.5, 0),
            new AffineTransform(0.5, 0.5, 0, 0, 0, 0.5)
        ],
        "window": {
            a1: 0,
            b1: 1,
            a2: 0,
            b2: 1,
        }
    },
    {
        "name": "Koch Curve",
        "ifs": [
            new AffineTransform(0.333333, 0.333333, 0, 0, 0, 0),
            new AffineTransform(0.333333, 0.333333, 60, 60, 0.333333, 0),
            new AffineTransform(0.333333, 0.333333, -60, -60, 0.5, 0.289),
            new AffineTransform(0.333333, 0.333333, 0, 0, 0.666667, 0)
        ],
        "window": {
            a1: 0,
            b1: 1,
            a2: 0,
            b2: 1,
        }
    },
    {
        "name": "Sierpinski Carpet",
        "ifs": [
            new AffineTransform(0.333334, 0.333334, 0, 0, 0, 0),
            new AffineTransform(0.333334, 0.333334, 0, 0, 0.333333, 0),
            new AffineTransform(0.333334, 0.333334, 0, 0, 0.666667, 0),
            new AffineTransform(0.333334, 0.333334, 0, 0, 0, 0.333333),
            new AffineTransform(0.333334, 0.333334, 0, 0, 0.666667, 0.333333),
            new AffineTransform(0.333334, 0.333334, 0, 0, 0, 0.666667),
            new AffineTransform(0.333334, 0.333334, 0, 0, 0.333333, 0.666667),
            new AffineTransform(0.333334, 0.333334, 0, 0, 0.666667, 0.666667),
        ],
        "window": {
            a1: 0,
            b1: 1,
            a2: 0,
            b2: 1,
        }

    },
    {
        "name": "Tree",
        "ifs": [
            new AffineTransform(0.05, 0.6, 0, 0, 0, 0),
            new AffineTransform(0.05, -0.5, 0, 0, 0, 1),
            new AffineTransform(0.6, 0.5, 40, 40, 0, 0.6),
            new AffineTransform(0.5, 0.45, 20, 20, 0, 1.1),
            new AffineTransform(0.5, 0.55, -30, -30, 0, 1),
            new AffineTransform(0.55, 0.4, -40, -40, 0, 0.7)
        ],
        "window": {
            a1: -1,
            b1: 1,
            a2: 0,
            b2: 2,
        }
    },

] // const presetIFS
//======================================================================================================================