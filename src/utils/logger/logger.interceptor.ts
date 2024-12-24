import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  /**
   * Se ejecuta en cada petición de los usuarios
   * @param context Contexto de la ejecución
   * @param next la función manejadora del controlador
   * @returns
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('antes...');
    // console.log(Object.keys(context));
    // console.log(context['contextType']);
    // console.log(context.getArgs());
    // console.log(context.getArgs()[0]);
    const [req, res] = context.getArgs();
    console.log('antes...', req.params, req.ip, req.host);

    // permite que el flujo continúe de forma natural
    return next.handle().pipe(tap((value) => console.log('respuesta:', value)));
  }
}
