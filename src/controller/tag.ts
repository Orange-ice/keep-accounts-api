import {Context} from 'koa';
import {getManager} from 'typeorm';
import {Tag} from '../entity/Tag';

class TagController {
  async create(context: Context) {
    const {label, icon, type} = context.request.body;
    const tagRepository = getManager().getRepository(Tag);
    const tagInDB = await tagRepository.findOne({label, user: context.session?.user});
    if (tagInDB) context.throw(409, '标签名已存在');

    const newTag = tagRepository.create({
      label, icon, type,
      communal: 0,
      user: context.session?.user
    });
    await tagRepository.save(newTag);
    context.body = newTag;
  }

  async queryAll(context: Context) {
    const tagRepository = getManager().getRepository(Tag);
    context.body = await tagRepository.find({where: {user: context.session?.user}});
  }

  async queryById(context: Context) {
    const tagId = context.params.id;
    const tagRepository = getManager().getRepository(Tag);
    const tag = await tagRepository.findOne({id: tagId});
    if (!tag) context.throw(400, '标签不存在');
    context.body = tag;
  }
}

export default new TagController();
