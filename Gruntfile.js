module.exports = function(grunt) {


  //1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //2. Configuration for concatinating files goes here
    concat: {
      dist:{
        src: [
          'public/client/*.js'

        ],
        dest: 'public/dist/production.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      //uglify the dest concat file to Minify THIS IS FOR MINIFY
      build: {
        src: 'public/dist/production.js',
        dest: 'public/dist/production.min.js'

      }
    },

    jshint: {
      files: [
        // Add filespec list here
        //add what you want Linted
        'public/client/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  //3. Where we tell Grunt we plan to use this plug-in
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  //4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying
    //output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    //what does this do
    //lint
    'jshint',
    //concat
    'concat',
    //minify
    'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      //call build here

    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    "build",
    "upload"
    // add your deploy tasks here
  ]);


};
