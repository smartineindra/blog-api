import { NextFunction, Request, Response } from 'express';

class IndexController {
    public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ data: {name:'Martine Indra S',email:'smartineindra@gmail.com'}, message: 'Hello World' });
        } catch (error) {
            next(error);
        }
    };
}

export default IndexController;