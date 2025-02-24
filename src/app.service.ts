import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <html>
        <head>
          <title>Bem-vindo à API</title>
          <style>
            body { background-color: #1b1b1b; font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #007bff; }
            p { font-size: 18px; color: #555; }
          </style>
        </head>
        <body>
          <h1>Bem-vindo à API de Produtos</h1>
          <p>Explore os endpoints no <a href="/api/docs">Swagger</a>.</p>
        </body>
      </html>
    `;
  }
}
