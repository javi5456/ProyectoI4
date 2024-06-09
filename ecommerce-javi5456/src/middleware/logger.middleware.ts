import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class loggerGlobal implements NestMiddleware{
    use(req: Request, res: Response, next: Function){
    const date = new Date().toLocaleString();
        console.log(`estas en la ruta: ${req.url} usando: ${req.method} Fecha y Hora de la consulta: ${date}`);
    
        next();
    }
}
export function loggerMiddlewareGlobal(req: Request, res: Response, next: Function){
    const date = new Date().toLocaleString();
        console.log(`estas en la ruta: ${req.url} usando: ${req.method} Fecha y Hora de la consulta: ${date}`);
        next();
}