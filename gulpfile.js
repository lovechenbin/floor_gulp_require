var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var inject = require("gulp-inject");
var connect = require("gulp-connect")


gulp.task("css",function(){
	gulp.src("resource/sass/*.scss")
	.pipe(concat("all.scss"))
	.pipe(sass())
	.pipe(cleanCSS())
	.pipe(rename("all.min.css"))
	.pipe(gulp.dest("dest/css"))
	.pipe(connect.reload());
});
gulp.task("javascript",function(){
	gulp.src("resource/js/*.js")
	.pipe(uglify())
	.pipe(gulp.dest("dest/js"))
	.pipe(connect.reload());
});
gulp.task("images",function(){
	gulp.src("resource/images/*")
	.pipe(imagemin())
	.pipe(gulp.dest("dest/images"))
	.pipe(connect.reload());
});
gulp.task("data",function(){
	gulp.src("resource/data/*")
	.pipe(gulp.dest("dest/data"))
	.pipe(connect.reload());
});
gulp.task("html",function(){
	gulp.src("resource/**/*.html")
	.pipe(gulp.dest("dest/"))
	.pipe(inject(gulp.src(["dest/css/*.css","dest/js/require.min.js"]),{relative:true}))
	.pipe(gulp.dest("dest/"))
	.pipe(connect.reload());
});
gulp.task("server",function(){
	connect.server({
		root:"dest/",
		port:666,
		livereload:true
	});
});
gulp.task("watch",function(){
	gulp.watch(["resource/**/*"],["css","javascript","images","data","html"])
});
gulp.task("default",["css","javascript","images","data","html","server","watch"]);