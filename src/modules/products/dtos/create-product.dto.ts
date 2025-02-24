import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}

//post example
// {
//   "name": "Keyboard",
//   "price": 100,
//   "categoryId": 1
// }
//put example
// {
//   "name": "Mechanical Keyboard",
//   "price": 200,
//   "categoryId": 1
// }