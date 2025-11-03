import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(withFetch()),
     importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          // Reemplaza con tus dominios reales
          allowedDomains: ['tudominioapi.com', 'localhost:5000'],
        },
      })
    ),
    ]
};


//Obtencion del token donde se almacena
export function tokenGetter() {
  return localStorage.getItem('token');
}
