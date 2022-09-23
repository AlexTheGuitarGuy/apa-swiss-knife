import { FC, MouseEventHandler } from 'react'

type CallbackCardProps = {
	text: string
	callback: MouseEventHandler<HTMLButtonElement>
}
const CallbackCard: FC<CallbackCardProps> = ({ text, callback }) => {
	return (
		<button onClick={callback} className='block'>
			{text}
		</button>
	)
}

export default CallbackCard
