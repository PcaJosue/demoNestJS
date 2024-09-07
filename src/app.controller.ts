import { Controller, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";

const code: { name: string; code: string } = {
  name: "communications",
  code: "COM-02",
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get("phase-change-diagram")
  getPressure(@Query('pressure') pressure: string): any {
    const pressureValue = parseFloat(pressure);
    return {
      "specific_volume_liquid": parseFloat((((pressureValue - 0.05)/4975)+0.0015).toFixed(4)),
      "specific_volume_vapor": parseFloat(((10.00116 - pressureValue)/0.3317).toFixed(4))
    }
  }


  @Get("/status")
  getStatus(): {damaged_system :string} {
    return {"damaged_system" : code.name}
  };

  @Get("/repair-bay")
  getPage():String{
    return `
      <!DOCTYPE html>
        <html>
          <head>
            <title>Repair</title>
          </head>
          <body>
            <div class="anchor-point">${code.code}</div>
          </body>
      </html>
    `;
  }

  @Post('/teapot')
  handleTeapot():void{
    throw new HttpException("I'm a teapot", HttpStatus.I_AM_A_TEAPOT);
  }

  

}
