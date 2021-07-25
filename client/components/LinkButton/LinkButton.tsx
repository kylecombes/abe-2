import * as React from 'react';
import Link from 'next/link';

interface LinkButtonProps {
  children: React.ReactNode;
  to: string;
}

export const LinkButton = ({ children, to }: LinkButtonProps): React.ReactElement => {
  return <Link href={to}>{children}</Link>;
};
