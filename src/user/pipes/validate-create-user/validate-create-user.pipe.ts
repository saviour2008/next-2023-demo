import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserDataDTO } from 'src/user/dtos/userData.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: UserDataDTO, metadata: ArgumentMetadata) {
    console.log('inside validateCreateUserPipe');
    console.log(value);
    console.log(metadata);
    const parseIntValue = parseInt(value.age.toString());
    if (isNaN(parseIntValue)) {
      throw new HttpException(
        'Invalid Data Type for property age. Expect number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { ...value, age: parseIntValue };
  }
}
