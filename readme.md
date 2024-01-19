# Simply paid

Simple and secure payment service between people. Side project made to get hands dirty in back-end development with node and typescript.

## 📦 Technologies

- `Node@20.0.9`
- `Typescript@5.3.3`
- `Vitest@1.2.1`

## How to run it

Using docker:

- **Build the Docker Image**: After creating the Dockerfile, you can build the Docker image using the following command:

```bash
docker build -t simply-paid .
```

This command tells Docker to build an image using the Dockerfile in the current directory and tag (-t) the image with the name "simply-paid".

- **Run the Docker Container**: Once the image has been built, you can run it as a container with the following command:

```bash
docker run -p 3000:3000 -d simply-paid
```

This command tells Docker to run a container from the "simply-paid" image, map port 3000 of the container to port 3000 of the host machine, and run the container in detached mode (-d).

## 💭 How it was built

First of all, after a slow and patient reading through the requirements, I got to understand what is the purpose of the project. Then I started some sketches to plan what I had to do and write some tests about the use cases.

## 📚 Learnings

### Docker things

### Design Patterns

#### Dependency Inversion

### ...

## Sources

- [PicPay Desafio Back-End](https://github.com/PicPay/picpay-desafio-backend)
- [Why we need design patterns](https://hub.packtpub.com/why-we-need-design-patterns/)
- [Refactoring Guru](https://refactoring.guru/)
- [Types of software testing](https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing)
- [PHP static analysis tools](https://github.com/exakat/php-static-analysis-tools)
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.htm)
- [REST Tutorial](https://www.devmedia.com.br/rest-tutorial/28912)
- [Vitest - Getting started](https://vitest.dev/guide/#getting-started)
- [How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)