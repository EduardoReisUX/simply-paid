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

### Dependency Inversion

### Error handling with result pattern

The `Result` class in TypeScript is a design pattern used to handle operations that can either succeed or fail. It encapsulates the outcome of a computation along with its success status and any associated error message. The class uses generics, allowing it to work with different types of values.

Here's a breakdown of what the class does:

- **Properties**: The class has four properties: `isSuccess`, `isFailure`, `error`, and `_value`. `isSuccess` indicates whether the operation was successful, `isFailure` is the opposite of `isSuccess`, `error` contains any error message if the operation failed, and `_value` holds the actual value of the operation if it succeeded.

- **Constructor**: The constructor takes three parameters: `isSuccess`, `error`, and `value`. It checks for invalid states where a successful result has an error, or a failing result doesn't have an error. If such conditions are met, it throws an error.

- **getValue**: This method returns the value of the operation if it was successful. If the operation wasn't successful, it throws an error.

- **ok**: This static method creates a new `Result` instance representing a successful operation. It takes an optional `value` parameter.

- **fail**: This static method creates a new `Result` instance representing a failed operation. It requires an `error` parameter.

- **combine**: This static method takes an array of `Result` instances and returns the first failure it finds, or a successful result if there are no failures.

This class is a good way to handle operations that can either succeed or fail, providing a clear and consistent way to check the result of an operation and handle errors.


### Data modeling relationships

## Sources
 
- [PicPay Desafio Back-End](https://github.com/PicPay/picpay-desafio-backend)
- [Why we need design patterns](https://hub.packtpub.com/why-we-need-design-patterns/)
- [Refactoring Guru](https://refactoring.guru/)
- [Types of software testing](https://www.atlassian.com/continuous-delivery/software-testing/types-of-software-testing)
- [PHP static analysis tools](https://github.com/exakat/php-static-analysis-tools)
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)
- [REST Tutorial](https://www.devmedia.com.br/rest-tutorial/28912)
- [Vitest - Getting started](https://vitest.dev/guide/#getting-started)
- [How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
- [The 5 commandments of clean error handling in TypeScript](https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5)
- [Handling errors like a pro in TypeScript](https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991)
- [Database table relationships](https://www.metabase.com/learn/databases/table-relationships)
- [Flexible Error Handling w/ the Result Class | Enterprise Node.js + TypeScript](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/)