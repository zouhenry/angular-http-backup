/**
 * Created by hzou on 10/9/16.
 */

import angular from 'angular';
import mocks from 'angular-mocks';

const srcContext = require.context( './src', true, /.js/ );

srcContext.keys().forEach( srcContext );