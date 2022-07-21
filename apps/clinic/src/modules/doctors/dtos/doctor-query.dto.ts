import { ApiProperty } from '@nestjs/swagger';

// Find way how to import it from SelectQueryBuilder orderBys.direction
export type QueryBuilderSortDirection = 'ASC' | 'DESC';

export class DoctorQueryDto {
  @ApiProperty({ required: false })
  search: string;

  @ApiProperty({ required: false })
  offset: number;
  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  sortBy: string; // groupBy
  @ApiProperty({ required: false })
  sortDirection: QueryBuilderSortDirection; // orderBy
}
