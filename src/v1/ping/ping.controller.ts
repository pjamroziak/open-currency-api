import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller({
  path: 'ping',
  version: '1',
})
class PingController {
  @Get()
  ping(): string {
    return 'Server is running!';
  }
}

export default PingController;
