import * as moment from 'moment';
import { Expose, Transform } from 'class-transformer';

export class UsersModel {
  @Expose() userId: number;
  @Expose() name: string;
  @Expose() email: string;
  @Expose() countryCiode: string;
  @Expose() phoneNo: string;
  @Expose()
  @Transform(({ value }) => moment(value).unix())
  updatedAt: number;
}
