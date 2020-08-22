import Head from 'next/head'
import DefaultLayout from '../../components/DefaultLayout'

const LovesIndex = () => (
    <>
        <DefaultLayout>
            <Head>
                <title>Terms of Service | Privacy Policy</title>
                <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Terms of Service | Privacy Policy" />
            </Head>
            <h1 className="center noselect"><a>Terms of Service and Privacy Policy.</a></h1>
            <div className="center noselect">
                <p>1. Any form of spamming will not be tolerated.</p>
                <p>2. Adult contenet (gore, porn, deaths, naked photos) will not be tolerated.</p>
                <p>3. I do not guarantee the state of the files for you. They can be delted at any point for storage / update reasons.</p>
                <p>4. Only one account is allowed per one user. (no second accounts will be tolerated)</p>
                <p>5. Bans will be given without a reason and they might (not) be permanent.</p>
            </div>
            <hr />
            <h1 className="center noselect"><a>Privacy Policy</a></h1>
            <div className="center noselect">
                <p>I value your privacy and your trust.</p>
                <p>All of the data that you input / give will be stored in the propper way.</p>
                <p>All your data can be deleted with the account deletion process from the dashboard.</p>
            </div>
            <hr />
            <h4 className="center noselect"><a>If you have any question join my discord server!</a></h4>
        </DefaultLayout>
    </>
)


export default LovesIndex