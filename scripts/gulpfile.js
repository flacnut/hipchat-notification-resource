// (c) Copyright 2016 Hewlett Packard Enterprise Development LP
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var argv = require('yargs').argv,
  gulp = require('gulp'),
  diff = require('gulp-diff'),
  gutil = require('gulp-util'),
  filter = require('gulp-filter'),
  eslint = require('gulp-eslint'),
  beautify = require('gulp-jsbeautifier');

var dropRoot = '../../release/',
  dropFolder = 'workers',
  sourceLocation = '.',
  dropLocation = dropRoot + dropFolder;


// Task: lint-and-beautify
// Performs in-place linting & beautification of the *src* files. We perform
// this in-place so that the checked in code is clean and consistent.
gulp.task('lint-and-beautify', function () {
  // Beautify Config: src/.jsbeautifyrc
  // Linting Config: src/.estlintrc
  return gulp
    .src(['**/*.js', '!node_modules/**/*.js'])
    .pipe(beautify({
      config: '.jsbeautifyrc'
    }))
    .pipe(diff())
    .pipe(diff.reporter({
      quiet: !argv['fail-on-beautify'],
      fail: argv['fail-on-beautify']
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('.'));
});

gulp.task('publish-dependencies', function(done) {
  require('npm-dependencies-spreadsheet')({
    email: 'hce-dependencies@appspot.gserviceaccount.com',
    token: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdfz9M6diWt+AL\nbn5YVicxxsJe87K1AwVGH6z/ki71TqF9fMl6RD+8OMu4qSgd7IlqZNKxMlQJ83ac\n7rGTMBdGEfRoKHGAGmlVNm6KhF0KH/KuG/7t3dajvs31UxgOtYqyqNxcKEoyjEtX\nJvhWGNOgGorLHtFVNJhjpr5bUddM2dLur0XlozjxMaBW7+EZGZ6T1EVMu70/1l9F\nYUMA0Yq3L34YD2jyjfJYsvEZ1nHPdl8O10J90gVdcyGR7eWfogVeEbMrOraqeP1x\nDV3h00y138/5pwheHNOVjRgwnB+bhDTgul4bHkOm44VLFzqFOp0G/NRHp4M5FHMp\nUkkadrZPAgMBAAECggEAVu4eNUi5WG9DRWwGZqGe3pWTQS+HiuuQ5KSlKyc3rgRp\nlEblOgwjlbNPlqwfTWz6Z/QgateZlSiBZptE/jXEEtPkL/1qsEdjrjnuB5yJcgYy\nP7GKIyaXyyeMrIThuXSwim4zutYuJfpTt1X2Kidn323m/7gR2NK/7fjiBquEh5Cw\n5CbHfF/gQXQauvP7kNkwEYO7iwTZKME96XrGXUgjyiqi9Wc62FJ5d5eFsb0OUdcK\n9GLTOIJ2DbvYK5L9IXc9olY9LECb8zpuuGm5UWS6qKhWZaqjC3rS/M29A6rEq2tp\n8UVI4ak+XBDOiA/LDIAyYWVUY7THUJAWEKuu7SC6IQKBgQDX0EnP5l6QtbVZJB7r\ngCXolMfTK1OpFDrkH352bY2utWcOBQ/gv5wLQTH/9l/f6+g2L9GtaKVDvl42vMXE\ncbMSypaDqad2dUUXwtqBBj4EDuFrsycQ442mFPd8OaENXew0+dBHeXFx0TaUREkR\nhxBEtvrEueXHeVUd+fSzjmp0/wKBgQC60wqr3fCG9eht2J0Q/n75hzE2AVSSspQ4\n6IXJL1cEQJUHYeKibD73fS4zlzX/fFGuIUWpRXUCcj+91V4xlLf1MMca6Ib/uPC1\nIfSoKvsWaMPJLHEV6qIZPkCvcCY7a8HQzl6RwJRz+6g8816KD26Kb3mSw1CpkpXn\n8dFasCousQKBgFdgZ2IbHVJtn1zV+QbUPYTrJ/RhaF/eZvGRprwAIwsHOxA8EG+o\nZF9SKBJACBU7CCtYNQaGhdLlsnNq/o9IkX4cM9Be0gRt+mliZOE0S8uM0suuHzUB\nTIpflsve8UveKRJRyngFvV6dnAFvnD3Sd02639Diixu2DjYyy1YfZQ61AoGATB2h\nsmYpEgNsYByp2XumpelTvmoKV/5T71+k6lPUQxJA5ZIW8Q/jE5g306Mex+mRqb06\nkX2P76A2ohQlXVP3IvltlWP5ZISn5VRhRobEZ9vlMLhflotS4bAAULoDiaAchgMe\neomYsixs3fBVqzAgXFyQjp/u5Depxac7IZS2ivECgYB+VyHnwqhWiXSxk6EfKTRE\n3i0t6bQbN0E368kjtVu1izqpIJd3xBbqrQpAwCfhDdsqxORKqYVzIOyC773EZ97M\nwOkjCaIfxJfciEygVr0iWGXhAbSTx0uaFIJQ40PSh+R5UXvz1aPMEzK3BdXN9mr6\nCuW/40CJQ72aoCOhzry3JQ==\n-----END PRIVATE KEY-----\n',
    sheet: '1BqeQNDuanaoHqufzwiUmho8zIugfkqK59EwMhGFvNhc',
    basePath: __dirname
  }, (err) => {
    if (err) {
      console.dir(err);
    }

    done();
  });
});
