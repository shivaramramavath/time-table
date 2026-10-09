import { Job } from 'bullmq';

export abstract class BaseProcess<T> {
  abstract execute(job: Job<T>): Promise<unknown>;
}
