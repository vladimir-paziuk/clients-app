import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNumberString } from 'class-validator';

// Find way how to import it from SelectQueryBuilder orderBys.direction
export enum queryBuilderSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum queryBuilderSortBy {
  specialization = 'specialization',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class DoctorQueryDto {
  @ApiProperty({ required: false })
  @IsString()
  search: string;

  @ApiProperty({ required: false })
  @IsNumberString()
  offset: number;
  @ApiProperty({ required: false })
  @IsNumberString()
  limit: number;

  @ApiProperty({ required: false, enum: queryBuilderSortBy })
  @IsEnum(queryBuilderSortBy)
  sortBy: queryBuilderSortBy; // groupBy
  @ApiProperty({ required: false, enum: queryBuilderSortDirection })
  @IsEnum(queryBuilderSortDirection)
  sortDirection: queryBuilderSortDirection; // orderBy
}
