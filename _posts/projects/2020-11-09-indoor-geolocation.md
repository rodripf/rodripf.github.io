---
title: Geolocalización en interiores
excerpt: Identificación de la posición del usuario utilizando machine learning
layout: post
toc: true
type: project
subtype: ds
carousel: true
featured: true
image: assets/images/2020/11/indoor_gps.jpg
permalink: /project/indoor-geolocation/
category: [Artificial Intelligence, Data Analysis]
tags: [RapidMiner, data science, data mining]
---

## Introducción
La geolocalización en interiores, es decir, en aquellos lugares donde donde la señal de GPS se ve ocluída por techos y paredes, es actualmente utilizada para múltiples fines: mapas de ubicación para clientes de grandes superficies (tiendas, malls, hoteles, aeropuertos), análisis de comportamiento de clientes y personal, trazabilidad de mercadería entre otros.

El problema de la geolocalización en interiores ha sido estudiado y resuelto utilizando múltiples tecnologías, siendo actualmente la más popular la utilización de dispositivos bluetooth, instalados en puntos estratégicamente seleccionados del edificio en cuestión[^1]. Pero con esta y otras tecnologías es requerida la instalación, inventariado y mantenimiento de hardware específico y la infraestructura eléctrica y de red necesaria para su correcto funcionamiento. Esta infrastructura representa una inversión y gasto de mantenimiento que pocas empresas están dispuestas a asumir.

En este proyecto se buscará demostrar que es posible crear un sistema de geolocalización interior sin requerir la instalación de nueva infrastructura, y por el contrario utilizar la infrastructura ya existente, propia o no, de redes WIFI.

Para esto se tomarán como pilares las siguientes dos hipótesis, que según las experiencias realizadas, resultan válidos en todos los casos:
-El edificio donde se quiere realizar la geolocalización cuenta en su interior o cercanías con decenas de routers o access point de WIFI, ya sea propios o de terceros.
-Los puntos de WIFI mencionados en el punto anterior tienen público su SSID, por lo que se encuentran continuamente emitiendo señales públicas que permiten su identificación unívoca.

Estos supuestos garantizan que en cualquier parte del edificio se tienen en alcance un gran número de señales WIFI, es posible recibir paquetes desde ellas y por consiguiente es posible medir la intensidad de señal.

La tesis de este proyecto propone que es posible determinar la ubicación de un usuario, en cualquier punto del edificio, dadas las redes WIFI a las que es capaz de acceder desde donde se encuentra y la intensidad de señal de cada una.


## Entendiendo el negocio
Las grandes superficies y los edificios de servicio en general tienen en funcionamiento decenas o cientos de routers wifi y access points distribuidos de forma más o menos uniforme. Algunos son propios del edificio, otros son de los dueños de los locales y puestos a disposición del público, otros son de uso interno para el personal. En todos los casos utilizan las dificiniciones del  estándard WIFI IEEE 802[^2].

En particular, el mencionado estándard describe al Beacon Frame[^3], un paquete de información que todos las antenas wifi, que deseen aceptar conexiones, envían periódicamente para anunciarse y que otros dispositivos puedan descubrirla. El Beacon Frame contiene información accesible sin previa autenticación que posibilita la misma. Esta información es: fecha de envío del paquete (timestamp), el intervalo de tiempo cada cuánto un nuevo paquete beacon es enviado, detalles de las capacidades del dispositivo incluyendo tipo de dispositivo, frecuencias y protocolos aceptados, el nombre identificador de la red (SSID) y la dirección MAC del dispositivo.

Con la información enviada en este paquete, cualquier dispositivo con una antena WIFI es capaz de listar todas redes WIFI dentro del alcance, obtener una identificación única de cada una (dirección MAC). Además, a partir de los decibeles con los que el paquete llegó se calcula la intensidad de la señal, que variará según la distancia a la antena y la cantidad de paredes u otros objetos que se interpongan.

Por la complejidad propia de los edificios y con una cantidad suficiente de redes WIFI esparcidas en el mismo, en cualquier ubicación dada la lista de redes WIFI accesibles y la combinación de intensidades de la misma será única.

Es posible entrenar un modelo con distintas ubicaciones en el edificio y en cada una la lista de redes accesibles y la intensidad de señal de cada una. Esto permitirá luego a partir de las redes accesibles y su intensidad predecir la ubicación.

## Entendiendo los datos

### Obtnción de los datos

Para validar la tesis, el presente proyecto se propone la realización del siguiente experimento, que a escala más pequeña será equivalente a lo que puede ser realizado en una gran superficie:

Se tomarán medidas de la intensidad de señal de redes WIFI en distintas ubicaciones de un apartamento pertenenciente a un complejo habitacional. Experimentalmente demostramos que la densidad de redes wifi en el lugar es equivalente a la que hay en un Shopping Mall de la capital.

Los datos necesarios que se registrarán serán la habitación en la que es tomada cada medida, la dirección MAC de cada red accesible y su intensidad de señal en decibeles.

Para esto se utiliza una versión adaptada de la aplicación de software abierto WiFiAnalyzer[^4], utilizando un celular android, se  toman medidas de las intensidades de WIFI recibidas por el celuar de forma periódica. Las medidas son tomadas en las distintas habitaciones del apartamento, a la vez que se registran las horas en que son tomadas, para en un segundo paso agregar información de en qué habitación fue tomada cada una.

La tabla de datos obtenidos por WiFiAnalyzer tiene la siguiente estructura:

| *Feature* 					|  Descripción 											|
|-------------------------------|-------------------------------------------------------|
| Timestamp 					| Fecha correspondiente a la captura del dato. 			|
| SSID		 					| Nombre de la red. 						 			|
| BSSID		 					| La dirección MAC del dispositivo emisor.	 			|
| Strength	 					| Intensidad de la señal en decibeles.		 			|
| Primary Channel				| Canal primario de la red.					 			|
| Primary Frequency				| Frecuencia del canal primario.			 			|
| Center Channel				| Canal central de la red. 								|
| Central Frequency				| Frecuencia del canal central.				 			|
| Width		 					| Ancho de la señal.						 			|
| Distance	 					| Distancia al dispositivo estidmada por WiFiAnalyzer   |
| 802.11mc 						| Soporte para esta versión del estándar				|
| Security	 					| Protocolo de seguridad implementado en la red.		|

Además se confeccionó la siguiente tabla para identificar el lugar donde fue tomada cada medida:
| *Feature* 					|  Descripción 											|
|-------------------------------|-------------------------------------------------------|
| ROOM							| Habitación en la que se toman las medidas	 			|
| Timestamp Inicio				| Fecha de inicio de las mediciones en la habitación.	|
| Timestamp Finance				| Fecha de fin de las mediciones en la habitación.		|



## Preparando los datos

![Captura del pre procesamiento en RapidMiner](/assets/images/2020/11/preprocesamiento.jpg)

### Join de las tablas

El primer paso de procesamiento de los datos es hacer el JOIN entre las dos tablas generadas, para que cada medición tenga su correspondiente ubicación, que será a su vez luego la variable objetivo (label) de la predicción. Se utiliza Excel para realizar el JOIN.

### Selección de predictores

No toda la información recolectada es útil para la resolución del problema. Dos dispositivos pueden compartir SSID, por lo que podrían llegar a confundirse; por esto es que se descarta esta columna. BSSID y Strength son los dos datos que más interesan al problema, por lo expuesto en puntos anteriores. Los canales, frecuencia y ancho se descartan. La distancia estimada al dispositivo está calculada a partir de Strength, por lo que están fuertemente correlacionadas; se descarta. Versión del estándard y seguridad implementada tampoco aportan al problema.

### Normalización de la información
Es necesario remover las unidades ("db") de los valores del predictor Strength y se normaliza para que contenga únicamente valores entre 0 y 1.

### Forma de la tabla
Utilizando el bloque Pivot de rapidminer, se pivotea la tabla para que la información contenida pueda alimentar el entrenamiento de un modelo de Machine Learning. Para esto debe aparecer un sample (fila) por cada medición hecha, donde cada feature (columna) sea la intensidad de señal de cada una de las redes detectadas.

Esta metodología implica entonces una columna por cada red detectada, lo que hace crecer de forma considerable la cantidad de predictores. Como las mediciones de intensidad son independientes entre sí y cada una aporta su propia información, no se considera ningún método para reducir la cantidad de predictores.

### Missing values
En cada medición solo se detecta un subconjunto del total de las redes, ya que hay puntos del apartamento donde no llegan todas. En la transfromación anterior se generaron por esta causa muchos valores faltantes, en las columnas en que la medición no detecto la correspondiente red. Para este problema se va a computar el no haber detectado la red como una fuerza de señal 0, por lo que se utiliza el componente Replace Missing Values para reemplazar por 0 los valores faltantes.


### Diferenciación y normalización
El precio de los *assets*, por lo general, muestra una tendencia alcista, desde números muy pequeños al inicio a números muy altos al final, lo que dificulta el estudio de estacionalidades.

Para evitar este problema, se estudiará el valor diferencial, lo que permitirá ver la velocidad de crecimiento y no el crecimiento en sí. Para realizar esta operación se utilizará el bloque *Differentiate* del paquete TimeSeries de *RapidMiner* y se agregarán dos columnas: una con la variación neta en el precio y otra con un porcentaje, indicando la variación relativa, siempre con respecto al día anterior.

![Tabla de datos luego del preprocesamiento](/assets/images/2020/11/data.jpg)

## Modelado

Para este proyecto y para simplificar el análisis se tratará el problema como uno de clasificación, lo que permitirá identificar en qué habitación se encuentra un usuario.
En una siguiente etapa podría tratarse como un problema de predicción, para obtener un par de coordenadas y obtener así una posición más precisa.

En primera instancia se entrenará un árbol de decisión, para tener una primera aproximación a la exactitud que se puede lograr. Luego se intentará evaluar el problema utilizando Gradient Boosted Tree, Naive Bayes y kNN. 

![Modelado](/assets/images/2020/11/modelado.jpg)

## Evaluación
Para el entrenamiento, como se cuenta con un número reducido de datos, se utiliza el bloque Cross Validation con 10 folds para cada uno de los modelos a entrenar. Para evaluar la performance de cada modelo se utiliza el bloque Classification Performance, con el indicador exactitud.

La exactitud en las predicciones obtenidos con los parámetros por defecto proporcionados por RapidMiner son los siguientes:

| Modelo 	 					|  Exactitud 											|
|-------------------------------|-------------------------------------------------------|
| Decision tree  				| 81.90%												|
| Gradient Boosted tree         | 83.33% 									 			|
| Naive Bayes	  				| 89.29%												|
| kNN			  				| 81.19%												|

El resultado obtenido con Naive Bayes es considerablemente superior, por lo que sería el algoritmo que se preferiría en caso de hacer un deploy. Naive Bayes es además una buena elección ya que escala bien en casos de gran cantidad de features[^5]. Cada red detectada en nuestro caso es una nueva feature, por lo tanto es esencial que el modelo elegido escale en este sentido,

## Conclusión

Se considera que en el presente proyecto se logró obtener una exactitud en la presición muy satisfactoria, demostrando que con machine learning es posible predecir la ubicación de un usuario utilizando la infrastrucutra WIFI existente.
El siguiente paso sería realizar una nueva recolección de mediciones, esta vez utilizando coordenadas en vez de habitaciones y tratar el problema como un caso de predicción para estimar las coordenadas en donde se encuentra el usuario.

## Referencias
[^1]: [How are beacons used for indoor navigation?](https://www.indoornavigation.com/knowledge/how-are-beacons-used-for-indoor-navigation)
[^2]: [IEEE 802.11](https://en.wikipedia.org/wiki/IEEE_802.11)
[^3]: [Beacon Frame](https://en.wikipedia.org/wiki/Beacon_frame)
[^4]: [WiFiAnalyzer](https://vremsoftwaredevelopment.github.io/WiFiAnalyzer/)
[^5]: Jason Browniee, Master Machine Learning Algorithms