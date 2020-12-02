#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ArchitectureStack } from '../lib/architecture-stack';

const app = new cdk.App();
new ArchitectureStack(app, 'ArchitectureStack');
