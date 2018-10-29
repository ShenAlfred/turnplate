var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    changed = require("gulp-changed"),
    less = require("gulp-less"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    imagemin = require("gulp-imagemin"),
    connect = require("gulp-connect"),
    uglify = require("gulp-uglify"),
    del = require("del"),
    postcss = require('gulp-postcss'),
    pxtoviewport = require('postcss-px-to-viewport');

gulp.task("copy", function () {
    return gulp.src(["src/**/*.html", "src/**/*.js"])
        .pipe(changed("build"))
        .pipe(gulp.dest("build"))
        .pipe(connect.reload());
});

gulp.task("less", function () {
    var processors = [
        pxtoviewport({
            viewportWidth: 1242, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
            viewportHeight: 2208, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置 
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） 
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw 
            selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值 
            mediaQuery: false // 允许在媒体查询中转换`px`
        })
    ];
    return gulp.src("src/**/*.less")
        .pipe(changed("build"))
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssnano({
            'postcss-zindex': false      //只要启用了这个插件， z-index 的值就会重置为 1 。这是一个天坑， 千万记得将 postcss-zindex 设置为 false 。
        }))
        .pipe(postcss(processors))
        .pipe(gulp.dest("build"))
        .pipe(connect.reload());
});

gulp.task("image", function () {
    return gulp.src(["src/**/*.png", "src/**/*.jpg", "src/**/*.svg"])
        .pipe(changed("build"))
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest("build"))
        .pipe(connect.reload());
});
gulp.task("js", function () {
    return gulp.src("src/**/*.js")
        .pipe(changed("build"))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("build"))
        .pipe(connect.reload());
})

gulp.task("connect", function () {
    connect.server({
        port: 8000,
        root: "build",
        livereload: true,
        host: '192.168.43.180',
        // host: '192.168.43.237'
    });
});

gulp.task("watch", ["connect"], function () {
    gulp.watch("src/**/*.html", ["copy"]);
    gulp.watch("src/**/*.less", ["less"]);
    gulp.watch("src/**/*.js", ["js"]);
    gulp.watch(["src/**/*.png", "src/**/*.jpg"], ["image"]);
});

gulp.task("clean", function (callback) {
    del(["build"], callback);
})

gulp.task("default", ["copy", "less", "image", "js"]);