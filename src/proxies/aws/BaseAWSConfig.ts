const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION } = process.env;

interface AWSBaseConfig {
  accessKeyId: string | undefined,
  secretAccessKey: string | undefined,
  region: string | undefined,
}

class BaseAWSConfig {
  public baseAWSConfig: AWSBaseConfig;

  constructor() {
    this.baseAWSConfig = {
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
      region: AWS_REGION,
    };
  }
}

export default BaseAWSConfig;
