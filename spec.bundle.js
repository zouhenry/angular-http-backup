/**
 * Created by hzou on 10/9/16.
 */

import angular from 'angular';
import mocks from 'angular-mocks';

// import httpbackend from './src/httpbackup.module';

const srcContext = require.context( './src', true, /\.spec\.js/ );

srcContext.keys().forEach( srcContext );