import { Request } from "express"
import { IUserPayload } from "../utils/jwt.util"

export interface UserRequest extends Request {
  user: IUserPayload
}
