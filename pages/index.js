import Head from 'next/head'
import Link from 'next/link'
import BackgroundLoader from '../components/BackgroundLoader'

const Index = () => (
  <div>
    <BackgroundLoader>
      <Head>
        <title>pxseu</title>
        <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Home sweet homepage." />
        {/* <link rel="stylesheet" href="/index/css/styles.css" /> */}
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
    <style jsx>{`
      .logo {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 220px;
        z-index: 2;
        animation: 1.5s ease-out 0s 1 fadeIn;
        cursor: pointer;
        text-align: center;
        color: #FFA9FF;
        font-size: 150px;
        font-family: "Gang of Three";
      }
      
      .links {
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          top: 400px;
          z-index: 2;
          animation: 1.5s ease-out 0s 1 fadeIn;
          cursor: default;
          text-align: center;
      }
      
      p {
          display: inline;
          padding: 14px;
          cursor: default;
          text-align: center;
      } 
      
      .link {
          color: white;
          font-family: 'Roboto', sans-serif;
          text-decoration: none;
          font-size: 30px;
          transition: color 0.1s;
          cursor: pointer;
          position: relative;
          top: 0;
          transition: top ease 0.2s, color 0.1s;
          
          display: inline-block;
          padding: 15px 20px;
          position: relative;
      }
      
      .link:after {    
          background: none repeat scroll 0 0 transparent;
          bottom: 0;
          content: "";
          display: block;
          height: 2px;
          left: 50%;
          position: absolute;
          background: #fff;
          transition: width 0.3s ease 0s, left 0.3s ease 0s;
          width: 0;
      }
      .link:hover:after { 
          width: 100%; 
          left: 0; 
      }
      
      .link:hover {
          color: #FFA9FF;
          top: -2px;
      }
      
      .heart {
          position: absolute;
          color: #FFA9FF;
          display: none;
          padding: 8px;
      }
      
      .heartTL {
          left: 0px;
          top: 0px;
      }
      
      .heartTR {
          right: 0px;
          top: 0px;
      }
      
      .heartBL {
          left: 0px;
          bottom: 0px;
      }
      
      .heartBR {
          right: 0px;
          bottom: 0px;
      }
      
      .peitho {
          position: relative;
          top: 170px;
          text-align: center;
          animation: 1.5s ease-out 1s 1 fadeIn;
          font-family: 'Roboto', sans-serif;
          color: white;
          opacity: 0;
      }
      
      .noselect {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
      }
      
      
      @media only screen and (min-width: 1500px){
          .heart, .heartR {
              display: inline;
          }
      }
      
      @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
      }
      
      @keyframes in {
          from {
              transform: rotate(0deg);
          }
          to {
              transform: rotate(360deg);
          }
      }
      @keyframes out {
          from {
              transform: rotate(360deg);
          }
          to {
              transform: rotate(0deg);
          }
      }
      
      @font-face {
          font-family: "Gang of Three";
          src: url("/index/font/go3v2.ttf");
      }
    `}</style>
  </div>
)

export default Index