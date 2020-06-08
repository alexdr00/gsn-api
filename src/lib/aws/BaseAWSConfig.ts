const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION } = process.env;

interface AWSBaseConfig {
  accessKeyId: string | undefined,
  secretAccessKey: string | undefined,
  apiVersion: string,
  region: string | undefined,
}

class BaseAWSConfig {
  public baseConfig: AWSBaseConfig;

  constructor() {
    this.baseConfig = {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
      apiVersion: '2014-03-28',
      region: AWS_REGION,
    };
  }
}

export default BaseAWSConfig;
