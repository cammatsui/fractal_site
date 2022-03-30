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
    {
        "name": "Queen Anne's Lace",
        "ifs": [
            new AffineTransform(0.27, 0.27, 0, 0, 1, 0),
            new AffineTransform(0.27, 0.27, 0, 0, 0.707, 0.707),
            new AffineTransform(0.27, 0.27, 0, 0, 0, 1),
            new AffineTransform(0.27, 0.27, 0, 0, -0.707, 0.707),
            new AffineTransform(0.27, 0.27, 0, 0, -1, 0),
            new AffineTransform(0.27, 0.27, 0, 0, -0.707, -0.707),
            new AffineTransform(0.27, 0.27, 0, 0, 0, -1),
            new AffineTransform(0.27, 0.27, 0, 0, 0.707, -0.707),
            new AffineTransform(0.5, 0.5, 22.5, 22.5, 0, 0)
        ],
        "window": {
            a1: -1.4,
            b1: 1.4,
            a2: -1.4,
            b2: 1.4
        }
    },
    {
        "name": "Barnsley's Fern",
        "ifs": [
            new AffineTransform(0.01, 0.16, 0, 0, 0, 0),
            new AffineTransform(0.85, 0.85, -2.5, -2.5, 0, 1.6),
            new AffineTransform(0.3, 0.34, 49, 49, 0, 1.6),
            new AffineTransform(-0.3, 0.37, -50, -50, 0, 0.44)
        ],
        "window": {
            a1: -5,
            b1: 5,
            a2: 0,
            b2: 10
        }
    },
    {
        "name": "One-Arm Spiral",
        "ifs": [
            new AffineTransform(0.29, 0.29, 0, 0, 0.71, 0.41),
            new AffineTransform(0.84, 0.84, 20, 20, 0, 0)
        ],
        "window": {
            a1: -0.4,
            b1: 1,
            a2: -0.4,
            b2: 1
        }
    },
    {
        "name": "Two-Arm Spiral",
        "ifs": [
            new AffineTransform(0.2, 0.2, 0, 0, 0.7, 0),
            new AffineTransform(0.2, 0.2, 0, 0, -0.7, 0),
            new AffineTransform(0.85, 0.85, 20, 20, 0, 0)
        ],
        "window": {
            a1: -1,
            b1: 1,
            a2: -1,
            b2: 1
        }
    },
    {
        "name": "Four-Arm Spiral 1",
        "ifs": [
            new AffineTransform(0.2, 0.2, 0, 0, 0.7, 0),
            new AffineTransform(0.2, 0.2, 0, 0, -0.7, 0),
            new AffineTransform(0.2, 0.2, 0, 0, 0, 0.7),
            new AffineTransform(0.2, 0.2, 0, 0, 0, -0.7),
            new AffineTransform(0.85, 0.85, 20, 20, 0, 0)
        ],
        "window": {
            a1: -1,
            b1: 1,
            a2: -1,
            b2: 1
        }
    },
    {
        "name": "Four-Arm Spiral 2",
        "ifs": [
            new AffineTransform(0.1, 0.1, 0, 0, 0.75, 0.75),
            new AffineTransform(0.1, 0.1, 0, 0, -0.75, 0.75),
            new AffineTransform(0.1, 0.1, 0, 0, -0.75, -0.75),
            new AffineTransform(0.1, 0.1, 0, 0, 0.75, -0.75),
            new AffineTransform(0.95, 0.96, 10, 10, 0, 0)
        ],
        "window": {
            a1: -1,
            b1: 1,
            a2: -1,
            b2: 1
        }
    }
]; // const presetIFS
//======================================================================================================================
