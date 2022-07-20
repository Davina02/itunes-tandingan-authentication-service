import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "name": "name",
 *   "phone": "0811345677"
 *   "signature_key": "jbadmcsVWCHJFWEfbjwrkvabdc"
 * }
 */
export default [
    body('name')
      .exists().withMessage('Parameter \'name\' tidak ditemukan.')
      .not().isEmpty().withMessage('Parameter \'name\' tidak boleh berisi string kosong.')
    ,

    body('phone')
      .exists().withMessage('Parameter \'phone\' tidak ditemukan.')
      .isNumeric().withMessage('Parameter \'phone\' harus diisi dengan angka')
      .not().isEmpty().withMessage('Parameter \'phone\' tidak boleh berisi string kosong.')
      .isLength({ min: 9 }).withMessage('Minimal panjang nomor telepon adalah 9.')
    ,

    body('signature_key')
      .exists().withMessage('Parameter \'signature_key\' tidak ditemukan.')

]