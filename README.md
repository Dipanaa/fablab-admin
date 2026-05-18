# 🛡️ FabLab INACAP Maipú - Administrador (Intranet & Mobile)

Este repositorio engloba el núcleo de **Gestión Operativa** del sistema FabLab INACAP Maipú. Incluye la Intranet Web y la Aplicación Móvil administrativa, herramientas dedicadas exclusivamente a líderes, encargados y profesores para manejar inventario, recursos y el ciclo de vida de los proyectos.

## 🛠️ Stack Tecnológico
* **Intranet Web:** Angular 19, TypeScript, Tailwind CSS 4.0
* **App Móvil:** Flutter, Dart
* **Analítica e IA:** Integración proyectada con Gemini 2.5-flash

## 📐 Arquitectura y Patrones de Diseño
* **Arquitectura Web-Mobile Desacoplada:** Ambos clientes operan independientemente consumiendo la misma Web API RESTful centralizada, asegurando consistencia de datos sin importar el canal de acceso.
* **Patrón MVVM (Model-View-ViewModel):** Aplicado en la solución móvil (Flutter) para separar la Interfaz de Usuario (View) de la lógica y estado (ViewModel). Mejora drásticamente la capacidad de testeo unitario y la reutilización de reglas de negocio.
* **State Management y Reactividad:** Implementación de componentes reactivos para un repintado de UI eficiente; en móvil utilizando motor Skia, asegurando transiciones nativas a 60FPS.
* **Inyección de Dependencias (DI):** Totalmente aplicado en la web mediante Angular Services y en la app móvil mediante proveedores de estado.

## ⚙️ Principales Implementaciones
* **Autenticación y Seguridad (JWT):** Inicio de sesión estrictamente protegido mediante *JSON Web Tokens* provistos por el backend, incluyendo gestión de expiración de sesión y segmentación granular por Roles (Miembro, Administrador).
* **Dashboards y KPIs en Tiempo Real:** Paneles de visualización estadística que ilustran el uso del laboratorio, la cantidad de participantes activos y el ciclo de vida de los proyectos, favoreciendo la toma de decisiones apoyada en métricas operativas.
* **Gestión Integral y Trazabilidad (CRUD Completo):** * **Inventario:** Control estricto de materiales e insumos, incorporando alertas visuales ante niveles críticos de stock.
  * **Usuarios y Solicitudes:** Módulo de aprobación para nuevos ingresos al laboratorio, gestión de altas/bajas de miembros y actualización de información.
  * **Proyectos:** Creación de proyectos colaborativos, definición y seguimiento de "hitos" (hoja de ruta del proyecto) y actualización de estados.
* **Movilidad Estratégica:** App móvil para Android diseñada para ejecutar verificaciones rápidas de inventario y aprobaciones urgentes directamente en terreno.

## 📋 Metodología y Estándares
* Construido con miras al cumplimiento de un nivel de servicio estricto (**SLA**), priorizando tiempos de carga del DOM web inferiores a 3 segundos, y respuesta de aplicación móvil inferior a 4 segundos.

## Imagenes Destacadas

<img width="997" height="557" alt="image" src="https://github.com/user-attachments/assets/2a40729b-0bc8-4dbd-8df2-8783c05b291d" />

<img width="1010" height="510" alt="image" src="https://github.com/user-attachments/assets/94cb6d74-6853-4ee0-ad17-9e768742071e" />

<img width="1015" height="511" alt="image" src="https://github.com/user-attachments/assets/eb051886-789e-4c5c-a492-428bfe245155" />

<img width="974" height="493" alt="image" src="https://github.com/user-attachments/assets/0b243c94-9b3c-44b3-bf51-24486246436d" />


