import { HttpStatus } from "@nestjs/common";

export class SurveyNotFoundException extends Error {
  public status: HttpStatus;
  public message: string;

  constructor(message: string = 'Survey not found', status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message);
    this.status = status;
    this.message = message;
  }
}