import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as route53 from '@aws-cdk/aws-route53';
import { CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront'
import * as origins from '@aws-cdk/aws-cloudfront-origins';

export class ArchitectureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Create the public S3 bucket 
    const staticBucket = new s3.Bucket(this, 'example-qr', {
      bucketName: 'radic-personal-static-bucket',
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    // Deploy static code/files into Bucket.
    const deployment = new s3Deployment.BucketDeployment(
      this,
      'deployStaticWebsite',
      {
        sources: [s3Deployment.Source.asset('../ui/build')],
        destinationBucket: staticBucket,
      }
    );   

    const distribution = new CloudFrontWebDistribution(this, 'cdk-example-cfront', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: staticBucket
          },
          behaviors : [ {isDefaultBehavior: true}]
        }
      ]
    });
  }
}
