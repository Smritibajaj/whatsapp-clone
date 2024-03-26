/* eslint-disable @typescript-eslint/no-explicit-any */
import ListIcons from "./list-icons";

type IconProps = {
  id: string;
  [x: string]: any;
};

export default function Icon(props: IconProps) {
  const { id, ...rest } = props;

  const currentSelectedIcon: any = ListIcons?.[id] as () => any[];
  return currentSelectedIcon ? currentSelectedIcon(rest) : null;
}
