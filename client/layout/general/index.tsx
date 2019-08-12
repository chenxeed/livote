import { FunctionComponent } from 'react'
import './style.scss'

export const LayoutGeneral: FunctionComponent = props => {
  return <div className="container mx-auto h-full">
      {props.children}
  </div>
}
