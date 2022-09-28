import { FC, ReactNode } from 'react'
import cn from 'classnames'

type NameHeaderProps = {
	text: string
	children?: ReactNode
	extraClasses?: string
}

const NameHeader: FC<NameHeaderProps> = ({ text, children, extraClasses }) => {
	return (
		<header className={cn('bg-gray-100 text-gray-800 border-b border-gray-300 p-4', extraClasses)}>
			<span className='font-semibold'>{text}</span>
			{children}
		</header>
	)
}

export default NameHeader
