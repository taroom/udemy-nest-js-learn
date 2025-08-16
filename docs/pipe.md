# Pipe

pipe bisa bertugas untuk transformasi data atau bisa juga validasi, pipe bisa mengembalikan data asli atau data yang sudah dimodifikasi di pipe. pipe beroperasi di parameter/argument pipe biasany bisa kita letakkan di controller pada bagian route handler

```ts
@Get()
routeHandler(lokasi pipe){
  // routeHandler body
}
```

contoh penggunaan pipe, level parameter:

```ts
@Get()
transaksi(@Body('some-body', PipeContoh)){
  // routeHandler body
}
```

atau bisa juga seperti ini, level handler

```ts
@Get()
@UsePipes(PipeContoh)
transaksi(){
  // routeHandler body
}
```

atau bisa juga global pipe, yang ditaruh di main.ts

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(PipeContoh);
  await app.listen(3000);
}
bootstrap();
```

pipe bisa melemparkan exception loh ya, yang akan diurus oleh nest js dan akan dikembalikan ke client melalui error response. pipe bisa juga asynchronous, selain itu kita bisa membuat pipe custom, selain yang disediakan nest

berikut contoh penggunaan pipe yang sering digunakan

```ts
import { Controller, Post, Body, ParseIntPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('add-age')
  addAge(@Body('age', ParseIntPipe) age: number) {
    return `Umur yang kamu kirim: ${age}`;
  }
}
```

nb: yang perlu kamu ingat adalah body yang dikirim dari client bertype string, maka untuk mengubahnya (transform) kita bisa menggunakan ParseIntPipe, selain itu misalkan user mengirimkan body age dengan value **'duasatu'** daripada **21** maka pipe ini akan mengembalikan error response
