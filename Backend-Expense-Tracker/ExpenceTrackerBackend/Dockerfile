FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# Fix line endings just in case
RUN sed -i 's/\r$//' mvnw
RUN chmod +x mvnw
# Download dependencies
RUN ./mvnw dependency:go-offline

COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Run the application
CMD ["java", "-jar", "target/ExpenceTrackerBackend-0.0.1-SNAPSHOT.jar"]
