import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import localeEsCl from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';



//Registro de Date en Chile
registerLocaleData(localeEsCl, 'es-CL')


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
     importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          // Reemplaza con tus dominios reales
          allowedDomains: ['tudominioapi.com', 'localhost:5000'],
        },
      })
    ),
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    }
    ]
};


//Obtencion del token donde se almacena
export function tokenGetter() {
  return localStorage.getItem('token');
}
