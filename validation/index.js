const{check,validationResult} = require('express-validator')


exports. categoryCheck = [
    check('category_name','category name is required').notEmpty()
    .isLength({min:4}).withMessage("Category name must be at least 4 characters")
]


exports.validate = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
        }
        next()
}
