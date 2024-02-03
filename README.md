
# Endpoints

Todos los endpoints son solicitudes GET y devuelven información en formato JSON

Actualmente la API tiene estos diferentes endpoints:

- **/paises** : Devuelve un listado de todos los países.

- **/random** : Devuelve un listado aleatorio de 20 países.

- **/pais/{id}** : Devuelve un país en especifico.

- **/idioma/{idioma}** : Devuelve un listado de los países con el idioma filtrado.

- **/divisa/{codigoDivisa}** : Devuelve un listado de los países que usan la divisa colocada en base al código de esta. EUR = Euro / USD = Dólar estadounidense, etc

---

- V1 = MySQL Database
- V2 = PostgreSQL Database