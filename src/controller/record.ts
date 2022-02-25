import {Context} from 'koa';
import {Between, getManager} from 'typeorm';
import {Record} from '../entity/Record';
import {Tag} from '../entity/Tag';

class RecordController {
  async addRecord(context: Context) {
    const {amount, type, remark, tagId} = context.request.body;

    const recordRepository = getManager().getRepository(Record);
    const tagRepository = getManager().getRepository(Tag);

    const tag = await tagRepository.findOne({id: tagId});
    const record = recordRepository.create({
      amount, type, remark, tag, user: context.session?.user
    });
    await recordRepository.save(record);
    context.body = record;
  }

  async query(context: Context) {
    const {beginDate, endDate} = context.request.query;
    // 默认查询当月的记录
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const recordRepository = getManager().getRepository(Record);
    context.body = await recordRepository.find({
      where: {createdAt: Between(beginDate || firstDay, endDate || new Date())},
      order: {createdAt: 'DESC'}
    });
  }
}

export default new RecordController();
