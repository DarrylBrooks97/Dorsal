import Link from 'next/link';

interface LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export default function NextLink({ href, children, className }: LinkProps) {
	return (
		<Link href={href} passHref>
			<a className={className}>{children}</a>
		</Link>
	);
}
