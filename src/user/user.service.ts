import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import envConfig from '../app/envConfig';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getTop10CoinByIds(ids: string[]) {
    return this.userModel
      .find({ _id: { $in: ids } })
      .sort({ coin: -1 })
      .limit(10);
  }

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async updateCoin(id: string, coin: number) {
    return this.userModel.findByIdAndUpdate(id, { coin });
  }

  async resetCoin(id: string) {
    return this.userModel.findByIdAndUpdate(id, { coin: Number(envConfig().DEFAULT_COIN) });
  }
}
