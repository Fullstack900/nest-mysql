import { Controller, Get, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Get()
  async sendNotification(@Request() req) {
    const {
      title,
      body,
      imageUrl,
      sendToSpecificDeviceToken,
      sendToTopic,
    } = req.body;

    try {
      const response = await this.notificationsService
        .sendNotification(
          { title, body, imageUrl },
          { sendToTopic, sendToSpecificDeviceToken },
        );

      if (response) {
        return {
          status: true,
          message: 'Notification has been sent.'
        }
      }

      return {
        status: false,
        message: response
      }

    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}
