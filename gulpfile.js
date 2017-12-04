var JECT="adviser_mobileservice",
	SRC="app",
	DEST=JECT+"/src/main/webapp/html/h5zip/build/h5",
	loadUrl="",//要加载的具体页面
	browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),        // js压缩
    minifyCss = require('gulp-minify-css'),    // css压缩
    htmlmin = require('gulp-htmlmin'),       // html压缩
    imagemin = require('gulp-imagemin'),      // 图片压缩
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    history = require('connect-history-api-fallback'),
	gulp=require("gulp");
    
gulp.task("build-js",function(){//压缩js
	gulp.src([SRC+"/2.0/views/**/*.js"])
	.pipe(uglify({
		 mangle:false // 是否修改变量名
	}).on('error' , function(e){
            console.log(e);
        }))
	.pipe(gulp.dest(DEST+"/2.0/views"));
});
gulp.task("build-css",function(){//压缩css
	gulp.src([SRC+"/2.0/**/*.css"])
	.pipe(minifyCss({
		"compatibility": "ie7"
		}))
	.pipe(gulp.dest(DEST+"/2.0"));
});
gulp.task("build-img",function(){//移动图片
	gulp.src([SRC+"/2.0/**/*.png",SRC+"/2.0/**/*.jpg",SRC+"/2.0/**/*.gif",SRC+"/2.0/**/*.jpeg"])
	.pipe(gulp.dest(DEST+"/2.0"));
});
gulp.task("m-fonts",function(){//移动字体
	gulp.src(SRC+"/2.0/fonts/**")
	.pipe(gulp.dest(DEST+"/2.0/fonts"));
});
gulp.task("m-config",function(){//移动配置文件
	gulp.src(SRC+"/config.json")
	.pipe(gulp.dest(DEST));
});
gulp.task("m-js",function(){//移动js
	gulp.src([SRC+"/2.0/js/**"])
	.pipe(gulp.dest(DEST+"/2.0/js"));
});
gulp.task("m-html",function(){//移动html
	gulp.src([SRC+"/2.0/**/*.html"])
	.pipe(gulp.dest(DEST+"/2.0"));
});

/**
 * [实时预览]
 */
gulp.task('server', function() {
    browserSync.init({
        server : SRC,
        port: 8888
    });
    gulp.watch([
        SRC + '/**/*.html',
        SRC + '/**/*.js',
        SRC + '/**/*.css'
    ]).on("change", browserSync.reload);
});

//预览打包后的结果
gulp.task('load-build', function() {
    browserSync.init({
        server : DEST+"/2.0"+loadUrl
    });
});


gulp.task("build",function(callback){
	runSequence(
		'build-js',
		'build-css',
		'build-img',
		'm-config',
		'm-fonts',
		'm-js',
		'm-html',
		function(error){
		if(error){
			console.log(error.message);
		}else{
			console.log("打包成功");
		}
		callback(error);
	});
});
