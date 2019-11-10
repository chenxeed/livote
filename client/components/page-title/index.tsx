import { FunctionComponent } from "react";

export const PageTitle: FunctionComponent = ({ children }) => {
  return <div className="text-lg mb-2 text-center">{ children }</div>
}
