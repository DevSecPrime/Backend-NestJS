import * as moment from 'moment';
import { Expose, Transform } from 'class-transformer';
export class UserModel {
  @Expose() userId: number;
  @Expose() name: string;
  @Expose() email: string;
  @Expose() phno: number;
  @Expose() description: string;
  //transform the data
  @Expose()
  @Transform(({ value }) => moment(value).unix()) //unix converts it to timestamp
  updatedAt: number;
}
