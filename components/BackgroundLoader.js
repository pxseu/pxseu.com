import Head from 'next/head'

const BackgroundLoader = (props) => (
    <div>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="description" content="Pxseu's website!" />
            <meta name="keywords" content="pxseu, poseuxck" />
            <meta name="author" content="pxseu" />
            <link rel="shortcut" href="/favicon.ico" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="favicon" href="/favicon.ico" />
            <meta data-n-head="ssr" data-hid="theme-color" name="theme-color" content="#6ab04c" />
            <meta data-n-head="ssr" data-hid="og:site_name" property="og:site_name" content="pxseu.com" />
            <meta data-n-head="ssr" data-hid="og:title" property="og:title" content="pxseu.com" />
            <meta data-n-head="ssr" data-hid="og:image" property="og:image" content="https://www.pxseu.com/essential/media/icon.png" />
            <meta name="viewport" content="width=device-width, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8, user-scalable=no, minimal-ui" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            <script src="/essential/js/particles.min.js" defer></script>
            <script src="/essential/js/script.js" defer></script>
            
            <meta name="viewport" content="width=device-width, initial-scale=0.8" />
        </Head>
        { props.children }
        <div id="particles-js" className="particles-js"></div>
    </div>
)

export default BackgroundLoader