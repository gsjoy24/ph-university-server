import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  // [x: string]: any;
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (key) =>
            ({
              [key]: {
                $regex: searchTerm,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'page', 'limit', 'sort', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort = this?.query?.sort
      ? (this?.query?.sort as string).split(',').join(' ')
      : '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  paginate() {
    const limit = this?.query?.limit ? Number(this?.query?.limit) : 10;
    const page = this?.query?.page ? Number(this?.query?.page) : 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields = this?.query?.fields
      ? (this?.query?.fields as string).split(',').join(' ')
      : '-__v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
  async countTotal() {
    const limit = this?.query?.limit ? Number(this?.query?.limit) : 10;
    const page = this?.query?.page ? Number(this?.query?.page) : 1;
    const filter = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    return {
      page,
      limit,
      totalPages,
      total,
    };
  }
}
export default QueryBuilder;
