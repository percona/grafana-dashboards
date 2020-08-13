export interface SwitchRowProps {
  label: string;
  tooltip: string;
  tooltipLinkText: string;
  link: string;
  checked: boolean;
  disabled?: boolean;
  className?: string;
  dataQa?: string;
  onChange?: () => void;
}
