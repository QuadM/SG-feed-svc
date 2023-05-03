import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
// import { Post } from './interfaces/post.interface';
// import { User } from './interfaces/user.interface';
import { Post } from './schemas/post.schema';
import { User } from './schemas/user.schema';
import { UserFeed } from './schemas/user-feed.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserFeed.name) private feedModel: Model<UserFeed>,
    @Inject('feed-svc') private readonly feedSvcClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.feedSvcClient.subscribeToResponseOf('post_created');
    this.feedSvcClient.connect();
    // consumer.subscribe(async ({ value: post }: Message) => {
    //   const user = await this.userModel.findById(post.author);
    //   const feed = { post, user };
    //   // logic to add post to user's followers' feeds
    // });
  }

  async getFeed(page = 1, limit = 10, userId: string): Promise<Post[]> {
    const user = await this.userModel.findById(userId);
    const following = user.following;
    const post = await this.postModel
      .find({ author: { $in: following } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return post;
  }

  async getFeedByLocation(
    page = 1,
    limit = 10,
    location,
    maxDistanceInMeters = 1000,
  ): Promise<Post[]> {
    const post = await this.postModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [location.longitude, location.latitude],
            },
            $maxDistance: maxDistanceInMeters,
          },
        },
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return post;
  }
  // async getFeed(userId: string, limit = 10): Promise<UserFeed[]> {
  //   return this.feedModel
  //     .find({ userId })
  //     .sort({ createdAt: -1 })
  //     .limit(limit)
  //     .populate('postId');
  // }

  async addToFeed(userId: string, postId: string): Promise<UserFeed> {
    const feedItem = new this.feedModel({ userId, postId });
    return feedItem.save();
  }

  async removeFromFeed(feedId: string): Promise<void> {
    await this.feedModel.findByIdAndDelete(feedId);
  }
}
