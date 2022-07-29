import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNumberString } from 'class-validator';

// Find way how to import it from SelectQueryBuilder orderBys.direction
export enum QueryBuilderSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export enum QueryBuilderSortBy {
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

  @ApiProperty({ required: false, enum: QueryBuilderSortBy })
  @IsEnum(QueryBuilderSortBy)
  sortBy: QueryBuilderSortBy; // groupBy
  @ApiProperty({ required: false, enum: QueryBuilderSortDirection })
  @IsEnum(QueryBuilderSortDirection)
  sortDirection: QueryBuilderSortDirection; // orderBy
}
