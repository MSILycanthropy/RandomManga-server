import { Response } from "express";
import { response_status_codes } from "./model";

export function success(DATA: any, res: Response) {
  res.status(response_status_codes.success).send(DATA);
}

export function failure(message: string, DATA: any, res: Response) {
  res.status(response_status_codes.success).json({
    status: "failure",
    message: message,
    DATA,
  });
}

export function insufficientParameters(res: Response) {
  res.status(response_status_codes.bad_request).json({
    status: "failure",
    message: "Insufficient parameters",
    data: {},
  });
}

export function mongoError(err: any, res: Response) {
  res.status(response_status_codes.internal_server_error).json({
    status: "failure",
    message: "MongoDB Internal Error",
    data: err,
  });
}
