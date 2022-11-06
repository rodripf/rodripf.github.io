---
title: Country Hint
excerpt: Un videojuego de geografía con pistas generadas por inteligencia artificial
layout: post
toc: true
type: project
subtype: ds
carousel: false
featured: true
image: assets/images/2022/11/country-hint-2.jpg
permalink: /project/country-hint/
category: [Artificial Intelligence, Videogame, Web]
tags: [videogame, web, geography, openAI, gpt-3]
---
Si antes de leer lo quieres jugar, <a href="https://countryhint.com/" target="_blank">haz click aquí</a>.

## Introducción

GPT-3 es una inteligencia artificial de interpretación del lenguaje natural y multipropósito, desarrollada por OpenAI y
puesta a disposición del público en general.

Después de jugar por horas y conversar con GPT-3 de diversos temas, decidí darle uso en algún proyecto que tuviera una
utilidad real.

## El proyecto

Hacía tiempo que no desarrollaba un juego, por lo que me pareció la oportunidad perfecta para desarrollar uno cuyo
contenido fuera generado enteramente por la Inteligencia Artificial.

Inspirado por mi esposa Carolina, y su gusto por la geografía, decidí hacer un juego para adivinar países. Tomé como
referencia el formato de juegos de geografía como [CountryLE](https://countryle.com/), 
[Worldle](https://worldle.teuteuf.fr/), [Globle](https://globle-game.com/)
y [Nationle](https://nationle.herokuapp.com/). Estos juegos son muy sencillos: el reto es descubrir el país secreto del
día mediante pistas, usando distintos estilos y mecánicas.

Me propuse lo mismo, pero con pistas generadas por Inteligencia Artificial.

## Las pistas

Todos esos juegos utilizan bases de datos públicas y conocidas para sus pistas: coordenadas geográficas, superficie,
población, capitales, etc. Pero yo quería utilizar Inteligencia Artificial, no las tradicionales bases de datos, así que
le pedí amablemente a GPT-3 que genere pistas para mi juego.

Con la simple instrucción "genera 5 pistas difíciles para poder adivinar el país *Nombre del país* sin nombrarlo", GPT-3
fue capaz de generar, para cada país, 5 pistas en lenguaje natural. El resultado fue sorprendente. Las pistas son casi
indistinguibles de lo que una persona habría podido escribir y abarcan mucho más que cifras y capitales. Destacan pistas
como:

- "El país con la monarquía más antigua del mundo."
- "El país sin salida al mar de mayor tamaño."
- "Este país está liderado por un gobierno comunista."

Estas son solo 3 entre muchísimas otras pistas geniales que generó para cada uno de los 198 países del juego. Cinco
pistas para cada país. Para verlas todas ¡hay que jugar!

## El juego

Ya con las pistas generadas de forma cuasi mágica, toca diseñar el juego. Momento de pulir las habilidades de *
frontend y game developer*! Decidimos con Caro que fueran 3 las variables que gobiernan el juego:

- Tiempo: se disponen de 5 minutos para adivinar.
- Pistas: se van mostrando de a una, a demanda del jugador y son hasta 5.
- Vidas: se pierden con cada intento erróneo. El jugador dispone de 5 vidas para acertar.

El jugador gana si adivina el país en el tiempo y con las pistas disponibles. Si se le acaban las vidas o el tiempo,
pierde.

Con esto en mente y usando los componentes de Material UI, el diseño quedó de esta manera:

![Pantalla principal del juego](/assets/images/2022/11/country-hint-1.jpg)

## El desarrollo

Como siempre en cada proyecto, uno de mis objetivos es obtener un producto final de alta calidad, utilizando tecnologías
en la cresta de la ola. Este caso no fue la excepción.

Debía crear una app web, desarrollada mobile first, que corriera perfecto tanto en mobile como desktop. Que cargue en el
instante. Que, además, fuera una aplicación instalable. ¡Que fuera atractiva y que dieran ganas de jugarla! Además,
utilizar integración y despliegue continuo, analíticas de uso y rendimiento, y que fuera accesible para todo el mundo.

Para lograrlo utilicé como framework NextJS, que me permite crear aplicaciones web con React, con Server Side Rendering
para optimizar los tiempos de carga. Generé además una aplicación PWA para que fuera instalable en todos los
dispositivos que soportan esta tecnología. El deployment lo hice en servidores gratuitos de Vercel, que se encargan de
optimizar el delivery de la app con su CDN y caché automatizada. Además Vercel se encarga de los certificados TLS y la
protección en contra de ataques.

Un toque de íconos Material Design, un poco de animaciones con tsParticles y ¡el juego quedó pronto!

## El resultado

El resultado es un juego divertido, con pistas increíbles generadas por inteligencia artificial. El juego se puede jugar
e instalar desde [https://countryhint.com/](https://countryhint.com/)

Actualmente solo se encuentra disponible en inglés, pero como GPT-3 también funciona en español, no va a ser difícil
traducirlo.

¡Espero que el resultado les divierta tanto como a mí!

## Conclusión

GPT-3 es una herramienta increíble. Es capaz de generar contenido de forma casi mágica. Es una herramienta que permite
generar cantidades enormes de contenido a una velocidad inimaginable y con un muy bajo costo. Pistas de juegos de
preguntas y respuestas es solo una mínima muestra de las posibles aplicaciones como ayuda en redacción de documentos,
redacción de noticias, generación de contenido para blogs, publicidades, chatbots realmente inteligentes y útiles. Esto
no tiene límites.

