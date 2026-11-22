# Residencias La Arena — Portal & Aplicación Web de Alquiler

Aplicación web interactiva, moderna y de alto impacto visual para la promoción y gestión de alquileres del apartamento en **Residencias La Arena**, Playa Moreno, Pampatar, Municipio Maneiro, Edo. Nueva Esparta (Isla de Margarita).

Desarrollada para compartir un enlace directo con clientes vía WhatsApp, Instagram o correo, donde pueden ver fotos, descripción, tarifas vacacionales, alquiler fijo, disponibilidad, reglas de convivencia y contactar con un solo clic.

---

## 🌟 Características Principales

1. **Titular y Entrada de Gran Impacto (según audios de China):**
   - *"Hermoso Apartamento Frente al Mar en la distinguida zona de Pampatar"*
   - Vista panorámica directa a Playa Moreno y Hotel Tibisay.
   - Estado de disponibilidad dinámico: `🟢 Disponible para Reservas`, `🟡 Reserva en Proceso`, `🔴 Ocupado`.

2. **Doble Modalidad de Alquiler (Vacacional y Fijo):**
   - **Alquiler Vacacional:**
     - Tarifas diferenciadas: Temporada Baja ($80/noche) y Temporada Alta ($130/noche).
     - Horarios claros: Check-in 3:00 PM | Check-out 12:00 PM.
     - **Calculadora Interactiva de Estadía:** el cliente ingresa noches, temporada y huéspedes, calcula el total al instante y genera un mensaje directo para WhatsApp con la cotización lista.
   - **Alquiler Fijo:**
     - Canon: **$900 / mes** (¡Condominio incluido!).
     - Depósito en garantía: **$1,800** (2 meses).
     - Contrato a 6 meses renovable.
     - Servicios por cuenta del inquilino (luz, wifi) y mantenimiento preventivo de A/A cada 3 meses.
     - Botón de postulación directa a WhatsApp.

3. **Galería Fotográfica Completa (21 Fotos de Alta Resolución):**
   - Filtros por categoría: Todas, Vista al Mar, Áreas Sociales, Cocina & Isla, Habitaciones, Baños, Servicios y Reglamentos.
   - Visualizador **Lightbox interactivo en pantalla completa** con navegación por flechas, teclado y swipe en móviles.

4. **Zona del Huésped & Conectividad:**
   - Tarjeta oficial de **WiFi DATALINK**: Red `Emi`, Contraseña `Emi.4624`.
   - Botón de un toque para copiar la clave.
   - Código QR oficial para conexión automática desde la cámara del celular.
   - Contactos de Propietarios: `0414-3336722` y `0412-3598243`.

5. **Reglamentos y Normativas (Extraídas del PDF oficial):**
   - Normas del Apartamento (no fumar, no fiestas, no ruidos molestos, check-out 12:00 PM).
   - Normas de la Piscina (horario 9:00 AM a 10:00 PM, no botellas de vidrio, ducha obligatoria, etc.).
   - Normas del Condominio Residencias La Arena (vigilancia 24/7, identificación, áreas comunes).

6. **Garantía y Tranquilidad del Suministro de Agua:**
   - Tanque cilíndrico de 1.000 L con bomba hidroneumática.
   - Nota explicativa del suministro diario a las 7:00 a.m. y 6:00 p.m. por 15 min que garantiza agua continua 24/7.

7. **Formas de Pago Aceptadas:**
   - Dólares en Efectivo, Bolívares (Pago Móvil / Transferencia), Zelle, Banesco Panamá y Binance Pay (USDT).
   - Datos oficiales de cuenta de condominio en Banesco con botón para copiar número y RIF.

8. **Panel de Gestión Rápido para Propietarios (Admin Mode):**
   - Botón discreto en barra superior o footer con icono de ajustes (`⚙️` / `sliders`).
   - Permite cambiar el estado de disponibilidad en un segundo.
   - Permite ajustar los precios de temporada baja, alta y alquiler fijo.
   - Botón *"Copiar Enlace con estos Precios para WhatsApp"* para compartir cotizaciones personalizadas mediante parámetros URL.

9. **Optimizado al 100% para Móviles:**
   - Barra flotante inferior en teléfonos con tarifa visible, botón de llamada y botón verde de WhatsApp.

---

## 🚀 Cómo Probarla Localmente

### Opción 1: Servidor Integrado Node.js
Ejecuta en la terminal de la carpeta del proyecto:
```bash
node server.js
```
Abre tu navegador en:
```
http://localhost:3000
```

### Opción 2: Abrir Directamente en el Navegador
Puedes hacer doble clic en el archivo `index.html` y se abrirá directamente en Google Chrome, Edge o Safari sin requerir servidores ni dependencias.

---

## 🌐 Cómo Publicarla en Internet (Para mandar el link a clientes)

### Con Vercel (Recomendado - Gratis y Rápido):
1. Si tienes cuenta en [Vercel.com](https://vercel.com), puedes arrastrar la carpeta o vincularla a tu GitHub.
2. O mediante la terminal con:
   ```bash
   npx vercel
   ```
   Recibirás un enlace público tipo `https://apartamento-la-arena.vercel.app` para compartir por WhatsApp.

---

## 📁 Estructura del Proyecto

```
alquileres CHina/
├── images/                         # 21 fotografías organizadas y optimizadas
│   ├── vista-panoramica-mar.jpg
│   ├── vista-general-social.jpg
│   ├── comedor-vista-mar.jpg
│   ├── cocina-isla.jpg
│   ├── habitacion-principal.jpg
│   ├── habitacion-2.jpg
│   ├── bano-1.jpg
│   ├── bano-2.jpg
│   ├── wifi-qr-code.jpg
│   ├── normas-piscina.jpg
│   └── ...
├── index.html                      # Portal web interactivo principal
├── styles.css                      # Estilos de lujo y animaciones
├── app.js                          # Lógica interactiva, calculadora y admin
├── images-data.js                  # Catálogo de fotos y metadatos
├── server.js                       # Servidor local Node.js sin dependencias
├── vercel.json                     # Configuración de despliegue en Vercel
├── package.json                    # Metadatos del proyecto
├── NORMAS GENERALES...pdf          # Reglamento original de asamblea de propietarios
└── README.md                       # Documentación
```
