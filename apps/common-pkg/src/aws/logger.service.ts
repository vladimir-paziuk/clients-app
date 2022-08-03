/*
  Grab from https://steve-mu.medium.com/log-to-aws-cloudwatch-logs-in-nodejs-30841cd370e0
*/
import { ConsoleLogger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

const REGION = 'us-east-1';
const LOG_GROUP_NAME = '/aws/error-logs';
const LOG_STREAM_NAME = '/aws/error-logs--stream';

export interface LoggerMessage {
  name: string;
  stack: string;
  error: Error;
}
export class Logger extends ConsoleLogger {
  private nextSequenceToken: any;
  private eventsQueue: any[];
  private interval: any;

  constructor() {
    super();

    this.nextSequenceToken = null;
    this.eventsQueue = [];
    this.interval = null;
  }
  log(message: LoggerMessage, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
  }

  async error(message: LoggerMessage, ...optionalParams: any[]) {
    await this.cloudWatchLog(message);

    super.error(message.error, ...optionalParams);
  }

  private async cloudWatchLog(message: LoggerMessage) {
    if (this.nextSequenceToken == null) {
      const res = await this.cloudWatchDescribeLogStreams(LOG_GROUP_NAME);

      this.nextSequenceToken = res.logStreams[0].uploadSequenceToken;
    }

    this.eventsQueue.push({
      message: JSON.stringify(message),
      timestamp: new Date().getTime(),
    });

    await this.cloudWatchStartLogQueue();
  }

  private cloudWatchDescribeLogStreams(logGroupName: string) {
    const cloudWatchLogs = new AWS.CloudWatchLogs({ region: REGION });

    const params = {
      logGroupName,
    };

    return cloudWatchLogs.describeLogStreams(params).promise();
  }

  private cloudWatchPutLogEvents(
    logEvents: any,
    logGroupName: string,
    logStreamName: string,
    sequenceToken: string,
  ) {
    const cloudWatchLogs = new AWS.CloudWatchLogs({ region: REGION });

    const params = {
      logEvents,
      logGroupName,
      logStreamName,
      sequenceToken,
    };

    return cloudWatchLogs.putLogEvents(params).promise();
  }

  private async cloudWatchStartLogQueue() {
    if (this.interval == null) {
      this.interval = setInterval(async () => {
        if (this.eventsQueue.length == 0) {
          clearInterval(this.interval);
          this.interval = null;

          return;
        }

        const event = this.eventsQueue.shift();

        try {
          const res = await this.cloudWatchPutLogEvents(
            [event],
            LOG_GROUP_NAME,
            LOG_STREAM_NAME,
            this.nextSequenceToken,
          );
          this.nextSequenceToken = res.nextSequenceToken; // store the new sequence token
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    }
  }
}
