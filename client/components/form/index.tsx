import {
  FunctionComponent,
  InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes, LabelHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent
} from "react"

interface Props {
  label?: string
}

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
interface InputProps extends Props, InputHTMLAttributes<HTMLInputElement> {}
interface TextareaProps extends Props,TextareaHTMLAttributes<HTMLTextAreaElement> {}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Label: FunctionComponent<LabelProps> = props => {
  return <label
    className="block uppercase text-gray-700 text-xs font-bold mb-2"
    {...props}>{ props.children }</label>
}

export const InputText: FunctionComponent<InputProps> = props => {
  return <div>
    { props.label ? <Label htmlFor={ props.id }>{ props.label }</Label> : null }
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3"
      {...props}/>
  </div>
}

export const InputTextarea: FunctionComponent<TextareaProps> = props => {
  return <div>
    { props.label ? <Label htmlFor={props.id }>{ props.label }</Label> : null }
    <textarea
      className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3"
      {...props}>{ props.value }</textarea>
  </div>
}

export const Button: ForwardRefExoticComponent<ButtonProps>  = forwardRef(props => {
  const { className, ...other } = props
  const buttonClass = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`
  return <button
    className={ buttonClass + (props.className ? ` ${props.className}` : '') }
    {...other}>{ props.children }</button>
})
