import { Request, Response } from 'express';
import TaskModel, { TypeTask } from '../models/task.model';
import { UserRequest } from '../types/authRequest';

class TasksController {
  async getTasks(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await TaskModel.find({ user: (req as UserRequest).user.uuid }).populate("user");
      return res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las tareas.',
        error: error.message,
      });
    }
  }

  async createTask(req: Request, res: Response): Promise<Response> {
    const reqBody = req.body as Omit<TypeTask, 'user'>;

    try {
      const newTask = new TaskModel({ ...reqBody, user: (req as UserRequest).user.uuid });
      const savedTask = await newTask.save();
      return res.status(201).json({
        success: true,
        message: 'Tarea creada exitosamente.',
        data: savedTask,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear la tarea.',
        error: error.message,
      });
    }
  }

  async getTask(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const task = await TaskModel.findById(uuid);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener la tarea.',
        error: error.message,
      });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const task = await TaskModel.findByIdAndDelete(uuid);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Tarea eliminada exitosamente.',
        data: task,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar la tarea.',
        error: error.message,
      });
    }
  }

  async updateTask(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;
    const reqBody: Partial<TypeTask> = req.body;

    try {
      const task = await TaskModel.findByIdAndUpdate(uuid, reqBody, { new: true });
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Tarea actualizada exitosamente.',
        data: task,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar la tarea.',
        error: error.message,
      });
    }
  }
}

export const tasksController = new TasksController();
