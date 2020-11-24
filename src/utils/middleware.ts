import logger from "../logger";
import createHttpError from "http-errors";
import { NextFunction, ErrorRequestHandler, Request, Response } from "express";

export const logging = (req: Request, res: Response, next: NextFunction): void => {
    logger.info(`Got ${req.method} ${req.url} from ${req.ip}`, {
        method: req.method,
        url: req.url,
        ip: req.ip,
    });
    next();
};

export const error: ErrorRequestHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let httpErr: createHttpError.HttpError;
    if (err instanceof createHttpError.HttpError) {
        httpErr = err;
    } else if (err instanceof Error) {
        httpErr = createHttpError(500, err.message);
        logger.warn(`Got internal error: `, { error: err });
    } else if (typeof err === "string") {
        httpErr = createHttpError(500, err);
        logger.warn(`Got string error: `, { error: err });
    } else {
        httpErr = createHttpError(500, "Got unknown error.");
        logger.warn(`Got unknown error: `, { error: err });
    }

    res.status(httpErr.status).json({
        code: httpErr.status,
        name: httpErr.name,
        message: httpErr.message,
    });

    next();
};
