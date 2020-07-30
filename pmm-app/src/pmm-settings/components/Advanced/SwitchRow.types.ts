export interface SwitchRowProps {
  label: string;
  tooltip: string;
  tooltipLinkText: string;
  link: string;
  checked: boolean;
  className?: string;
  dataQa?: string;
  onChange?: () => void;
}
