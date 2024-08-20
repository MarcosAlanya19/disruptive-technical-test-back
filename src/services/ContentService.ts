import { UserModel } from '../models/user.model';

class ContentService {
  async createContent () {

    // const errors = await validate(contentData);

    // if (errors.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: errors.map((err) => Object.values(err.constraints || {})).flat(),
    //   });
    // }

  }
}

export const contentService = new ContentService();
