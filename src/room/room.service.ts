import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async getAll() {
    return this.roomModel.find();
  }

  async create(room: Room) {
    return this.roomModel.create(room);
  }

  async findOneById(id: string) {
    return this.roomModel.findById(id);
  }

  async updateOneById(id: string, room: Room) {
    return this.roomModel.findByIdAndUpdate(id, room);
  }

  async deleteOneById(id: string) {
    return this.roomModel.findByIdAndDelete(id);
  }

  async roll(id: string) {
    const rollResult: number[] = [];
    for (let i = 1; i <= 3; i++) {
      rollResult.push(Math.floor(Math.random() * 6));
    }

    await this.roomModel.findByIdAndUpdate(id, { rollResult });

    return rollResult;
  }

  async resetBetResult(id: string) {
    return this.roomModel.findByIdAndUpdate(id, { betResult: {} });
  }

  async resetRoom(id: string) {
    return this.roomModel.findByIdAndUpdate(id, { members: [], rollResult: [], betResult: {} });
  }

  async join(roomId: string, userId: string) {
    return this.roomModel.findByIdAndUpdate(roomId, { $push: { members: userId } });
  }

  async checkUserInAllRooms(userId: string) {
    const checked = await this.roomModel.findOne({ members: userId });
    return checked;
  }

  async saveBet(roomId: string, betResult: Map<string, number[]>) {
    return this.roomModel.findByIdAndUpdate(roomId, { betResult });
  }
}
