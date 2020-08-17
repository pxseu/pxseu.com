import Head from 'next/head'
import Link from 'next/link'
import BackgroundLoader from '../components/BackgroundLoader'

const Index = () => (
  <BackgroundLoader>
    <Head>
      <title>pxseu</title>
      <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Home sweet homepage." />
      <link rel="stylesheet" href="/index/css/styles.css" />
    </Head>
    <div className="app">
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
      <div className="logo noselect">pxseu</div>
      
      <div className="links" id="links">
        <p><Link href="/about"><a className="link noselect">About Me</a></Link></p>
        <p><Link href="/projects"><a className="link noselect">My Projects</a></Link></p>
        <p><a className="link noselect" href="https://discord.pxseu.com">Discord Server</a></p>
      </div>
    </div>
  </BackgroundLoader>
)

export default Index