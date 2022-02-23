import {Context, Next} from 'koa';
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
    context.body = await tagRepository.findOne({id: tagId});
  }

  async update(context: Context) {
    const {id} = context.params;
    const tagRepository = getManager().getRepository(Tag);
    await tagRepository.update(id, {...context.request.body});
    context.status = 204;
  }

  async remove(context: Context) {
    const {id} = context.params;
    const tagRepository = getManager().getRepository(Tag);
    await tagRepository.delete(id);
    context.status = 204;
  }

  async checkIfTagExist(context: Context, next: Next) {
    const tagId = context.params.id;
    const tagRepository = getManager().getRepository(Tag);
    const tag = await tagRepository.findOne({id: tagId});
    if (!tag) context.throw(400, '标签不存在');
    await next();
  }
}

export default new TagController();
