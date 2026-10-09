import logger from '#configs/logger.js';

export interface SocketResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export type SocketCallback<T = unknown> = (response: SocketResponse<T>) => void;

export type SocketHandler<TPayload, TResult> = (payload: TPayload) => Promise<TResult>;

export const asyncSocketHandler = <TPayload, TResult = unknown>(
  event: string,
  handler: SocketHandler<TPayload, TResult>,
) => {
  return async (payload: TPayload, callback: SocketCallback<TResult>) => {
    try {
      logger.info(event);

      const data = await handler(payload);

      callback({
        success: true,
        data,
      });
    } catch (error) {
      logger.error(`${event} | error=${error instanceof Error ? error.message : String(error)}`);

      callback?.({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  };
};
