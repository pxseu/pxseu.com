import Head from 'next/head'
//import { useEffect, useState } from 'react'
import DefaultLayout from '../../components/DefaultLayout'


const Yiff = () => {
    /*
    const [imageConfirm, setImageConfirm] = useState(false);

    const imageUrl = undefined; */

    return (
        <DefaultLayout>
            <Head>
                <title>Yiff</title>
                <meta data-n-head="ssr" data-hid="og:image" property="og:image" content="https://cdn.discordapp.com/attachments/740669580112035945/746098953820569690/qhm60nu25mz41.png" />
                <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Yiff" />
            </Head>
        
            <h1 className="center noselect"><a>You are disgusting</a></h1>
            <hr />
            <div className="center noselect">
                <p>Bro please get some help.</p>
                <p>fr fr fr</p>
                <p>This is not okay.</p>
            </div>
            <hr />
            {/* <div className={ imageConfirm ? "hidden" : "center noselect" }>
                <p><a onClick={() => setImageConfirm(true)}>Show image anyway</a></p>
            </div>
            <div className={ imageConfirm ? "center noselect" : "hidden" }>
                <img src={ imageUrl == undefined ? "" : "https://cdn.discordapp.com/attachments/740669580112035945/746098953820569690/qhm60nu25mz41.png" } alt="Loading...." />
            </div> */}
        </DefaultLayout> 
    )
}


export default Yiff