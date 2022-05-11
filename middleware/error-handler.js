const { CustomApiError } = require("./custon-error");

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({msg: err.message })
    }else{
        return res.status(500).json({msg: `Something went wrong, try again later`})
    }
    
} 

module.exports = errorHandlerMiddleware;