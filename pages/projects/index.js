import Head from 'next/head'

export default function Projects() {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=0.8" />
                <title>My Projects</title>
                <meta data-n-head="ssr" data-hid="theme-color" name="theme-color" content="#6ab04c" />
                <meta data-n-head="ssr" data-hid="og:site_name" property="og:site_name" content="pxseu.com" />
                <meta data-n-head="ssr" data-hid="og:title" property="og:title" content="pxseu.com" />
                <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Projects I work on." />
                <meta data-n-head="ssr" data-hid="og:image" property="og:image" content="https://www.pxseu.com/essential/media/icon.png" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="favicon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="/essential/css/common.css" />
                <script src="/essential/js/particles.min.js" defer></script>
                <script src="/essential/js/script.js" defer></script>
            </Head>
            <div className="app">
                <h1 className="center"><a>My Projects</a></h1>
                <hr />
                <div className="center">
                    <p><a href="https://premid.app/">Working in PreMiD as an Engineer.</a></p>
                    <p><a href="https://short.pxseu.com/">Simple Url shrinker</a></p>            
                    <p><a href="https://cdn.pxseu.com/">Simple File uploader</a></p>            
                    <p><a href="https://github.com/pxseu/ZeroTwoBot">Discord Bot</a></p>            
                </div>
                <div className="center back">
                    <p><a href="/">Go Back</a></p>
                </div>
            </div>
            <div id="particles-js" className="particles-js"></div>
        </div>
       
    )
}