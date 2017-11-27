// @flow

import * as jobsConfig from './jobsConfig';
import * as cron from 'cron';
import * as _ from 'lodash';

const jobs = _.map(jobsConfig,config=>new cron.CronJob(config));

export const startAll=()=>_.each(jobs,job=>job.start());

export const stopAll=()=>_.each(jobs,job=>job.stop());

export const getJobs=()=>jobs;
