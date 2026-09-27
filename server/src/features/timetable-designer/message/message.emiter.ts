import { BaseEmitter } from '#shared/base/base-emitter.js';
import { Message } from './message.model.js';

export type MessageStatus =
  | 'thinking'
  | 'analyzing'
  | 'understanding'
  | 'retrieving'
  | 'planning'
  | 'validating'
  | 'executing'
  | 'verifying'
  | 'responding';

export interface MessageStartData {
  messageId: string;
}

export interface MessageTokenData {
  messageId: string;
  content: string;
  seq: number;
  timestamp: number;
}

export interface MessageStatusData {
  messageId: string;
  status: MessageStatus;
}

export interface MessageFinishData {
  messageId: string;
}

export interface MessageErrorData {
  message: string;
}

export class MessageEmitter extends BaseEmitter<Message> {
  constructor() {
    super('message');
  }

  async start(userId: string, data: MessageStartData): Promise<void> {
    this.emit(userId, 'start', data);
  }

  async token(userId: string, data: MessageTokenData): Promise<void> {
    this.emit(userId, 'token', data);
  }

  async status(userId: string, data: MessageStatusData): Promise<void> {
    this.emit(userId, 'status', data);
  }

  async finish(userId: string, data: MessageFinishData): Promise<void> {
    this.emit(userId, 'finish', data);
  }

  async error(userId: string, data: MessageErrorData): Promise<void> {
    this.emit(userId, 'error', data);
  }
}

export const messageEmitter = new MessageEmitter();
