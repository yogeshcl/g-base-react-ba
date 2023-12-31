"use strict";
/**
 * @fileoverview 矩阵运算，本来是要引入 gl-matrix, 但是考虑到 g-mobile 对大小有限制，同时 g-webgl 使用的 matrix 不一致
 * 所以，这里仅实现 2D 几个运算，上层自己引入 gl-matrix
 * @author dxq613@gmail.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.invert = exports.multiplyVec2 = exports.multiplyMatrix = void 0;
/**
 * 3阶矩阵相乘
 * @param {number[]} a 矩阵1
 * @param {number[]} b 矩阵2
 */
function multiplyMatrix(a, b) {
    var out = [];
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a10 = a[3];
    var a11 = a[4];
    var a12 = a[5];
    var a20 = a[6];
    var a21 = a[7];
    var a22 = a[8];
    var b00 = b[0];
    var b01 = b[1];
    var b02 = b[2];
    var b10 = b[3];
    var b11 = b[4];
    var b12 = b[5];
    var b20 = b[6];
    var b21 = b[7];
    var b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
}
exports.multiplyMatrix = multiplyMatrix;
/**
 * 3阶矩阵同2阶向量相乘
 * @param {number[]} m 矩阵
 * @param {number[]} v 二阶向量
 */
function multiplyVec2(m, v) {
    var out = [];
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
}
exports.multiplyVec2 = multiplyVec2;
/**
 * 矩阵的逆
 * @param {number[]} a 矩阵
 */
function invert(a) {
    var out = [];
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a10 = a[3];
    var a11 = a[4];
    var a12 = a[5];
    var a20 = a[6];
    var a21 = a[7];
    var a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20;
    // Calculate the determinant
    var det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
        return null;
    }
    det = 1.0 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
}
exports.invert = invert;
//# sourceMappingURL=matrix.js.map