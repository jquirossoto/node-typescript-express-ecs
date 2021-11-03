# Pets API

## Description
Express API developed in Typescript and deployed to ECS Fargate that sits behind a private Application Load Balancer and is exposed to the world using an Http API Gateway. This repo includes the CloudFormation template the defines all the resources.

:warning: This solution its not production ready! For example:
1. The database has been configured to reduce expenses.
2. The CodeBuild project has been configured to reduce expenses.
3. The VPC configuration might not fit your requirements.
2. The AutoScaling policy might not fit your requirements.

## Architecture
![pets-architecture](https://user-images.githubusercontent.com/4935587/140197377-c8dd1b2d-7b89-4495-8741-4137d55adf6f.png)

## Stack of technologies & services
1. Database migrations: [prisma.io](https://www.prisma.io/)
2. Database: [AWS RDS (Postgres)](https://aws.amazon.com/rds/?p=pm&c=db&z=3)
3. Deployments: [AWS CodePipeline](https://aws.amazon.com/codepipeline/)
4. Building and testing: [AWS CodeBuild](https://aws.amazon.com/codebuild/)
5. Container orchestration: [AWS ECS (Fargate)](https://aws.amazon.com/ecs/)
6. Container image registry: [AWS ECR](https://aws.amazon.com/ecr/)
7. Load balancing: [AWS Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
8. API Gateway: [AWS Http API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
9. API Gateway private integration: [AWS VPC Link](https://aws.amazon.com/blogs/compute/understanding-vpc-links-in-amazon-api-gateway-private-integrations/)

## How to run the application in localhost

### Things you will need
1. NodeJS 12
2. Docker

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
5. Start the application
```
npm run start
```

### Watch mode
To run the application in watch mode execute the following commands:
1. ```npm run build:watch```
2. ```npm run start:watch```

## How to deploy and run the solution in AWS
:warning: If you deploy this solution to AWS you will start to incur charges with the following services:
1. NatGateway
2. RDS
3. Secrets Manager

### Things you will need
1. AWS account
2. AWS CLI

To deploy and run the solution in AWS execute the following procedure:

1. Fork this repo.
2. Clone the forked repo in your machine.
3. Create create a .env file in the root of the project. The contents of this file will include the parameters for the Cloudformation template:
* **CodestarConnectionId**: To generate the Codestar Connection, follow this tutorial: [Create connection](https://docs.aws.amazon.com/dtconsole/latest/userguide/connections-create.html). **The value should be a UUID**.
* **FullRepositoryId**: Specify the owner and name of the repository where source changes are to be detected. Example: user/your-forked-repo.
* **BranchName**: Specify the name of the branch where source changes are to be detected.
* **ArtifactStoreS3Location**: Specify the name of the S3 bucket to store the CodePipeline artifacts. Your AWS account should have an already created S3 bucket for codepipeline. The name follows this format: codepipeline-{region}-{random-number}
* **AutoScalingMinCapacity**: Specify the maximum value that you plan to scale out to. **If this is the first deployment, set the value to 0.**
* **AutoScalingMaxCapacity**: Specify the minimum value that you plan to scale in to. **If this is the first deployment, set the value to 0.**
* **DockerHubUsername**: Specify the DockerHub username to be used when building the docker image. If you don't have an account, [sign up](https://hub.docker.com/signup). You can use a **personal account** (free).
* **DockerHubPassword**: Specify the DockerHub password to be used when building the docker image.

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
4. Verify that the VPC CIDR configuration defined in the Cloudformation template does not conflict with any other VPC in your AWS account.
5. Make sure the credentials that you will use to deploy the Cloudformation stack have enough permissions to create all of the resources.
6. Deploy the Cloudformation stack:
```
npm run cf:deploy
```
7. [Check that the pipeline executes successfully.](https://console.aws.amazon.com/codesuite/codepipeline/pipelines/pets-api-pipeline/view)
8. Change the AutoScalingMinCapacity and AutoScalingMaxCapacity to for example 1 and 2 respectively. 
9. Redeploy the Cloudformation stack:
```
npm run cf:deploy
```
10. Start making requests to the API. :confetti_ball: To obtain the API Invoke URL, run the following command. The API Invoke URL is in the Outputs section.
```
npm run cf:describe
```
11. If you don't want the solution deployed anymore, delete the Cloudformation stack:
```
npm run cf:delete
```