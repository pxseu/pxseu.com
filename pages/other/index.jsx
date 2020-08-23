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
            <h3><Link href="/other/yiff"><a>Yiff</a></Link></h3>
            <h3><Link href="/other/waifu"><a>Waifu</a></Link></h3>
        </div>
    </DefaultLayout>
)

export default OtherIndex