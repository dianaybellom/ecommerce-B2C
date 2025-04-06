# 🛒 Plataforma ecommerce-B2C

Este proyecto es una plataforma e-Commerce B2C desarrollada inicialmente con **HTML5, CSS3 y JavaScript**, y actualmente evolucionada a una aplicación moderna con **React**, **TypeScript** y **Vite**.

La interfaz permite a los usuarios navegar por el catálogo, autenticarse, gestionar sus pedidos y comunicarse con un asistente virtual (chatbot). Se conecta a una API RESTful desarrollada con CodeIgniter 4 y PHP (Mán info en [Sobre el Backend](#️-sobre-el-backend)).

Entre sus características principales destacan:

- Autenticación de usuarios con distinción de roles (SHOPPER y ADMIN).
- Registro y login con validaciones en tiempo real.
- Carrito de compras con actualización dinámica.
- Creación y visualización de pedidos por parte de los clientes.
- Vista de gestión de pedidos exclusiva para administradores.
- Panel de administración con operaciones de Crear, Leer, Actualizat y Eliminar para productos y pedidos.
- Integración con un chatbot basado en la API de OpenAI.
- Diseño responsive para dispositivos móviles y escritorio.


## 📚 Tabla de Contenidos
- [Sobre el Backend](#-sobre-el-backend)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Funcionalidades y Capturas de Pantalla](#-funcionalidades-y-capturas-de-pantalla)
  - [Landing Page](#landing-page)
  - [Autenticación de Usuarios](#autenticación-de-usuarios)
    - [Registro de Usurios](#formulario-de-registro)
    - [Login](#login)
  - [Gestión de Compras por Clientes](#gestión-de-compras-para-clientes)
    - [Carrito de Compras](#carrito-de-compras)
    - [Pedidos](#pedidos)
  - [Chatbot](#chatbot)
  - [Gestión Administrativa](#gestión-administrativa)
    - [Dashboard](#dashboard-acceso-móvil)
    - [Gestión de Productos](#gestión-de-productos)
    - [Getsión de Pedidos](#pedidos)
- [Instrucciones para Ejecutar](#-instrucciones-para-ejecutar)
  - [Ejecución Local](#ejecución-local)
  - [Ejecución AWS](#ejecución-aws)
- [Desafíos Enfrentados](#-desafíos-enfrentados)
- [Contacto](#-contacto)

## 🗄️ Sobre el Backend
El backend de este proyecto se encuentra en el repositorio https://github.com/dianaybellom/ecommerce-B2C-backend.

_La variable de entorno `VITE_API_URL` en el archivo .env de este proyecto debe apuntar a la URL base del backend para utilización de los endpoints._

## 🚀 Tecnologías Utilizadas
- React
- TypeScript
- Vite
- Tailwind CSS
- HTML5, CSS3 & JS (versión inicial)

## 🖥️ Funcionalidades y Capturas de Pantalla
### Landing Page
  #### Desktop
![pantalla inicial](https://github.com/user-attachments/assets/056764a8-9947-4396-a3b3-38bb8ccdd876)

  #### Móvil
![Untitled design](https://github.com/user-attachments/assets/b48fa293-5c30-4e63-8b8c-97785e98ea12)
![Untitled design (1)](https://github.com/user-attachments/assets/b0b17710-6bf6-4cd8-a098-130081f15209)

### Autenticación de Usuarios
La aplicación implementa un sistema de autenticación basado en sesiones. Los usuarios deben autenticarse para poder realizar pedidosy consultar su historial de compras. Los administradores, además, pueden acceder a la sección de gestión administrativa.

 - El registro de usuarios se realiza a través de un formulario con validaciones en tiempo real (formato de correo, contraseña segura, campos obligatorios, etc.).
  - El inicio de sesión valida las credenciales contra la API backend y, si es exitoso, almacena la sesión del usuario en el navegador.
  - El sistema distingue entre usuarios SHOPPER (clientes) y ADMIN (administradores), y ajusta la navegación y permisos de acceso en función del rol.
  - Las rutas protegidas utilizan lógica condicional basada en la sesión activa y el rol del usuario, evitando el acceso no autorizado.

  #### Formulario de Registro
El registro consume el endpoint de autenticación del backend (/register). Se cuenta con un formulario para la creación de clientes con validaciones en tiempo real. 

Las validaciones implementadas fueron:
- Campos obligatorios (nombre, correo, contraseña, etc.).
- Validación de formato de correo.
- Contraseña segura (mínimo 8 caracteres, una mayúscula y un número).
- Coincidencia entre correo y confirmación / contraseña y confirmación.
- Feedback visual inmediato por campo.
- Mensajes tipo “toast” al usar el botón de registro.

![Mockup Desktop - RegisterForm Ecommerce B2C](https://github.com/user-attachments/assets/5c78a03a-d06a-4120-9fa2-8a7e56eb1265)

  #### Login
El login consume el endpoint de autenticación del backend (/login). Se valida que el usuario exista y coincidan las credenciales. Si el login es exitoso, se almacena la sesión y se redirige al dashboard correspondiente según el rol.

// TODO: Agregar imagen

### Gestión de Compras para clientes 
  #### Carrito de compras
- Los usuarios pueden agregar productos al carrito desde la página principal o la vista de producto individual.
- El estado del carrito se almacena en memoria (React context).
- El ícono del carrito muestra la cantidad total de productos seleccionados.
- Desde el carrito, se puede aumentar/disminuir cantidades o eliminar productos.

// TODO: Agregar imagen

  #### Pedidos
- Al utilizar el botón 'Crear pedido' desde el carrito, se genera un nuevo pedido utilizando el enpoint /pedido.
- El pedido incluye todos los productos seleccionados, cantidades y precios.
- Los usuarios pueden consultar el historial de sus pedidos desde la opción "Mis Pedidos" y ver el detalle de cada pedido (se utiliza el endpoint /pedido/{id}).

// TODO: Agregar imagen

### Chatbot
- El chatbot fue implementado como un componente flotante accesible desde cualquier pantalla.
- Utiliza el endpoint /chatbot del backend, que a su vez consume la API de OpenAI.
- Permite hacer preguntas como “¿Qué blusas tienes disponibles?” o “¿Cuánto cuesta la Robe Sakura Dreams?”
- Las respuestas son generadas en tiempo real con base en los productos cargados en la tienda.

// TODO: Agregar imagen

### Gestión Administrativa
- Diseño responsivo para móviles y escritorio
- Acceso administrativo desde la página general: Uso de react-router-dom para navegar sin recargar la página.

  #### Dashboard (Acceso Móvil)
// TODO: Agregar imagen

  #### Gestión de Productos
- Página para listar productos.
- Página para crear producto.
- Página para editar producto.
- Toasts informativos con duración automática.
- Búsqueda de productos por nombre.
- Validación de nombre, categoría y precio antes de enviar el formulario.

// TODO: Agregar imagen

    ##### Con json-server
- Gestión de productos (CRUD completo): productService.ts encapsula toda la lógica RESTful: GET, POST, PUT, DELETE.
- Simulación de backend con JSON Server: uso de fetch (AJAX) para consumir un backend falso (json-server).

    ##### Con API
- Gestión de productos (CRUD completo): productService.ts encapsula toda la lógica RESTful: GET, POST, PUT, DELETE. Ver repositorio backend para más información.

  #### Gestión de Pedidos
- Vista exclusiva para administradores.
- Lista todos los pedidos realizados por todos los usuarios.
- Se puede consultar el detalle de cada pedido, incluyendo los productos y su cantidad.
- El administrador puede actualizar el estado del pedido a cualquiero estado: Confirmado, En proceso, Enviado, Entregado, Cancelado.
- El administrador puede eliminar o modificar la cantidad de items de un pedido.
// TODO: Agregar imagen

## 📌 Instrucciones para Ejecutar

### Ejecución local
Para ejecutar este proyecto de forma local, siga los pasos a continuación:

1. Clonar el repositorio: git clone https://github.com/dianaybellom/ecommerce-B2C.git
2. Instalar dependencias del frontend:
  ```bash
  cd frontend
  npm install
  ```
3. Ejecutar servidor de desarrollo:
  ```bash
  npm run dev
  ```
4. Ir a http://localhost:5173/ en tu navegador (o el puerto indicado al ejecutar el servidor)

### Ejecución AWS
Para desplegar este proyecto en un servidor EC2 de AWS, siga los pasos a contuación:
1. Crear instancia EC2 y preparar el entorno.
    - Tipo: t3.medium con Ubuntu 22.04
    - Instalar Apache2
    - Habilitar puertos 80 (HTTP) y 22 (SSH) en el grupo de seguridad.
    - Guardar key .pem.
2. Acceder a la terminal de la instancia con la .pem (en mi caso, usé MobaXterm) y clonar el repositorio en la raiz `~/ecommerce-B2C/frontend`.
3. Reinstalar las dependencias por si acaso.
  ```bash
  npm install
  ```
4. Configurar variable VITE_API_URL en el archivo .env con la URL del API del backend
  ```bash
  VITE_API_URL=http://hostname/api/
  ``` 
5. Generar build de producción
  ```bash
  npm run build
  ``` 
6. Instalar Apache en EC2 (si no lo tiene)
  ```bash
  sudo apt update
  sudo apt install apache2
  ``` 
7. Configurar Apache:
    - Crear el archivo de configuración para que trabaje como servidor de SPA
      ```bash
      sudo nano /etc/apache2/sites-available/000-default.conf
      ```
      Contenido:
      ```bash
      <VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html
        <Directory /var/www/html>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>
      </VirtualHost>
      ```
    - Luego ejecutar:
      ```bash
      sudo a2enmod rewrite
      sudo systemctl restart apache2
      ```
8. Agregar archivo .htaccess en /var/www/html/ con el siguiente contenido (Para que la rutas funcionen correctamente como SPA):
    ```bash
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
    ```
9. Reiniciar apache con `sudo systemctl restart apache2` y acceder a la aplicación: Abra en el navegador: http://hostname

## 🔥 Desafíos Enfrentados
- Diseño responsivo.
- Migración desde HTML/CSS plano a React con Vite
- Validación de sesión de usuario para mostrar opción de pedidos y cierre de sesión o redirección a la página de accesos.
- Limpieza de caché de carrito luego de realizado un pedido.
- Integración con chatbot.
- Despliegue en AWS por enrutamiento incorrecto en AWS versus la estructura del proyecto.

## 📝 Disclaimer
Este proyecto ha sido desarrollado con el apoyo activo de ChatGPT, un modelo de lenguaje de inteligencia artificial creado por OpenAI.

Debido a mi limitado expertise en desarrollo de software, creé un GPT como asistente de desarrollo, para:
- Generar código base funcional
- Resolver errores y mensajes de compilación
- Explicar buenas prácticas

Este es el link del GPT creado: https://chatgpt.com/g/g-67cda8de6b7c8191a38f6722c69cbf4c-cse642-soft-development-expert
  
## 📫 Contacto
dianabellomejia_@hotmail.com
