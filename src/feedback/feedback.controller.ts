import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user-decorator';
import { UserPayload } from '../auth/jtw.strategy';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback-dto';
import { FeedbackDto } from './dto/feedback-dto';

@Controller('feedback')
@ApiTags('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get('empresa')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: [FeedbackDto],
    description: 'Obter feedbacks da empresa',
  })
  getAll(@CurrentUser() currentUser: UserPayload): Promise<FeedbackDto[]> {
    return this.feedbackService.getAll(currentUser);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Criar feedback',
  })
  register(
    @Body() dto: CreateFeedbackDto,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<void> {
    return this.feedbackService.create(dto, currentUser);
  }
}
