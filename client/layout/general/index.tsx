import { FunctionComponent, Fragment } from 'react'
import Head from 'next/head'

import './style.scss'

interface LayoutGeneralProps {
  header?: JSX.Element
}

export const LayoutGeneral: FunctionComponent<LayoutGeneralProps> = props => {
  return <Fragment>
    <Head>
      <title>Livote App</title>
    </Head>
    <div className="container mx-auto h-full">
        {props.header}
        {props.children}
    </div>
  </Fragment>
}
