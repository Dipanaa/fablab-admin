import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authToken = inject(AuthService).tokenJWT();

  if(!authToken){
    const newReq = req.clone({

      headers: req.headers.append("Authorization", `Bearer `),
    });
    return next(newReq);
  }

  const newReq = req.clone({
    headers: req.headers.set("Authorization", `Bearer ${authToken}`),
  });
  return next(newReq);
}
