type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface ButtonElementInterface {
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: any) => void;
  text: string;
  htmlType?: ButtonHTMLType;
}
