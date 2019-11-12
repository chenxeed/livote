import { FunctionComponent } from "react";

interface AlertProps {
  type: AlertType
}

export enum AlertType {
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
  SUCCESS = 'success'
}

const typeToColor = {
  'info': 'blue',
  'warning': 'orange',
  'danger': 'red',
  'success': 'teal'
}

export const Alert: FunctionComponent<AlertProps> = props => {
  const color = typeToColor[props.type || 'info']
  const className = `bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`

  return <div className={ className } role="alert">
    { props.children }
  </div>
}
