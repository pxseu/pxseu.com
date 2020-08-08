import Head from 'next/head'

export default function Home() {
  return (
    <div className="app">
      <Head>
        <title>pxseu</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Pxseu's website!" />
        <meta name="keywords" content="pxseu, poseuxck" />
        <meta name="author" content="pxseu" />
        <meta data-n-head="ssr" data-hid="theme-color" name="theme-color" content="#6ab04c" />
        <meta data-n-head="ssr" data-hid="og:site_name" property="og:site_name" content="pxseu.com" />
        <meta data-n-head="ssr" data-hid="og:title" property="og:title" content="pxseu.com" />
        <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Home sweet homepage." />
        <meta data-n-head="ssr" data-hid="og:image" property="og:image" content="https://pxseu.com/essential/media/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=0.8, maximum-scale=0.8, minimum-scale=0.8, user-scalable=no, minimal-ui" />
        <link rel="shortcut icon" href="/favicon.ico" />
		    <link rel="icon" href="/favicon.ico" />
        <link rel="favicon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/index/css/styles.css" />
        <script src="/essential/js/script.js" defer></script>
        <script src="/index/js/script.js" defer></script>
      </Head>
      
      <main>
        <div className="heart heartTL">
          <i className="fa fa-heart" aria-hidden="true"></i>
        </div>
        <div className="heart heartTR">
          <i className="fa fa-heart" aria-hidden="true"></i>
        </div>
        <div className="heart heartBL">
          <i className="fa fa-heart" aria-hidden="true"></i>
        </div>
        <div className="heart heartBR">
          <i className="fa fa-heart" aria-hidden="true"></i>
        </div>
        <div className="logo"><img src="/index/logo.svg" /></div>
			  
        <div className="links" id="links">
          <p><a href="/about">About Me</a></p>
          <p><a href="/projects">My Projects</a></p>
        </div>
      </main>
    </div>
  )
}