import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('feed')
export class AppController {
  constructor(private feedService: AppService) {}

  @EventPattern('add-to-feed')
  async addToFeed(
    @Payload('userId') userId: string,
    @Payload('postId') tweetId: string,
  ) {
    return this.feedService.addToFeed(userId, tweetId);
  }

  @MessagePattern('delete-feed')
  async removeFromFeed(@Payload('feedId') feedId: string) {
    return this.feedService.removeFromFeed(feedId);
  }

  @MessagePattern('get-user-feed')
  async getFeed(
    @Payload('userId') userId: string,
    @Payload('pageNo') pageNo: number,
    @Payload('limit') limit: number,
  ) {
    return this.feedService.getFeed(pageNo, limit, userId);
  }
  @MessagePattern('get-user-feed-by-location')
  async getFeedByLocation(
    @Payload('location') location: any,
    @Payload('pageNo') pageNo: number,
    @Payload('limit') limit: number,
  ) {
    return this.feedService.getFeedByLocation(pageNo, limit, location);
  }
}
