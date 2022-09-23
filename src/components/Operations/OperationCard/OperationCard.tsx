import { FC, MouseEventHandler } from 'react'

type OperationCardProps = {
	text: string
	operation: MouseEventHandler<HTMLButtonElement>
}
const OperationCard: FC<OperationCardProps> = ({ text, operation }) => {
	return (
		<button
			onClick={operation}
			className='bg-blue-200 
						py-4 px-8 
						text-left font-semibold text-blue-500
						border-blue-400 border-t last:border-b'
		>
			{text}
		</button>
	)
}

export default OperationCard
