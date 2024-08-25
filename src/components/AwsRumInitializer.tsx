"use client"

import { useEffect } from "react"
import { AwsRum, AwsRumConfig } from "aws-rum-web"

const AwsRumInitializer = () => {
  useEffect(() => {
    try {
        const config: AwsRumConfig = {
          sessionSampleRate: 1,
          identityPoolId: "eu-north-1:969f9c3a-f333-4f56-b9b0-fef8a4d9c484",
          endpoint: "https://dataplane.rum.eu-north-1.amazonaws.com",
          telemetries: ["performance"],
          allowCookies: true,
          enableXRay: false
        };
      
        const APPLICATION_ID: string = '93b3fd5b-3340-43e1-ba59-d49bd6697eca';
        const APPLICATION_VERSION: string = '1.0.0';
        const APPLICATION_REGION: string = 'eu-north-1';
      
        const awsRum: AwsRum = new AwsRum(
          APPLICATION_ID,
          APPLICATION_VERSION,
          APPLICATION_REGION,
          config
        );
      } catch (error) {
        console.error('AWS RUM initialization error:', error);      }
  }, [])

  return null
}

export default AwsRumInitializer
