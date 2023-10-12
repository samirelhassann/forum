import { UniqueEntityId } from "./UniqueEntityId";

export abstract class Entity<T> {
  private _id: UniqueEntityId;

  protected props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
