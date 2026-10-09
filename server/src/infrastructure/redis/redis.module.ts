import { Global, Module } from '@nestjs/common';
import { RedisDataService } from './redis-data.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [RedisService, RedisDataService],
  exports: [RedisService, RedisDataService],
})
export class RedisModule {}
