import {
  Controller,
  Get,
  Inject,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  CacheModule,
  CacheInterceptor,
  CACHE_MANAGER,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/rabbit')
  async getRabbit(@Query('id') id): Promise<any> {
    try {
      if (!id) {
        return {};
      }

      const cached: string = await this.cacheManager.get(id);
      if (cached) {
        return JSON.parse(cached);
      }

      const data = await this.appService.getRabbit(id);

      await this.cacheManager.set(id, JSON.stringify(data), 10000);

      return data;
    } catch (e) {
      return {};
    }
  }
}
