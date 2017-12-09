var gulp = require("gulp"),
	jade = require("gulp-jade"),
	wiredep = require("wiredep").stream,
	clean = require("gulp-clean"),
	useref = require("gulp-useref"),
	gulpif = require("gulp-if"),
	uglify = require("gulp-uglify"),
	sass = require("gulp-sass"),
	prefixer = require("gulp-autoprefixer"),
	minifyCss = require("gulp-minify-css"),
	filter = require("gulp-filter"),
	imagemin = require("gulp-imagemin"),
	size = require("gulp-size"),
	spriteSmith = require("gulp.spritesmith"),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	wait = require("gulp-wait"),
	time = 1500;




gulp.task("jade", function(){
	gulp.src("app/templates/*.jade")
		.pipe(wait(time))
		.pipe(jade({
			pretty: '\t'
		}))
		.on("error", log)
		.pipe(gulp.dest("app/"))
		.pipe(reload({stream: true}));
});


gulp.task("style", function(){
	gulp.src("app/css/*.scss")
		.pipe(wait(time))
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest("app/css/"))
});


gulp.task("server", ["jade", "style"], function(){
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: "app"
		}	
	});

	
});

//bower dependences
gulp.task("wiredep", function(){
	gulp.src("app/templates/pages/*.jade")
		.pipe(wait(time))
		.pipe(widerep({
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('app/templates/common/'));

});


gulp.task("sprite", function(){
	
	return gulp.src("app/icons/*.png")
			.pipe(wait(time))
			.pipe(spriteSmith({
				imgName: "images/sprites.png",
				cssName: "css/common/sprites.scss",
				padding: 10,
				cssFormat: "css",
				cssOpts: {
					cssSelector: function(item){

						/*if (item.name.indexOf("-hover") !== -1) {
							return item.name.replace("-hover", ":hover");
						}*/

						if (item.name.indexOf("-") !== -1) {
							return "." + item.name.replace(/\-/g, ":"); //replace all occurences of "-"
						}

						return "." + item.name;
					}

				}

			}))
			.pipe(gulp.dest("app/"))

});




gulp.task("watch", function(){
	gulp.watch("app/templates/**/*.jade", ['jade']);
	gulp.watch("app/css/**/*.scss", ['style'], );
	gulp.watch("bower.json", ['wiredep']);
	gulp.watch(['app/js/**/*.js', 'app/css/**/*.scss', 'app/css/**/*.css', 'app/*.html'])
		.on('change', reload);

});


gulp.task('default', ['server', 'watch']);


// ====================================================
// ====================================================
// ===================== Функции ======================
 
// Более наглядный вывод ошибок

var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}


// ====================================================
// ====================================================
// =============== Важные моменты  ====================
// gulp.task(name, deps, fn) 
// deps - массив задач, которые будут выполнены ДО запуска задачи name
// внимательно следите за порядком выполнения задач!
// 
// ====================================================
// ====================================================
// ================= Сборка DIST ======================
// 

 
// Очистка папки
gulp.task('clean', function(){
	return gulp.src("dist", [{read: false}])
			.pipe(clean());	

}); 


// Переносим HTML, CSS, JS в папку dist 
gulp.task('useref', function(){

return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif("*.js", uglify()))
		//.pipe(gulpif("*.css", minifyCss({compatibility: 'ie8'})))
		.pipe(gulp.dest("dist/"))
});



//перенос шрифтов
gulp.task("fonts", function(){
	return gulp.src("app/fonts/*")
		.pipe(filter(['*.eot','*.svg','*.ttf','*.otf','*.woff','*.woff2']))
		.pipe(gulp.dest("dist/fonts/"))
});

//перенос картинок
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
});
 
// Остальные файлы, такие как favicon.ico и пр.
gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ]).pipe(gulp.dest('dist'));
});


// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['jade', 'dist']);
