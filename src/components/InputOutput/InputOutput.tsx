import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getDisplayText } from '../../redux/fields-reducer/fields-selector'
import { setText } from '../../redux/fields-reducer/fields-reducer'

const InputOutput = () => {
	const displayText = useAppSelector(getDisplayText)

	const dispatch = useAppDispatch()

	return (
		<div
			className='w-full 
						flex flex-col
						divide-y-2 '
		>
			<textarea
				placeholder='introduce text'
				onChange={(event: any) => {
					dispatch(setText(event.target.value))
				}}
				className='h-full p-1 
				resize-none focus:outline-gray-400 transition'
			/>
			<div className='h-full p-1'>{displayText || 'result will be shown here'}</div>
		</div>
	)
}

export default InputOutput
