# Desarrollo Web Fullstack 2023

Proyecto 4 - Aplicación Web para un restaurante

1. Crear el proyecto React JS
    - Ejecuta en la consola: `npm create vite@latest`

2. Cambiarse a la carpeta del proyecto
    - Ejecuta en la consola: `cd .\dwfs23-proy4-restaurante\`

3. Instalar paquetes y/o dependencias iniciales
    - Ejecuta en la consola: `npm install`

4. Instalar React Router Dom
    - Ejecuta en la consola: `npm i react-router-dom`

5. Instalar Bootstrap
    - Ejecuta en la consola: `npm i bootstrap`
    - Alternativamente puedes instalar y usar React Bootstrap:
      - Ejecuta en la consola: `npm i react-bootstrap bootstrap`

6. Ejecutar la aplicación
    - Ejecuta en la consola: `npm run dev`

7. Agregar Componentes
    - Si estás usando VS Code, puedes agregar la siguiente extension:
      - Extension: [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
    - Usa la abreviatura `rafce` para construir la estructura de cada componente.

8. Instalar y configurar Firebase
    - Ejecuta en la consola: `npm i firebase`
    - Agregar configuración firebase a archivo .env
    - Crear archivo firebase.js y actualizar la configuración obtenida desde Google Firebase Console sustituyendo el valor de las variables con las variables de entorno en .env

9. Instalar Bootstrap Icons
    - Ejecuta en la consola: `npm install react-bootstrap-icons --save`

10. Instalar Sweet Alert 2
    - Ejecuta en la consola: `npm i react-sweetalert2`
    - Agregar al componente: `import Swal from 'sweetalert2';`

11. Conversión a PWA (Progressive Web Application)
    [Vite PWA](https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html)
    - Instalar Vite Plugin PWA  
        - Ejecutar en la consola: `npm install -D vite-plugin-pwa`
        - Atienda las recomendaciones si se presenta el mensaje 2 low/high/severity severity vulnerabilities
        - Ejecute en la consola: `npm audit fix --force`
    - Configurar vite.config.js:
        - Agregue `import { VitePWA } from 'vite-plugin-pwa'`
        - En el export / plugins, agregue `VitePWA({ registerType: 'autoUpdate' })`
        - Modo developer: `VitePWA({ registerType: 'autoUpdate', devOptions: {enabled: true} })`
    - Para registrar automáticamente el service worker:
        - Agregar `injectRegister: 'auto'`
12. Instalar axios
    - Ejecutar en la consola: `npm install axios`
    - Hay un detalle con sweet alert 2 (revisar por temas de seguridad informática), entonces se debe usar `npm install axios --force`

12. Recursos:
    - [React Bootstrap](https://react-bootstrap.netlify.app/)

    - [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

    - Photos e images
        - [PX here](https://pxhere.com/)

        - [Picsum](https://picsum.photos/)

        - [Pixabay](https://pixabay.com/photos/)

    - IA Images
        - [Fotor](https://www.fotor.com/images/create)

    - Github

        - [DWFS23 Proyecto 4 - Restaurante](https://github.com/U-Camp/BOOT-M2-SEM16-PROY4)

        - [Este Proyecto](https://github.com/MarioLara76/dwfs23-proy4-tonyspizza)

    - Firebase
        - [Firebase Console](https://console.firebase.google.com/)
        - [Este proyecto](https://console.firebase.google.com/u/0/project/dwfs23-demo/overview)

    - Api food
        - [Calorie King](https://www.calorieking.com/us/es/developers/food-api/documentation/#food-ordering-and-grouping)

    - Api Abstract Validate Email
        - [Abstract API](https://app.abstractapi.com/api/email-validation/tester)