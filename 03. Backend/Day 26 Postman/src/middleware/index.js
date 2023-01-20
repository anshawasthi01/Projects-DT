import jwt from 'jsonwebtoken';
const JWT_SECRET = "secret";

export const tokenExtractor = (req, res, next) => {
    const auth = req.get("authorization");
    if(auth & auth.toLowerCase().startWith('bearer')) {
        req.token = auth.substring(7);
    }
    next()
};

export const errorHandler = (err, req, res, next) => {
    // return res.status(errors[err.name].status).json({error: errors[err.name]});
    switch(err.name) {
        case 'ValidationError':
            return res.status(400).json({ error: error.message});

        case 'JsonWebTokenError':
            return res.status(401).json({ error: 'invalid token'});

        case 'TokenExpiredError':
            return res.status(401).json({ error: 'invalid expired'});

        case 'SequelizeUniqueContainerError':
            return res.status(401).json({ error: 'invalid token'});
        
        default:
            return res.status(500).json({ error: "Something went worng"})
    }
    next(error);
}

// const errors = {
//     "ValidationError": {messge: 'invalid token', status: 400 }
// }


export const tokenValidator = (reqest, response, next) => {
    const token = request.token
    if (!token) {
        return response.status(401).json({error: "token missing"})
    }
  
      const decodedToken = jwt.verify(token, JWT_SECRET);
      if(!decodedToken) {
        return response.status(401).json({ error: "invlaid token loging again" })
      }
      next();
    } 

export const unknownEndpoint = (request, response, next) => {
    response.status(404).send({error: "unknon endpoint"})
}

export const validateToken = (Request, respinse, next ) => {
    const decodedToken = jwt.verify(request.token, JWT_SECRET);
    if (!request.token || !decodedToken?.id) {
        return response.status(401).json({error: "token missing or invalid"})
    }
    return decodedToken
}
    