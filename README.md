# Pets API

Express API developed in Typescript and deployed to ECS Fargate that sits behind a private Application Load Balancer and is exposed to the world using an Http API Gateway. This repo includes the CloudFormation template the defines all the resources.

:warning: This CloudFormation stack its not production ready! For example:

1. The database has been configured to reduce expenses.
2. The CodeBuild project has been configured to reduce expenses.
3. The VPC configuration might not fit your requirements.
4. The AutoScaling policy might not fit your requirements.

## Architecture

![petsapi-architecture](https://user-images.githubusercontent.com/4935587/149636345-63075b9d-a85d-463e-97eb-a8727bfe9814.png)

## How to run the application

### Things you will need

1. [NodeJS 12](https://nodejs.org/en/download/releases/)
2. [Docker](https://docs.docker.com/get-docker/)

To run the application execute the following procedure:

1. Set up the database connection

```
echo "DATABASE_URL=postgresql://pets:pets123@localhost:5432/petsdb" > ./prisma/.env
```

2. Install the dependencies

```
npm install
```

3. Start the database container

```
npm run docker:up
```

4. Create the database tables

```
npm run prisma:db:push
```

5. Start the application. The application will be listening on port 3000.

```
npm run start
```

### Watch mode

To run the application in watch mode execute the following commands:

1. `npm run start:watch`

## How to run the application in a container

Asumming that you executed the [How to run the application](#how-to-run-the-application) procedure up to the step 4, to run the application in a container execute the following steps:

1. Reset the database connection. For communication between containers, you need to use the container name as the host instead of localhost.

```
echo "DATABASE_URL=postgresql://pets:pets123@postgres:5432/petsdb" > ./prisma/.env
```

2. Build the docker image

```
npm run docker:build
```

3. Run the docker image. The container will be listening on port 80.

```
npm run docker:run
```

## How to deploy and run the solution in AWS

:warning: If you deploy this solution, AWS will start charging you for the following services:

1. NatGateway
2. RDS
3. Secrets Manager

### Things you will need

1. [AWS account](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start)
2. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
3. [DockerHub account](https://hub.docker.com/signup), you can use a **personal account** (free).

To deploy and run the solution in AWS, execute the following procedure:

1. Fork this repo.
2. Clone the forked repo in your machine.
3. Create create a .env file in the root of the project. The contents of this file will include the parameters for the CloudFormation template:

- **CodestarConnectionId**: To generate the Codestar Connection, follow this tutorial: [Create connection](https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-create.html). **The value should be a UUID**.
- **FullRepositoryId**: Specify the owner and name of the repository where source changes are to be detected. Example: user/your-forked-repo.
- **BranchName**: Specify the name of the branch where source changes are to be detected.
- **ArtifactStoreS3Location**: Specify the name of the S3 bucket to store the CodePipeline artifacts. Your AWS account should have an already created S3 bucket for codepipeline. The name follows this format: codepipeline-{region}-{random-number}
- **AutoScalingMinCapacity**: Specify the maximum value that you plan to scale out to. **If this is the first deployment, set the value to 0.**
- **AutoScalingMaxCapacity**: Specify the minimum value that you plan to scale in to. **If this is the first deployment, set the value to 0.**
- **DockerHubUsername**: Specify the DockerHub username to be used when building the docker image.
- **DockerHubPassword**: Specify the DockerHub password to be used when building the docker image.

The contents of the .env file should look like this:

```
CodestarConnectionId=b3d48678-dd7e-4b99-bc4f-44f5571cac98
FullRepositoryId=user/your-forked-repo
BranchName=master
ArtifactStoreS3Location=codepipeline-us-east-1-96582316541
AutoScalingMinCapacity=0
AutoScalingMaxCapacity=0
DockerHubUsername=dockerhub-username
DockerHubPassword=dockerhub-password
```

:warning: By setting the AutoScalingMinCapacity and AutoScalingMaxCapacity to 0 the stack will create the ECS Service without a running task. This will allow the CodePipeline to execute, build the Docker image and push it to the ECR repository. If you set those parameters with values other than 0, the ECS Service will atempt to run a task and because the CodePipeline hasn't executed there is no image in the ECR repository and the deployment will fail.

4. Verify that the VPC CIDR configuration defined in the CloudFormation template does not conflict with any other VPC in your AWS account.
5. Make sure the credentials that you will use to deploy the CloudFormation stack have enough permissions to create all of the resources.
6. Deploy the CloudFormation stack:

```
npm run cf:stack:deploy
```

7. [Check that the pipeline executes successfully.](https://console.aws.amazon.com/codesuite/codepipeline/pipelines/pets-api-pipeline/view)
8. Change the AutoScalingMinCapacity and AutoScalingMaxCapacity to for example 1 and 2 respectively in the .env file.
9. Redeploy the CloudFormation stack:

```
npm run cf:stack:deploy
```

10. :confetti_ball: Start making requests to the API. To obtain the API Invoke URL, run the following command. The API Invoke URL is in the Outputs section.

```
npm run cf:stack:describe
```

11. If you don't want the solution deployed anymore, delete the CloudFormation stack. Make sure the ECR repository and the open-api bucket are empty.

```
npm run cf:stack:delete
```
