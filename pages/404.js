import Head from 'next/head'

export default function Custom404() {
  return (
    <div className="app">
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Varela' rel='stylesheet' type='text/css' />
      </Head>
      <div className="center"><h1>Not Found</h1></div>
      <div className="bellowCenter">
        <div className="glitch" data-text="404">404</div>
      </div>
      <style jsx>{`
        .glitch {
            color: white;
            font-size: 100px;
            position: relative;
            width: 190px;
            margin: 0 auto;
        }

        @keyframes noise-anim {
            0% {
                clip: rect(18px, 9999px, 21px, 0);
            }
            5% {
                clip: rect(44px, 9999px, 82px, 0);
            }
            10% {
                clip: rect(40px, 9999px, 100px, 0);
            }
            15% {
                clip: rect(23px, 9999px, 16px, 0);
            }
            20% {
                clip: rect(1px, 9999px, 16px, 0);
            }
            25% {
                clip: rect(70px, 9999px, 98px, 0);
            }
            30% {
                clip: rect(44px, 9999px, 93px, 0);
            }
            35% {
                clip: rect(39px, 9999px, 57px, 0);
            }
            40% {
                clip: rect(23px, 9999px, 66px, 0);
            }
            45% {
                clip: rect(82px, 9999px, 40px, 0);
            }
            50% {
                clip: rect(54px, 9999px, 85px, 0);
            }
            55% {
                clip: rect(94px, 9999px, 95px, 0);
            }
            60% {
                clip: rect(71px, 9999px, 25px, 0);
            }
            65% {
                clip: rect(3px, 9999px, 75px, 0);
            }
            70% {
                clip: rect(84px, 9999px, 52px, 0);
            }
            75% {
                clip: rect(57px, 9999px, 59px, 0);
            }
            80% {
                clip: rect(99px, 9999px, 51px, 0);
            }
            85% {
                clip: rect(8px, 9999px, 11px, 0);
            }
            90% {
                clip: rect(68px, 9999px, 32px, 0);
            }
            95% {
                clip: rect(45px, 9999px, 1px, 0);
            }
            100% {
                clip: rect(22px, 9999px, 45px, 0);
            }
        }
        .glitch:after {
            content: attr(data-text);
            position: absolute;
            left: 2px;
            text-shadow: -1px 0 red;
            top: 0;
            color: white;
            background: black;
            overflow: hidden;
            clip: rect(0, 900px, 0, 0);
            animation: noise-anim 2s infinite linear alternate-reverse;
        }

        @keyframes noise-anim-2 {
            0% {
                clip: rect(52px, 9999px, 12px, 0);
            }
            5% {
                clip: rect(88px, 9999px, 59px, 0);
            }
            10% {
                clip: rect(43px, 9999px, 81px, 0);
            }
            15% {
                clip: rect(55px, 9999px, 61px, 0);
            }
            20% {
                clip: rect(36px, 9999px, 56px, 0);
            }
            25% {
                clip: rect(80px, 9999px, 88px, 0);
            }
            30% {
                clip: rect(7px, 9999px, 25px, 0);
            }
            35% {
                clip: rect(24px, 9999px, 3px, 0);
            }
            40% {
                clip: rect(56px, 9999px, 26px, 0);
            }
            45% {
                clip: rect(29px, 9999px, 31px, 0);
            }
            50% {
                clip: rect(82px, 9999px, 25px, 0);
            }
            55% {
                clip: rect(73px, 9999px, 52px, 0);
            }
            60% {
                clip: rect(58px, 9999px, 43px, 0);
            }
            65% {
                clip: rect(79px, 9999px, 5px, 0);
            }
            70% {
                clip: rect(40px, 9999px, 4px, 0);
            }
            75% {
                clip: rect(100px, 9999px, 79px, 0);
            }
            80% {
                clip: rect(37px, 9999px, 92px, 0);
            }
            85% {
                clip: rect(54px, 9999px, 7px, 0);
            }
            90% {
                clip: rect(34px, 9999px, 11px, 0);
            }
            95% {
                clip: rect(76px, 9999px, 11px, 0);
            }
            100% {
                clip: rect(71px, 9999px, 46px, 0);
            }
        }
        .glitch:before {
            content: attr(data-text);
            position: absolute;
            left: -2px;
            text-shadow: 1px 0 blue;
            top: 0;
            color: white;
            background: black;
            overflow: hidden;
            clip: rect(0, 900px, 0, 0);
            animation: noise-anim-2 3s infinite linear alternate-reverse;
        }
        .center {
            position: absolute;
            left: 50%;
            top: 100px;
            transform: translate(-50%);
        }
        h1 {
            color: white;
        }
        .bellowCenter {
            position: absolute;
            left: 50%;
            top: 150px;
            transform: translate(-50%);
        }
      `}</style>

      <style jsx global>{`
      body {
        background: black;
        font-family: 'Varela', sans-serif;
      }
    `}</style>
    </div>
  )
}