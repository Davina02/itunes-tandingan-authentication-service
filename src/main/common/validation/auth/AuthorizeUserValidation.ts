import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "phone": "0811345677"
 * }
 */
export default [
    body('phone')
      .exists().withMessage('Parameter \'phone\' tidak ditemukan.')
      .isNumeric().withMessage('Parameter \'phone\' harus diisi dengan angka')
      .not().isEmpty().withMessage('Parameter \'phone\' tidak boleh berisi string kosong.')
      .isLength({ min: 9 }).withMessage('Minimal panjang nomor telepon adalah 9.')
    ,

]