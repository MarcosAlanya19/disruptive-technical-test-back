import { NextFunction, Request, Response } from 'express';
import { seedService } from '../services/seed.service'; // Ajusta la ruta según tu estructura


export class SeedController {
  async initSeed(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await seedService.initSeed();
      return res.status(200).json({
        success: true,
        message: 'Datos iniciales creados exitosamente.',
        data: result
      });
    } catch (error: any) {
      next(error)
    }
  }
}

export const seedController = new SeedController();
