import {body} from "express-validator";

/**
 * Expected Request Body
 * {
 *   "name": "name",
 *   "signature_key": "jbadmcsVWCHJFWEfbjwrkvabdc"
 * }
 */
export default [
    body('name')
      .exists().withMessage('Parameter \'name\' tidak ditemukan.')
      .not().isEmpty().withMessage('Parameter \'name\' tidak boleh berisi string kosong.')
    ,

    body('signature_key')
      .exists().withMessage('Parameter \'signature_key\' tidak ditemukan.')

]