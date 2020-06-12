import { Request, Response, NextFunction }  from 'express';

const testController = (req: Request, res: Response, next: NextFunction) => {
    res.send('test');
}

export = testController;