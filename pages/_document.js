import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB48d2e94CVpHBUF56YVf61cQ2WmOblYQg&libraries=places"></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}