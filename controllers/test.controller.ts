import { Request, Response } from "express";

export default {
  getStatus(req: Request, res: Response) {
    res.status(200);
    res.json({
      message: "API does works!"
    });
  },

  sayHello(req: Request, res: Response) {
    res.status(200);
    res.send("Hello World!");
  },
}
