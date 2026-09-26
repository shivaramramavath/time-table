import { socketEmitter } from '../../sockets/socket-emitter.js';

export abstract class BaseEmitter<T> {
  constructor(protected readonly resource: string) {}

  protected emit(userId: string, event: string, data: T): void {
    socketEmitter.emitToUser(userId, `${this.resource}:${event}`, data);
  }

  add(userId: string, entity: T): void {
    this.emit(userId, 'add', entity);
  }

  update(userId: string, entity: T): void {
    this.emit(userId, 'update', entity);
  }

  delete(userId: string, id: string): void {
    this.emit(userId, 'delete', { id });
  }
}
