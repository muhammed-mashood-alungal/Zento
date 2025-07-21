import {
  Model,
  ModelStatic,
  WhereOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
  FindOptions,
  Attributes,
  CreationAttributes,
} from "sequelize";

export abstract class BaseRepository<T extends Model> {
  constructor(protected model: ModelStatic<T>) {}

  async findAll(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findById(
    id: string | number,
    options?: Omit<FindOptions<Attributes<T>>, "where">
  ): Promise<T | null> {
    return this.model.findByPk(id, options);
  }

  async findOne(options: FindOptions<Attributes<T>>): Promise<T | null> {
    return this.model.findOne(options);
  }

  async find(
    where: WhereOptions<Attributes<T>>,
    options?: Omit<FindOptions<Attributes<T>>, "where">
  ): Promise<T[]> {
    return this.model.findAll({
      where,
      ...options,
    });
  }

  async create(
    data: CreationAttributes<T>,
    options?: CreateOptions<Attributes<T>>
  ): Promise<T> {
    return this.model.create(data, options);
  }

  async bulkCreate(
    data: CreationAttributes<T>[],
    options?: CreateOptions<Attributes<T>>
  ): Promise<T[]> {
    return this.model.bulkCreate(data, options);
  }

  async update(
    values: Partial<Attributes<T>>,
    options: UpdateOptions<Attributes<T>>
  ): Promise<[number, T[]]> {
    return this.model.update(values, {
      ...options,
      returning: true,
    });
  }

  async updateById(
    id: string | number,
    values: Partial<Attributes<T>>,
    options?: Omit<UpdateOptions<Attributes<T>>, "where">
  ): Promise<T | null> {
    const [affectedRows] = await this.model.update(values, {
      where: { id } as any,
      returning: true,
      ...options,
    });

    if (affectedRows === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(options: DestroyOptions<Attributes<T>>): Promise<number> {
    return this.model.destroy(options);
  }

  async deleteById(
    id: string | number,
    options?: Omit<DestroyOptions<Attributes<T>>, "where">
  ): Promise<number> {
    return this.model.destroy({
      where: { id } as any,
      ...options,
    });
  }

  async count(
    options?: Omit<FindOptions<Attributes<T>>, "group">
  ): Promise<number> {
    return this.model.count(options);
  }

  async findAndCountAll(
    options?: FindOptions<Attributes<T>>
  ): Promise<{ rows: T[]; count: number }> {
    return this.model.findAndCountAll(options);
  }

  async findOrCreate(
    options: FindOptions<Attributes<T>> & {
      defaults: CreationAttributes<T>;
    }
  ): Promise<[T, boolean]> {
    return this.model.findOrCreate(options);
  }

  
  async paginate(
    page: number = 1,
    limit: number = 10,
    options?: FindOptions<Attributes<T>>
  ): Promise<{
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;

    const { rows: data, count: total } = await this.findAndCountAll({
      ...options,
      limit,
      offset,
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
