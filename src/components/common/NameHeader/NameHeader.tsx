import { FC, ReactNode } from 'react'
import cn from 'classnames'

type NameHeaderProps = {
	text: string
	children?: ReactNode
	extraStyles?: string
}

const NameHeader: FC<NameHeaderProps> = ({ text, children, extraStyles }) => {
	return (
		<header className={cn('bg-gray-100 text-gray-800 border-b border-gray-300 p-4', extraStyles)}>
			<span className='font-semibold'>{text}</span>
			{children}
		</header>
	)
}

export default NameHeader
