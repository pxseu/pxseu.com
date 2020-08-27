import Head  from 'next/head'
import Link from 'next/link'
import DefaultLayout from '../../components/DefaultLayout'

const OtherIndex = () =>  (
    <DefaultLayout>
        <Head>
            <title>Grab a waifu!</title>
            <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Grab a waifu!" />
        </Head>
        <h1 className="center noselect">
            <a>Other stuff</a>
        </h1>
        <hr />
        <div className="center noselect">
            <Link href="/other/yiff"><h3><a>Yiff</a></h3></Link>
            <Link href="/other/waifu"><h3><a>Waifu</a></h3></Link>
            <Link href="/hall-of-fame"><h3><a>Hall Of Fame</a></h3></Link>
        </div>
    </DefaultLayout>
)

export default OtherIndex