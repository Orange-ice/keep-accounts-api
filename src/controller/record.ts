import {Context} from 'koa';
import {getManager} from 'typeorm';
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
}

export default new RecordController();
