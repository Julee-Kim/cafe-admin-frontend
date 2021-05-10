module.exports = {
  lintOnSave: false, // eslint 사용 x
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/_import/variables.scss";`
      }
    }
  },
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '/api': {
        // 프록시 요청을 보낼 서버의 주소
        target: 'http://localhost:5000',
        changeOrigin: true
      },
    }
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Mycafe admin',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
}