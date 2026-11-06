# Etapa 1: compilar el .jar con Maven y Java 21
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
# Se saltan los tests porque necesitan la base de datos, que no existe durante el build
RUN mvn -q package -DskipTests

# Etapa 2: imagen ligera solo con el JRE para ejecutar
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
