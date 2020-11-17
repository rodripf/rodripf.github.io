---
title: Desempeño de los estudiantes
excerpt: Identificación de patrones en el desempeño de los estudiantes
layout: post
toc: false
type: project
subtype: ds
carousel: false
featured: false
image: assets/images/2020/11/report_card.jpg
permalink: /project/student-performance/
category: [Artificial Intelligence, Data Analysis]
tags: [RapidMiner, data science, data mining]
---

## Introducción
Se utilizará el dataset "Student performance in Exams", presentado en el sitio web Kaggle[^1], como ejercicio para intentar descubrir patrones en la calificación de los estudiantes con respecto a características presentadas por el conjunto de datos.

## Entendiendo los datos
Los datos que componen el dataset son los siguientes:

| *Feature* 					|  Descripción 											|
|-------------------------------|-------------------------------------------------------|
| Gender	 					| Sexo del estudiante.						 			|
| Etnicity	 					| Grupo de afinidad étnica.					 			|
| Parental education			| Nivel educativo de los padres o tutores.	 			|
| Lunch	 						| Si tiene una beca de almuerzo o no.		 			|
| Test preparation course		| Si realizó el curso general introductorio. 			|
| Math score 					| Puntaje en matemáticas.					 			|
| Reading score					| Puntaje en comprensión lectora.						|
| Writing score					| Puntaje en calidad de escritura.			 			|
{: .table }

## Preparando los datos

### Nominal to numeric

Para procesar los datos se hace una cuantización de los datos nominales. Para la educación de los padres, se pone 0 cuando no recibieron educación  hasta 4 para grado asociado. Para el almuerzo valores de 0 para quien recibe beca y 1 para quien no.

## Modelado

El primer paso a realizar será encontrar correlaciones entre los predictores realizando una matriz de correlación. 

Posteriormente se intentará encontrar grupos poblacionales con características comunes entre los estudiantes, que ayuden a entender o predecir su desempeño. Para esto primero se hará un acercamiento utilizando un KMeans, probando con diferentes números de clusters.

Como el objetivo es intenetar segmentar según el resultado en las calificaciones, luego de la normalización de los datos se aplica un escalado en los valores de calificaciones para fomentar que la creación de clústeres se en función de las mismas.


![Proceso de clustering](/assets/images/2020/11/clustering.jpg)


## Evaluación

### Matriz de correlación

![Matriz de correlación](/assets/images/2020/11/correlation.jpg)

Conclusiones interesantes sobre la matriz de correlacion:

- Los alumnos que alcanzan una buena calificación en uno de los exámenes también lo hacen en los otros dos.
- El género inclina ligeramente la balanza entre el desempeño de escritura y lectura vs desempeño en matemáticas.
- El grupo étnico no tiene influencia en el desempeño de escritura y lectura. En matemáticas tiene una influencia muy baja.

### Segmentación

Se crearon 3 clusters que discriminan según el rendimiento obtenido en los tres exámenes. 

![Matriz de correlación](/assets/images/2020/11/clusters.jpg)
![Desempeño en matemáticas según género y almuerzo](/assets/images/2020/11/gender_launch.jpg)

Es posible ver que se identificó como cluster 2 al grupo que tiene menor desempeño. También puede observarse que el cluster 2 se corresponde con una población que percibe beca de almuerzo y no asistió al curso introductorio.

Si se quisiera hacer una campaña para mejorar el promedio general de desempeño, el grupo correspondiente al cluster 2 sería un buen público objetivo, ya que tienen elementos en común bien definidos y su desempeño es significativamente menor al promedio de los estudiantes de la muestra.

## Conclusión

Fue posible observar la influencia de las distintas características poblacionales evaluadas en el desempeño de los estudiantes y distinguir un gurpo poblacional en particular al que se podría apuntar campañas de mejora.

Además se podría concluir la influencia del poder adquisitivo y la participación del curso nivelador en el desempeño final del estudiante, por lo que debería promoverse la participación del mismo y continuar fomentando la ayuda económica a los estudiantes para alivianar las problemáticas relacionadas a la economía familiar.

## Referencias
[^1]: [Jakki Seshapanpu, Students Performance in Exams](https://www.kaggle.com/spscientist/students-performance-in-exams)
